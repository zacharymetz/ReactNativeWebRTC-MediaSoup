import { randomUUID } from 'crypto'
import { createClient } from 'redis'

enum MessagesType {
    NewMessage
}

/**
 */
export class PubMessagingClient{
    client: any
    constructor(){
        
    }
    // just send a message out into the void without a particular recipient in mind
    async pub(topic:string,message:any):Promise<void>{
        const connection = createClient()
        connection.publish(topic,message)
    }

    // send a message and if it not consumed by one of the app instances 
    // then it needs to be sent to the offline notification service
    async sendMessageToUser(userID:number,type:MessagesType,body:JSON):Promise<void>{

        // let create a redis connection here
        const connection = createClient()
        // create a uuid for the message 
        const messageID = randomUUID()
        
        connection.publish("/user/"+userID.toString(),JSON.stringify({...body,id:messageID}))

        // subscribe to /consumed/<uuid>

        // this complicated mess it meant to be waiting for the subscription to come back 
        // and when it dosent the consumed errors out, please fix this dude 
        
        var promiseResolve, promiseTimeout;
        const consumedPromise = new Promise((resolve,reject)=>{
            connection.subscribe("/consumed/"+messageID,(message)=>{
                resolve(null)
            })

            new Promise(function(res){
                promiseResolve = res;
                promiseTimeout = setTimeout(()=>{

                    reject()
                    res(null)
                },5000)
            });
        })  

        // now if we dont get a message back in 5 seconds then we error 
        // out and delegate it to the offline message handler 
        
        
        // if we do then yeet lets celebrate 
        try{
            await consumedPromise
            promiseResolve()
            clearTimeout(promiseTimeout)
        }catch(e){
            // if the message was not consumed in the ammount of time we thought then 
            // we need to do something else with it 
        }
        
        // before we exit make sure to unscubscribe and clean up the redis
        // redis connection

    }

}


export async function createPubMessagingClient(){
    return new PubMessagingClient()
}