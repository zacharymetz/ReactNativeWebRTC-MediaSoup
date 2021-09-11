import { AnyAction } from 'redux'
import {
    SOCKET_CONNECTION_FAILED,
    SOCKET_CONNECTION_STARTED,
    SOCKET_CONNECTION_SUCCESS
} from '../actionTypes'
const initalState = {
        connected : false,
        connecting : false,
        error : null,
        socketService : new SocketService()
};

export default function socketIoConnectionReducer(state=initalState,action:AnyAction){

    switch(action.type){
        case SOCKET_CONNECTION_STARTED:
            return  {
                    ...state ,
                    error : null,
                    loading : true

                }
            

        case SOCKET_CONNECTION_FAILED:
            return { 
                    ...state ,
                    error : "Events Fetch Failed, please check network connection",
                    loading : false
                }
             
        
        case SOCKET_CONNECTION_SUCCESS:
            return {
                     
                        ...state ,
                        error : null,
                        loading : false,
                        event : action.payload
                }


        default:
            return state
    }
}