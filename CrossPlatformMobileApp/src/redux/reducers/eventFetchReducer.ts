import { AnyAction } from 'redux'
import {
    GET_EVENTS_STARTED,
    GET_EVENTS_SUCCESS,
    GET_EVENTS_FAILED,
} from '../actionTypes'
const initalState = {
        loading : false,
        error : null,
        events : []
};

export default function eventFetchReducer(state=initalState,action:AnyAction){

    switch(action.type){
        case GET_EVENTS_STARTED:
            return  {
                    ...state ,
                    error : null,
                    loading : true

                }
            

        case GET_EVENTS_FAILED:
            return { 
                    ...state ,
                    error : "Events Fetch Failed, please check network connection",
                    loading : false
                }
             
        
        case GET_EVENTS_SUCCESS:
            return {
                     
                        ...state ,
                        error : null,
                        loading : false,
                        events : action.payload
                }


        default:
            return state
    }
}