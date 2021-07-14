import { AnyAction } from 'redux'
import {
    USER_LOGIN_REQUEST_STARTED,
    USER_LOGIN_REQUEST_SUCCESS,
    USER_LOGIN_REQUEST_FAILED,

    USER_LOGOUT_REQUEST_STARTED,
    USER_LOGOUT_REQUEST_SUCCESS,
    USER_LOGOUT_REQUEST_FAILED,

    TOKEN_VERIFY_REQUEST_FAILED,
    TOKEN_VERIFY_REQUEST_STARTED,
    TOKEN_VERIFY_REQUEST_SUCCESS,
    USER_SIGNUP_REQUEST_FAILED
} from '../actionTypes'
const initalState = {
    loading : false,
    loggedIn : false,
    userID : -1,
    authToken : ""
};

export default function UserAuthenticationReducer(state=initalState,action:AnyAction){
    console.log({action})
    switch(action.type){
        
        // these 3 cases are for loging
        case USER_LOGIN_REQUEST_STARTED:
            return  {
                    ...state ,
                    loading : true
                }
            

        case USER_LOGIN_REQUEST_SUCCESS:
            return { 
                ...state ,
                    loggedIn : true,
                    userID : action.payload.userid,
                    authToken : action.payload.authToken,
                    loading : false
                }
             
        
        case USER_LOGIN_REQUEST_FAILED:
            return {
                ...state ,
                    loggedIn : false,
                    loading : false
                    
                }

        
        // these 3 cases are for logging out of the app 
        case USER_LOGOUT_REQUEST_STARTED:
            return  {
                    ...state ,
                    loading : true
                }
        case USER_LOGOUT_REQUEST_SUCCESS:
            return  {
                        ...state ,
                        loggedIn : false,
                        loading : false
                        
                    }
        case USER_SIGNUP_REQUEST_FAILED:
            return  {
                        ...state ,
                        loggedIn : false,
                        loading : false
                        
                    }


        // these 3 cases are for validating the existing jwt token
        case TOKEN_VERIFY_REQUEST_STARTED:
            return {
                ...state ,
                loading : true
            }
        case TOKEN_VERIFY_REQUEST_SUCCESS:
            return { 
                ...state ,
                    loggedIn : true,
                    userID : action.payload.userid,
                    authToken : action.payload.authToken,
                    loading : false
                }
        case TOKEN_VERIFY_REQUEST_FAILED:
            return {
                ...state ,
                loggedIn : false,
                loading : false
            }


        default:
            return state
    }
}