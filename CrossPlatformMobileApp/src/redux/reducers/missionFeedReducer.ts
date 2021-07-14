import { AnyAction } from 'redux'
import {
    GET_MISSION_FEED_FAILED,
    GET_MISSION_FEED_STARTED,
    GET_MISSION_FEED_SUCCESS,
} from '../actionTypes'
const initalState = {
    missionFeed : {
        loading : false,
        missionFeedListItems : []
    }
    
};

export default function missionFeedReducer(state=initalState,action:AnyAction){
    console.log(action)
    switch(action.type){
        case GET_MISSION_FEED_STARTED:
            return  {
                    ...state ,
                    missionFeedListItems : [],
                    loading : true
                }
            

        case GET_MISSION_FEED_FAILED:
            return { 
                    ...state ,
                    missionFeedListItems : [],
                    loading : false
                }
             
        
        case GET_MISSION_FEED_SUCCESS:
            return {
                     
                        ...state ,
                        missionFeedListItems : [
                            ...action.payload
                        ],
                        loading : false
                    
                }


        default:
            return state
    }
}