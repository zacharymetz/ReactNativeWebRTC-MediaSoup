import {
    HEALTH_CHECK_FAILED,
    HEALTH_CHECK_STARTED,
    HEALTH_CHECK_SUCCESS
} from '../actionTypes';
import { ThunkAction } from 'redux-thunk'
import { AnyAction } from 'redux'
import axios from 'axios'
import { RootState } from '../store'
import  { API_URL }  from '../../config'
import { v0 } from '../../config/apiRoutes';
import { postTokenValidatorRequest, tokenValidationRequestFailed, tokenValidationRequestStared, tokenValidationRequestSuccess } from './authenticationActions';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getHealthCheckStared = () => ({
    type: HEALTH_CHECK_STARTED
}) 
export const getHealthCheckFailed = () => ({
    type: HEALTH_CHECK_FAILED
}) 
export const getHealthCheckSuccess = () => ({
    type: HEALTH_CHECK_SUCCESS
}) 


export const fetchHealthCheck = (checkAuthAfterRequest=false):ThunkAction<void, RootState, unknown, AnyAction> => async dispatch =>  {
    console.log("ASDASDSAD",API_URL+v0.healthCheck)
    dispatch(getHealthCheckStared())
    try{
        let missionFeedData = 
            await axios.get( API_URL+v0.healthCheck ,{

            });

        console.log(missionFeedData)
        dispatch(getHealthCheckSuccess())

        // now that we are connected lets do the token thing 
        if(checkAuthAfterRequest){
            dispatch(tokenValidationRequestStared())
    try{

        // see if we have a token already stored and if there is non
        // we can error out before making the request 
            const token = await AsyncStorage.getItem('client_auth_token')
            if(!token){
                dispatch(tokenValidationRequestFailed())
                return
            }
            let missionFeedData = 
                await axios.get( API_URL+v0.user.validateToken ,{
                    headers : {
                        'Authorization': token
                    }
                });

            console.log(missionFeedData)
            // make sure to save the auth token and user id in the async data thing 
            await AsyncStorage.setItem('client_auth_token', missionFeedData.data.tokenData)
            dispatch(tokenValidationRequestSuccess(missionFeedData.data.data,missionFeedData.data.tokenData))
            
            }catch(e){
                console.log(e)
                dispatch(tokenValidationRequestFailed())
            }
            
        }
         
        

        
    }catch(e){
        console.log(e)
        dispatch(getHealthCheckFailed())
    }
    
}