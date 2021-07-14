import {
    GET_MISSION_FEED_STARTED,
    GET_MISSION_FEED_FAILED,
    GET_MISSION_FEED_SUCCESS
} from '../actionTypes';
import { ThunkAction } from 'redux-thunk'
import { AnyAction } from 'redux'
import axios from 'axios'
import { RootState } from '../store'
import  { API_URL }  from '../../config'
import { v0 } from '../../config/apiRoutes';

export const getMissionFeedStared = () => ({
    type: GET_MISSION_FEED_STARTED
}) 
export const getMissionFeedFailed = () => ({
    type: GET_MISSION_FEED_FAILED
}) 
export const getMissionFeedSuccess = (data:any) => ({
    type: GET_MISSION_FEED_SUCCESS,
    payload : data
}) 


export const fetchMissionFeed = ():ThunkAction<void, RootState, unknown, AnyAction> => async dispatch =>  {
    console.log("ASDASDSAD",API_URL+v0.mission.getMissionFeed)
    dispatch(getMissionFeedStared())
    try{
        let missionFeedData = 
            await axios.get( API_URL+v0.mission.getMissionFeed ,{

            });

        console.log(missionFeedData)
        dispatch(getMissionFeedSuccess(missionFeedData.data))
        
    }catch(e){
        console.log(e)
        dispatch(getMissionFeedFailed())
    }
    
}