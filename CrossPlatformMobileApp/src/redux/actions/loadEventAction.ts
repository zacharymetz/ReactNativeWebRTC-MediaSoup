import {
    GET_EVENT_STARTED,
    GET_EVENT_SUCCESS,
    GET_EVENT_FAILED,
} from '../actionTypes';
import { ThunkAction } from 'redux-thunk'
import { AnyAction } from 'redux'
import axios from 'axios'
import { RootState } from '../store'
import  { API_URL }  from '../../config'
import { v0 } from '../../config/apiRoutes';

export const getEventStared = () => ({
    type: GET_EVENT_STARTED
}) 
export const getEventFailed = () => ({
    type: GET_EVENT_FAILED
}) 
export const getEventSuccess = (data:any) => ({
    type: GET_EVENT_SUCCESS,
    payload : data
}) 


export const loadEvent = (id:number):ThunkAction<void, RootState, unknown, AnyAction> => async dispatch =>  {
    console.log("The url i will hit in a sec",API_URL+v0.events.getEvent + id )
    dispatch(getEventStared())
    try{
        let missionFeedData = 
            await axios.get( API_URL+v0.events.getEvent + id  ,{

            });

        console.log(missionFeedData)
        dispatch(getEventSuccess(missionFeedData.data))
        
    }catch(e){
        console.log(e)
        dispatch(getEventFailed())
    }
    
}