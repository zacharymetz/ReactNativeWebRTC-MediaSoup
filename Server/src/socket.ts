// import * as http from "http";
// import * as express from "express";
// import config from 'config';
// import jwt from 'jsonwebtoken';
// import { Server, Socket } from "socket.io";
// import { createSubMessagingClient } from "./messaging/SubMessagingClient";
// import cookie from 'cookie'
// import beeMovieScript from "./utils/beeMovieScript";
// import { DataStoredInToken } from "./interfaces/auth.interface";



// // we dont care about message comming from the client since they should 
// // send them via the proper http channels 
// const socket = async (server: http.Server, app: express.Application) => {

//   // first new need to get the sub messaging client here and create it 
//   // so we can wait on published messages we are interested in 

//   const io = new Server(server);
//   const peerMap = new Map(); // list of peers that connect so we can keep track of subscriptions 
//   const roomMap = new Map(); // kees records of the rooms 
//   const routerMap = new Map(); // keeps records of hte router assigments 
   
//   io.on("connection", async (socket: Socket) => {
//     const req = socket.request;
//     const ip = req.headers["X-forwarded-for"] || req.socket.remoteAddress;
//     console.log("client connected!", ip, socket.id);
//     // decode their auth header 
//     const Authorization = cookie.parse(socket.handshake.headers.cookie)['Authorization'] || req.headers['Authorization'].toString().split('Bearer ')[1] || null;


//     if (Authorization) {
//       const secretKey: string = config.get('secretKey');
//       const verificationResponse = (await jwt.verify(Authorization, secretKey)) as DataStoredInToken;
      
//       const userID = verificationResponse.id;

//       // make sure to add the user to the peer list for later 
//       peerMap.set(socket.id,new Peer(socket,userID))
//       // socket message rouning going on right here 
//       handleSocketMessage(socket,peerMap,roomMap,routerMap);
      
//     }else{
//       // if they are not authed then 1 in 10 you send them they whole bmovie script 
//       // back in chunks every 500 ms then tell them to get fucked
//        if(Math.random() <= .2){
//         socket.on("disconnect", () => {
//           console.log("client disconneted out of fustration", ip, socket.id);
//         });
//         for(const line of beeMovieScript().toString().split('\n')){
//           socket.emit(line)
//           await new Promise((r)=>setTimeout(r,500))
//         }
//         socket.emit("Get fucked")
//        }else{
//         socket.emit("Please please please please pleased be authed next time, your promise? okay sweet pinky promise ! that means you wont try to connect again if you dont have the auth token right ?????????? thx :)")
//       }
//       console.log("disconnected un authenticated socket")
//       socket.disconnect()
//     }
    
//   });
// };

// const  handleSocketMessage = async (socket:Socket,peerMap,roomMap,routerMap) =>{
//   /*
//     Chat related stuff here 
//   */

  

//   /*
//     Media soup related stuff down here 
//   */
 
  




//   socket.on("disconnect", () => {
    
//     // will need to make sure all of the consumers and producers with that peer 
//     // are removed and delt with properly 

//     // need to make sure they are unsubed from any chat room messages 


     
//     console.log("client disconneted", ip, "userid",userID);
//   });
// }
// export default socket;
