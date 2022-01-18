import { useEffect, useState } from 'react'
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';
import { Device } from 'mediasoup-client';







function App() {
  // hocks for socket and list of producers 
  const [socket,setSocket] = useState(null);
  const [producers,setProducers] = useState([]);
  useEffect(()=>{

    let socket = io("https://192.168.1.68:3000", {
      extraHeaders: {
        Authorization: "Bearer " + "debugToken"
      }
    });
    // this is a helper to make my life easier 
    socket.request = socketPromise(socket);

    

    setSocket(socket);
    const device = new Device();
    console.log({device});
    // first lets get the list of them 
    (async ()=>{
      console.log("asdasd")
      const routerRtpCapabilities = await socket.request('getRouterRtpCapabilities',{})
      await device.load({ routerRtpCapabilities })
    })();
    
    socket.on('addProducer', async (_data)=>{
      let { producer, producerID } = _data;
      console.log({ producer, producerID })
      // when we get a new producer we should see if we can 
      // consume it and display it 
      console.log("got producer", {producer})
      console.log(producer , "this is the producer id we wanna get via the router")
      //producer._producer = null; // this is for the actual producer object we
                                // will connect with webrtc
      
                                producers.push(producer);
                                setProducers([...producers]);
      // now we need to subscribe to the new producer for sure 
      const data = await socket.request('createConsumerTransport', {
        transport : {
          id : producer.id
        },
        forceTcp: false,
      });
      console.log("trouble data",{data});
      const transport = device.createRecvTransport(data);
      console.log({transport})
      transport.on('connect', ({ dtlsParameters }, callback, errback) => {
        console.log("connected")
        socket.request('connectConsumerTransport', {
          transportId: transport.id,
          dtlsParameters
        })
          .then(callback)
          .catch(errback);
      });

      transport.on('connectionstatechange', async (state) => {
        console.log("have a state change here",{state})
        switch (state) {
          case 'connecting':
            // let us know we are connecting to it by some state thing
            
            break;
    
          case 'connected':
            // now that we are here lets make sure we view the stram and resume it
            const { srcObject, consumer } = await stream; 
            console.log({srcObject})
            await socket.request('resume', { consumerID : consumer.id });
            console.log({videoID : producer.id})
            document.getElementById(producer.id).srcObject = srcObject;
            break;
    
          case 'failed':
            transport.close();
            break;
    
          default: break;
        }
      });
      console.log({producerID},producer.id)
      const stream = consume(producer.id,transport,socket,device);
      

    });

    socket.on('removeProducer', (data)=>{
      const { producerID } = data;
      console.log("removed producer", {producerID})
    });

    socket.on('updateProducer', (data)=>{
      const { producerID, type } = data;
      console.log("update producer", {producerID})

    });


  },[]);
  // 
  return (
    <div className="App">
      <header className="App-header">
        {producers.map(x=><>{JSON.stringify(x)} <video id={x.id} controls autoPlay playsInline>
          
          </video></>)}
      </header>
    </div>
  );
}


async function consume(producerID,transport,socket,device) {
  console.log("going to consume the streams")
  const { rtpCapabilities } = device;
  console.log( { 
    rtpCapabilities,
    transport,
    producerID : producerID
  })
  const data = await socket.request('consume', { 
    rtpCapabilities,
    transport,
    producerID : producerID
  });
  const {
    producerId,
    id,
    kind,
    rtpParameters,

  } = data;

  let codecOptions = {};
  const consumer = await transport.consume({
    id,
    producerId,
    kind,
    rtpParameters,
    codecOptions,
  });
  const stream = new MediaStream();
  stream.addTrack(consumer.track);
  return {srcObject : stream, consumer };
}
function socketPromise(socket) {
  return function request(type, data = {}) {
    return new Promise((resolve) => {
      socket.emit(type, data, resolve);
    });
  }
};

export default App;
