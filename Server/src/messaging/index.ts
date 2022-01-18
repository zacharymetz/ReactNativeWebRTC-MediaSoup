import { createClient } from 'redis'


/**
 */
class MessagingClient{
    client: any
    constructor(){
        this.client = createClient()
    }

    // subscribe to all user actions and when one comes in \
    async subscribeToUserMessages(userID:number):Promise<void>{

    }

}


async function createMessagingClient(){
    return new MessagingClient()
}

export default createMessagingClient