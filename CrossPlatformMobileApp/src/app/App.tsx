/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import Tabs from "../navigation/tabs"; 


// unauthscreens 
import LandingScreen from '../screens/LandingScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';

// additional screens out side the davication thing 
import MissionView from '../screens/MissionView'
import ChallengeView from '../screens/ChallengeView';
import MissionCompletedView from '../screens/MissionCompletedView';
import ComboSessionLandingView from '../screens/comboSessionLandingView';

import EventDetailsScreen from '../screens/EventDetailsScreen'
import { Provider } from 'react-redux'
import store from '../redux/store'


export type RootStackParamList = {
  ChallengeView : { challengeID :number },
  MissionView : { missionID: number},
  MissionCompletedView : { missionID: number},
  EventDetailsScreen : {eventID:number}
}

const Stack = createStackNavigator();


 
 
const App = () => {
   
  return (
    <Provider store={store} >
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName={'LandingScreen'}
      >

        <Stack.Screen
          name="LandingScreen"
          component={LandingScreen}
        />

        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
        />
        <Stack.Screen
          name="SignupScreen"
          component={SignupScreen}
        />

        <Stack.Screen
          name="EventDetailsScreen"
          component={EventDetailsScreen}
        />

         
        <Stack.Screen
          name="Home"
          component={Tabs}
        />

        {/* Mission Specific Screens */}
        <Stack.Screen
          name="MissionView"
          component={MissionView}
        />
        <Stack.Screen
          name="MissionCompletedView"
          component={MissionCompletedView}
        />

        {/* Challenge Specifc Screens */}
        <Stack.Screen
          name="ChallengeView"
          component={ChallengeView}
        />

        {/* Combo Speciic Screen */}
        <Stack.Screen
          name="ComboSessionLandingView"
          component={ComboSessionLandingView}
        />
      </Stack.Navigator>
    </NavigationContainer> 
    </Provider>
  );
};
 

export default App;
