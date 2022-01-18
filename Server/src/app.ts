process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';
import jwt from 'jsonwebtoken';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import config from 'config'
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import { useExpressServer, getMetadataArgsStorage } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import swaggerUi from 'swagger-ui-express';
import errorMiddleware from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
import {Server as SockerServer, Socket} from 'socket.io'
import { createServer, Server } from "https";
import fs from 'fs'
import { getDBClient } from './db';
import * as multer from 'multer';
import beeMovieScript from './utils/beeMovieScript';
import cookie from 'cookie'
import { DataStoredInToken } from './interfaces/auth.interface';
import {types, createWorker} from 'mediasoup';
import mediasoupConfig from './configs/config'
class App {
  public app: express.Application;
  public port: string | number;
  public env: string;
  public server: Server;
  public io: SockerServer;
  public peerMap:Map<string,Peer>;
  public routerMap:Map<string,Router>;
  public upload: any;

  public mediaSoupWorker:types.Worker;

  constructor(Controllers: Function[],SocketControllers: Function[]) {
    this.peerMap = new Map<string,Peer>();
    this.routerMap = new Map<string,Router>();
    this.app = express();
    this.port = process.env.PORT || 3000;
    
    this.server = this.createServer(this.app);
    
    this.env = process.env.NODE_ENV || 'development';
     
    this.initializeMiddlewares();
    
    this.initializeRoutes(Controllers);
     
    this.initializeSwagger();
     
    this.initializeErrorHandling(); 
    
    this.initializeSocketRouting(SocketControllers);
    
    this.listen();
    console.log("i am done dude")

  }
  createServer(expressApp){
    const { sslKey, sslCrt } = mediasoupConfig;
    if (!fs.existsSync(sslKey) || !fs.existsSync(sslCrt)) {
      console.error('SSL files are not found. check your config.js file');
      process.exit(0);
    }
    
    const tls = {
      cert: fs.readFileSync(sslCrt),
      key: fs.readFileSync(sslKey), 
    };

    const webServer = createServer(tls, expressApp);
    webServer.on('error', (err) => {
      console.error('starting web server failed:', err.message); 
    });
    return webServer
  }
  async initializeMediaSoupWorker() {
   
    try{
    this.mediaSoupWorker = await createWorker({
      logLevel: 'warn',//mediasoupConfig.mediasoup.worker.logLevel,
      logTags: [ 'info', 'ice', 'dtls', 'rtp', 'srtp', 'rtcp' ], // mediasoupConfig.mediasoup.worker.logTags,
      rtcMinPort: mediasoupConfig.mediasoup.worker.rtcMinPort,
      rtcMaxPort: mediasoupConfig.mediasoup.worker.rtcMaxPort,
    });

    // create a router for the room id "testid"
    const mediaCodecs = mediasoupConfig.mediasoup.router.mediaCodecs;
    const mediasoupRouter = await this.mediaSoupWorker.createRouter({ mediaCodecs });
    this.routerMap.set("test-id",new Router(mediasoupRouter));
    
  }
  catch(e){console.log(e)}
  
    this.mediaSoupWorker.on('died', () => {
      console.error('mediasoup worker died, exiting in 2 seconds... [pid:%d]', this.mediaSoupWorker.pid);
      setTimeout(() => process.exit(1), 2000);
    }); 
    
     
    
  }
  

  public async listen() {
    // make sure to create the db client so that
    // its shared between everything
    try{
      const dbClientFuture = getDBClient();
    const dbClient = await dbClientFuture;
    await this.initializeMediaSoupWorker();
    this.server.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    }) 
    }catch(e){
      console.log(e)
    }
    
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
     
    this.app.use(morgan(config.get('log.format'), { stream }));
     
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    
  }

  private initializeRoutes(controllers: Function[]) {
    useExpressServer(this.app, {
      cors: {
        origin: config.get('cors.origin'),
        credentials: config.get('cors.credentials'),
      },
      controllers: controllers,
      defaultErrorHandler: false,
    });
  }

  private initializeSocketRouting(controllers: Function[]){
    
    const io = new SockerServer(this.server, {
      cors: {
        origin: "https://localhost:3001",
        methods: ["GET", "POST"],
      }
    });
    io.on("connection", async (socket: Socket) => {
      const req = socket.request;
      const ip = req.headers["X-forwarded-for"] || req.socket.remoteAddress;
      console.log("client connected!", ip, socket.id);
      // decode their auth header  
      const Authorization = req.headers['authorization'].toString().split('Bearer ')[1];
      console.log("ASD1")
      console.log({Authorization})
      // preform authorization 
      let userID = null;
      if (Authorization) {
        if(Authorization !== "debugToken"){
          const secretKey: string = config.get('secretKey');
          const verificationResponse = (await jwt.verify(Authorization, secretKey)) as DataStoredInToken;
          userID = verificationResponse.id;
        }else{
          userID = "debug-instance"
        }
        
        console.log("made a new peer")
        // create a new peer for the socket to keep track of subscriptions and webrtc stuff
        const newPeer = new Peer(userID,socket)
        
        this.peerMap.set(socket.id,newPeer)
        
        const onClose = [];
        for(const controller of controllers)
          onClose.push((await controller(io,socket,newPeer,this))) // give controller app context
          
      
        socket.on('disconnect',async () =>{
          for(const func of onClose)
            await func();

          // clean up the peer after these had their chances
          this.peerMap.delete(socket.id)
        })
      
          // if they are not authed then 1 in 10 you send them they whole bmovie script 
      // back in chunks every 500 ms then tell them to get fucked
      }else{
        
         if(Math.random() <= .2){
          socket.on("disconnect", () => {
            console.log("client disconneted out of fustration", ip, socket.id);
          });
          for(const line of beeMovieScript().toString().split('\n')){
            socket.emit(line)
            await new Promise((r)=>setTimeout(r,500))
          }
          socket.emit("Get fucked")
         }else{
          socket.emit("Please please please please pleased be authed next time, your promise? okay sweet pinky promise ! that means you wont try to connect again if you dont have the auth token right ?????????? thx :)")
        }
        console.log("disconnected un authenticated socket")
        socket.disconnect()
      }

    });
    
  }

  private initializeSwagger() {
    const storage = getMetadataArgsStorage();
    const specs = routingControllersToSpec(storage);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}




export class Peer {
  getConsumer(consumerID: any):types.Consumer {
    return this.consumers.find(consumer=>consumer.id === consumerID)
  }
  addConsumer(consumer:types.Consumer):void{
    consumer.id
    this.consumers.push(consumer);

  }
  socket: any;
  userID:any;
  rooms:string[];
  transports: any[];
  producers: any[];
  consumers: any[];

  process: any;
  remotePorts: any[];
   chatRoomSubscriptions: any[];
  constructor (userID,socket) {
    this.socket = socket;
    this.userID = userID;

    // chat room peer info
    this.chatRoomSubscriptions = [];



    // media soup peer info
    this.transports = [];
    this.producers = [];
    this.consumers = [];
    this.process = undefined;
    this.remotePorts = [];
  }

  addChatRoomSubscription(chatRoomID){

  }
  removeChatRoomSubscription(chatRoomID){

  }

  addTransport (transport) {
    this.transports.push(transport);
  }

  getTransport (transportId):types.WebRtcTransport {
    return this.transports.find((transport => transport.id === transportId));
  }

  addProducer (producer) {
    this.producers.push(producer);
  }

  getProducer (producerId) {
    return this.producers.find((producer => producer.id === producerId));
  }

  getProducersByKind (kind) {
    return this.producers.filter((producer => producer.kind === kind));
  }

  getConsumersByKind (kind) {
    return this.consumers.filter((consumer => consumer.kind === kind));
  }

  
}
export class Router{
  getProducerByID(producerID: string):types.Producer {
    return this.producers.find(producer=>{
      console.log({producer}, producer.producer.id)
      return producer.producer.id === producerID}).producer
  }
  addProducer(producer : types.Producer,peer:Peer):void{
    this.producers.push({
      producer,peer
    })
  }
  addConsumerTransport(transport: types.WebRtcTransport, peer: Peer) {
    this.consumerTransports.push({
      transport,peer
    })
  }
  async createWebRtcTransport(peer: Peer):Promise<types.WebRtcTransport> {
    const {
      maxIncomingBitrate,
      initialAvailableOutgoingBitrate
    } = mediasoupConfig.mediasoup.webRtcTransport;
  
    const transport = await this.mediasoupRouter.createWebRtcTransport({
      listenIps: mediasoupConfig.mediasoup.webRtcTransport.listenIps,
      enableUdp: true,
      enableTcp: true,
      preferUdp: true,
      initialAvailableOutgoingBitrate,
    });
    if (maxIncomingBitrate) {
      try {
        await transport.setMaxIncomingBitrate(maxIncomingBitrate);
      } catch (error) {
      }
    }
    
    return transport
    };
  constructor(mediasoupRouter:types.Router){
    this.mediasoupRouter = mediasoupRouter;
    this.consumerTransports = [];
    this.producerTransports = [];
    this.consumers = [];
    this.producers = [];
  }
  
  public mediasoupRouter:types.Router;
  public consumerTransports:{transport : types.WebRtcTransport,peer:Peer}[];
  public producerTransports:{transport : types.WebRtcTransport,peer:Peer}[];
  public consumers:{consumer : types.Consumer,peer:Peer}[];
  public producers:{producer : types.Producer,peer:Peer}[];

}
export default App;
