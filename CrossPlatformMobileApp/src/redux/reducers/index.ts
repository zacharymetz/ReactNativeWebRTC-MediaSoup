import { combineReducers } from "redux";

import missionFeedReducer from "./missionFeedReducer";
import HealthCheckReducer from "./healthCheckReducer";
import UserAuthenticationReducer from "./authenticationReducer";
export default combineReducers({
    missionFeed:missionFeedReducer,
    healthCheck:HealthCheckReducer,
    userAuth:UserAuthenticationReducer
});