import { AnyAction } from 'redux'
import {
    HEALTH_CHECK_FAILED,
    HEALTH_CHECK_STARTED,
    HEALTH_CHECK_SUCCESS
} from '../actionTypes'
const initalState = {
    loading : true,
    healthCheckPassed : false
};

export default function HealthCheckReducer(state=initalState,action:AnyAction){
    console.log(action)
    switch(action.type){
        case HEALTH_CHECK_STARTED:
            return  {
                    ...state ,
                    loading : true
                }
            

        case HEALTH_CHECK_FAILED:
            return { 
                    healthCheckPassed : false,
                    loading : false
                }
             
        
        case HEALTH_CHECK_SUCCESS:
            return {
                     
                    healthCheckPassed : true,
                    loading : false
                    
                }


        default:
            return state
    }
}