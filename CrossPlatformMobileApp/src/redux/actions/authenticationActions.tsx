import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    USER_LOGIN_REQUEST_STARTED,
    USER_LOGIN_REQUEST_SUCCESS,
    USER_LOGIN_REQUEST_FAILED,

    TOKEN_VERIFY_REQUEST_STARTED,
    TOKEN_VERIFY_REQUEST_SUCCESS,
    TOKEN_VERIFY_REQUEST_FAILED,
    USER_LOGOUT_REQUEST_STARTED,
    USER_LOGOUT_REQUEST_FAILED,
    USER_LOGOUT_REQUEST_SUCCESS
} from '../actionTypes';
import { ThunkAction } from 'redux-thunk'
import { AnyAction } from 'redux'
import axios from 'axios'
import { RootState } from '../store'
import  { API_URL }  from '../../config'
import { v0 } from '../../config/apiRoutes';
import { useNavigation } from '@react-navigation/native';

export const userLoginRequestStared = () => ({
    type: USER_LOGIN_REQUEST_STARTED
}) 
export const userLoginRequestFailed = () => ({
    type: USER_LOGIN_REQUEST_FAILED
}) 
export const userLoginRequestSuccess = (userid:number,authToken:String) => ({
    type: USER_LOGIN_REQUEST_SUCCESS,
    payload : {userid,authToken}
}) 





export const postLoginRequest = (email:string,password:string):ThunkAction<void, RootState, unknown, AnyAction> => async dispatch =>  {
    console.log({email,password})
    dispatch(userLoginRequestStared())
    try{
        let missionFeedData = 
            await axios.post( API_URL+v0.login ,{
                
                    email,password
                
            });

        console.log(missionFeedData)

        // make sure to save the auth token and user id in the async data thing 
        await AsyncStorage.setItem('client_auth_token', missionFeedData.data.tokenData.token)
        dispatch(userLoginRequestSuccess(missionFeedData.data.data.id,missionFeedData.data.tokenData.token))
        
    }catch(e){
        console.log(e)
        dispatch(userLoginRequestFailed())
    }
    
}

export const userLogoutRequestStared = () => ({
    type: USER_LOGOUT_REQUEST_STARTED
}) 
export const userLogoutRequestFailed = () => ({
    type: USER_LOGOUT_REQUEST_FAILED
}) 
export const userLogoutRequestSuccess = () => ({
    type: USER_LOGOUT_REQUEST_SUCCESS
}) 


// logout action right here 
export const postLogoutRequest = (navigation:any):ThunkAction<void, RootState, unknown, AnyAction> => async dispatch =>  {
     
    dispatch(userLogoutRequestStared())
    try{
        let missionFeedData = 
            await axios.post( API_URL+v0.logout ,{},{
                headers : {}
            });

        console.log(missionFeedData)

        // make sure to save the auth token and user id in the async data thing 
        await AsyncStorage.removeItem('client_auth_token')
        dispatch(userLogoutRequestSuccess())
        navigation.navigate("LandingScreen")
    }catch(e){
        console.log(e)
        dispatch(userLogoutRequestFailed())
    }
}



export const tokenValidationRequestStared = () => ({
    type: TOKEN_VERIFY_REQUEST_STARTED
}) 
export const tokenValidationRequestFailed = () => ({
    type: TOKEN_VERIFY_REQUEST_FAILED
}) 
export const tokenValidationRequestSuccess = (userid:number,authToken:String) => ({
    type: TOKEN_VERIFY_REQUEST_SUCCESS,
    payload : {userid,authToken}
}) 

export const postTokenValidatorRequest = ():ThunkAction<void, RootState, unknown, AnyAction> => async dispatch =>  {    
    console.log("I am here farther")
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

     
        // make sure to save the auth token and user id in the async data thing 
        await AsyncStorage.setItem('client_auth_token', missionFeedData.data.tokenData.token)
        dispatch(tokenValidationRequestSuccess(missionFeedData.data.data.id,missionFeedData.data.tokenData.token))
        
    }catch(e){
        console.log(e)
        dispatch(tokenValidationRequestFailed())
    }
}