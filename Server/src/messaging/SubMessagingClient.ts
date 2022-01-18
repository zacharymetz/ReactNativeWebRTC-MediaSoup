import { createClient } from 'redis'
import { Socket } from "socket.io";

/**
 * put the actions here that you want clients to receive and you can send it to the socket if they are connected 
*/

export class SubMessagingClient{

    client: any
    userIdToSocket: Map<Number, Socket>;
    constructor(){
        this.client = createClient()
        this.userIdToSocket = new Map<number,Socket>()
        // when the client is created 
        this.client.on("message", (channel:string, message:string) => {
            // see if its a user message, and if it is then 
            // get the user id and parse the body of the message 
            if(this.userIdToSocket.has(1))
                this.handleUserMessage(1,JSON.parse(message))
        });
    }

    // subscribe to all user actions and when one comes in \
    async subscribeToUserMessages(userID:number, socket:Socket):Promise<void>{
        this.userIdToSocket.set(userID,socket)
    }
    async unsubscribeToUserMessages(userID: number) {
        this.userIdToSocket.delete(userID)
    }

    async handleUserMessage(userID:number,body:any):Promise<void>{
        // see if we are subscribed to the user id and if we are send
        // it off to the proper socket id that corresposnd with it 


        // make sure the message was sent to the client 
        this.userIdToSocket.get(userID).emit(body)


        // need to send the consumed as soon as we pass the message on to the 
        // client 
        this.client.publish("/consumed/"+body.id, "was consumed");

    }

}


export async function createSubMessagingClient(){
    return new SubMessagingClient()
}