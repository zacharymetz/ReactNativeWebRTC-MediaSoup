import { AnyAction } from 'redux'
import {
    GET_EVENT_STARTED,
    GET_EVENT_SUCCESS,
    GET_EVENT_FAILED,
} from '../actionTypes'
const initalState = {
        loading : true,
        error : null,
        event : null
};

export default function loadEventReducer(state=initalState,action:AnyAction){

    switch(action.type){
        case GET_EVENT_STARTED:
            return  {
                    ...state ,
                    error : null,
                    loading : true

                }
            

        case GET_EVENT_FAILED:
            return { 
                    ...state ,
                    error : "Events Fetch Failed, please check network connection",
                    loading : false
                }
             
        
        case GET_EVENT_SUCCESS:
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