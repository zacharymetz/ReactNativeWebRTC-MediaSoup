import {
    GET_EVENTS_STARTED,
    GET_EVENTS_SUCCESS,
    GET_EVENTS_FAILED,
} from '../actionTypes';
import { ThunkAction } from 'redux-thunk'
import { AnyAction } from 'redux'
import axios from 'axios'
import { RootState } from '../store'
import  { API_URL }  from '../../config'
import { v0 } from '../../config/apiRoutes';

export const getEventsStared = () => ({
    type: GET_EVENTS_STARTED
}) 
export const getEventsFailed = () => ({
    type: GET_EVENTS_FAILED
}) 
export const getEventsSuccess = (data:any) => ({
    type: GET_EVENTS_SUCCESS,
    payload : data
}) 


export const fetchEvents = (x:number,y:number,zoom:number):ThunkAction<void, RootState, unknown, AnyAction> => async dispatch =>  {
    console.log("The url i will hit in a sec",API_URL+v0.events.getEvents)
    dispatch(getEventsStared())
    try{
        let missionFeedData = 
            await axios.get( API_URL+v0.events.getEvents ,{

            });

        console.log(missionFeedData)
        dispatch(getEventsSuccess(missionFeedData.data))
        
    }catch(e){
        console.log(e)
        dispatch(getEventsFailed())
    }
    
}