import App, { Peer } from "@/app";
import { createWebRtcTransport } from "@/utils/mediasoup";
import { Socket, Server } from "socket.io";
import mediasoup from 'mediasoup'
import { Producer } from "mediasoup/lib/Producer";

export default async (io:Server,socket:Socket,peer:Peer, app:App) =>{
    socket.join('test-id');
    console.log("added routes and made peer join the 'test-id' room");

    if(peer.userID == "debug-instance"){
      socket.on('getProducerList', (data, callback) => {
        // i think this works ???? but probably should find other ways lol 
        const activeProducers = app.routerMap.get("test-id").producerTransports.map(transport=>transport.transport.id);


        
        
        callback({activeProducers});
      });
    }
 


    socket.on('getRouterRtpCapabilities', (data, callback) => {
        
        const {roomID} = data;
        callback(app.routerMap.get("test-id").mediasoupRouter.rtpCapabilities);
      });
      
    // the peers calls this when it wants to create a streaming port 
    socket.on('createProducerTransport', async (data, callback) => {
      const { roomID } = data;
      const peer = app.peerMap.get(socket.id);
      // get the router 
      const router = app.routerMap.get("test-id");
      
      try {

        // before trying anything see if this user is allowed to stream 
        // in this room 
        if(false)
          throw "Do not have auth to stream in this room"

        // move this function to the router 
        console.log({peer,router : router.createWebRtcTransport})
        const transport = await router.createWebRtcTransport(peer);
        // add it to the peer 
        peer.addTransport(transport)  
        // then send it back to the peer 
        callback({
          id: transport.id,
          iceParameters: transport.iceParameters,
          iceCandidates: transport.iceCandidates,
          dtlsParameters: transport.dtlsParameters
        });
      } catch (err) {
        console.error(err);
        callback({ error: err.message });
      }
    });
      
      // this means someone wants to open a port to get the media 
      socket.on('createConsumerTransport', async (data, callback) => {
        const {roomID,producerID} = data;
        const peer = app.peerMap.get(socket.id);
        const router = app.routerMap.get("test-id");
 
        // hold up, how do we know what stream they wanna consume ??????
        
        try {
          // before trying anything see if this user is allowed to consume 
          // in this room 
          if(false)
            throw "Do not have auth to stream in this room"
          const transport = await router.createWebRtcTransport(peer);
          // add a consumer transport 
          peer.addTransport(transport)
          router.addConsumerTransport(transport,peer);
          callback({ 
            id: transport.id,
            iceParameters: transport.iceParameters,
            iceCandidates: transport.iceCandidates,
            dtlsParameters: transport.dtlsParameters
          });
        } catch (err) {
          console.error(err);
          callback({ error: err.message }); 
        }
      });
      // in this function we need to get the webrtc stuff from that other 
      // create we made so we can connect it 
      socket.on('connectProducerTransport', async (data, callback) => {
        
        const {roomID , transport} = data;
        
        const peer = app.peerMap.get(socket.id);
        
        const producerTransport = peer.getTransport(transport.id);
        
        const router = app.routerMap.get("test-id");
        
        await producerTransport.connect({ dtlsParameters: data.dtlsParameters });
        
        // add it to the router object ???? or do something with it dude 
 
 
        callback();  

        


      }); 
      // this is to connect the consumer transport ??? not sure lol but find out 
      socket.on('connectConsumerTransport', async (data, callback) => {
        console.log("attempting to connect consumer transport")
        const {roomID,transportId, dtlsParameters} = data;
        console.log("1",{data})
        const peer = app.peerMap.get(socket.id);
        console.log("2",{peer})
        const consumerTransport = peer.getTransport(transportId);
        console.log("3",{consumerTransport})
        await consumerTransport.connect({ dtlsParameters });
        console.log("4")   
 
        // same here we need to do something with the router  i think 
        callback();
      });
      
      // client intends to produce and create some media right here 
      socket.on('produce', async (data, callback) => {
        console.log("Client is sending data so lets produce",{data})
        const {kind, rtpParameters, transport} = data;
        
        const peer = app.peerMap.get(socket.id);
         
        const producerTransport = peer.getTransport(transport.id);
        
        const producer = await producerTransport.produce({ kind, rtpParameters });
        app.routerMap.get('test-id').addProducer(producer,peer);
        callback({ id: producer.id });
        
        // let all the other sockets in the router know 
        // that this has started to produce
       // now send a message to people in the room 
       addProducer(io,'test-id',producer.id,{
          id : producer.id
        }); 
      }); 
      
      // start to consume a stream in a router
      socket.on('consume', async (data, callback) => {
        console.log("I am where the front end is crashing")
        const { producerID, roomID, rtpCapabilities, transport } = data;

        const router = app.routerMap.get("test-id");
        console.log({ producerID, roomID, rtpCapabilities, transport })
        if (!router.mediasoupRouter.canConsume(
          {
            producerId: producerID,
            rtpCapabilities,
          })
        ) {
          console.error('can not consume');
          return;
        }
        let producer:mediasoup.types.Producer;
        let consumer:mediasoup.types.Consumer;
        try {
          const consumerTransport = peer.getTransport(transport._id);
          producer = router.getProducerByID(producerID); // get the producer that this transport wants to consume
          consumer = await consumerTransport.consume({
            producerId: producer.id,
            rtpCapabilities, 
            paused: producer.kind === 'video',
          });
          // add the consumer to the 
          peer.addConsumer(consumer)
        } catch (error) {
          console.error('consume failed', error);
          return;
        } 
      
        if (consumer.type === 'simulcast') {
          await consumer.setPreferredLayers({ spatialLayer: 2, temporalLayer: 2 });
        }


        // add this to a map of things consuming this producer for quick getting 
        callback({
          producerId: producer.id,
          id: consumer.id,
          kind: consumer.kind,
          rtpParameters: consumer.rtpParameters,
          type: consumer.type,
          producerPaused: consumer.producerPaused
        });
      });
      
      // This needs to be called after the consuming stream is connected 
      // on the client side to get it started since it started with paused : true
      socket.on('resume', async (data, callback) => {
        console.log(" i told it to resume so it should do something")
        // well which fucking consumer is it ???????????????
        // i guess just get the consumer id and be done with it 
        const { consumerID } = data;
        console.log({ consumerID })
        
        const peer = app.peerMap.get(socket.id);
        await peer.getConsumer(consumerID).resume();
        callback();   
      });  
 
    // return the on disconnect function
    return async () =>{
      // clean up all of their consumers and proucers and the transports 
      // send signals to other peer objects as needed to inform them of whats going on 
      for(const roomID in peer.rooms){
        // for each router we are apart of we need to make sure to 
        // clear all ou references to us and terminate things nicely
        const router = app.routerMap.get(roomID)
      }
    }
};

 


/**
 * Down here are functions to send messages within a room based on the state 
 * of the producers 
 */

const addProducer = (io,roomID,producerID,producer) => {
   
  return io.to(roomID).emit('addProducer', { producer, producerID });
}
 
const removeProducer = () => {

}

const updateProducer = () => {
  
}