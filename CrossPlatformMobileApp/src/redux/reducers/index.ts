import { combineReducers } from "redux";

import EventReducer from "./eventFetchReducer";
import HealthCheckReducer from "./healthCheckReducer";
import UserAuthenticationReducer from "./authenticationReducer";
import loadEventReducer from "./loadEventReducer";
export default combineReducers({
    missions:EventReducer,
    eventReducer:loadEventReducer,
    healthCheck:HealthCheckReducer,
    userAuth:UserAuthenticationReducer
});