import App, { Peer } from "@/app";
import { Socket, Server } from "socket.io";
/*
    socket controller will take these in and return a function that will run on socket 
    disconnect (basically your clean up function)
*/
export default async (io:Server,socket:Socket,peer:Peer, app:App) =>{
    // subscribe them to the chat messages in a room (aka)
    // socket.on('subscribe_to_chat_message', (msg) => {
    //     const { room } = msg;
      
    //     peer.addChatRoomSubscription(room);
    //     socket.emit("");
    // });

    // // unsubscribe them to the chat messages in a room (aka)
    // socket.on('unsubscribe_to_chat_message', (msg) => {
    //     const { room } = msg;
    //     peer.removeChatRoomSubscription(room);
    //     socket.emit("");
    // });

    return async () =>{
        
    }
};