import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, {useEffect, FC, ReactElement} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  ImageBackground,
  Platform,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux'
import { AnyAction } from 'redux';
import { RootStackParamList } from '../app/App';
import {COLORS, SIZES, FONTS, icons, images, uiText, dummyData} from '../constants'; 
import MissionFeedList from '../components/MissionFeed';
import {postLogoutRequest} from '../redux/actions';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useState } from 'react';
type HomeScreenProps = {
  navigation:StackNavigationProp<RootStackParamList>;
  postLogoutRequest:Function
}

const Home: FC<HomeScreenProps> = ({ navigation,postLogoutRequest} ) => { 
    
    const [showEvents, setShowEvents] = useState(false)


  return (
     
  <MapView
    initialRegion={{
      latitude: 51.0447,
      longitude:  -114.0719,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
    style={{
        height : "100%",
        width : "100%" 
    }}
    onRegionChange={(region)=>{
         
        setShowEvents((Math.log2(360 * (Dimensions.get('screen').width / 256 / region.longitudeDelta)) + 1) > 16.9)
           
    }}
  >     
            {showEvents ? dummyData.events.map(event=><EventMarker {...event} />) : dummyData.eventNumbers.map(event=><EventNumberMarker {...event} />)}
          
 
  </MapView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 12,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "black",
  },
  triangleDown: {
    transform: [{ rotate: "180deg" }],
  },
});


type EventMarkerProps = {
    latitude: number,
    longitude: number,
    capcaityPercentage: number,
    label:string,
    startTime:Date,
    eventID:number
}


const EventMarker:FC<EventMarkerProps> = ({ latitude,longitude, capcaityPercentage, label, startTime, eventID  })=>{
    const navigator = useNavigation()
    
    const timeUntil =new Date((startTime.getTime() -  new Date().getTime())).toISOString().substr(11, 8).split(":") 
    const timeUntilString = timeUntil[0] + "h "+timeUntil[1] + "m"
    return <Marker coordinate={{
        latitude: latitude,
        longitude: longitude
        }}
        onPress={()=>navigator.navigate("EventDetailsScreen",{eventID})}
        >
    <TouchableOpacity
        
    >
            <View style={{ 
            
            borderRadius : 4,
            
            borderWidth : 2,
            borderColor : "black"
        }} >
            <View
                style={{
                    flexDirection : "row",
                    paddingVertical : SIZES.padding/6,
                    paddingHorizontal : 2
                }}
            >
                {[null,null,null,null].map((x,i)=><View
                    style={{

                        
                        paddingHorizontal : 1
                    }}
                ><Image
                    source={(i+1)/4 <= capcaityPercentage ? icons.man : icons.man_outline}
                    resizeMode="stretch"
                    style={{
                        height : 24,
                        width : 8
                    }}
                /></View>)}
            </View>
            <View
                style={{position : "absolute",
            left: "100%"}}
            >
                <View
                    style={{
                        paddingTop : 2,
                        width : 300
                    }}
                >
                    <Text  
                        style={{
                            ...FONTS.h3,
                            fontWeight : 'bold',
                            marginBottom : -8
                        }}
                    > {label} </Text>
                    <Text
                        style={{
                            ...FONTS.body5,
                            paddingLeft : SIZES.padding / 2
                        }}
                    >{timeUntilString}</Text>
                </View>
            </View>

            <View
                style={{position : "absolute",
                top: "99%", left:  " 30%"}}
            >   
                <View
                    style ={{...styles.triangle,...styles.triangleDown}}
                >

                </View>
            </View>
        
        </View>
    </TouchableOpacity>
    </Marker>
};

type EventNumberMarkerProps = {
    latitude: number,
    longitude: number,
    numberOfEvents :number
}
const EventNumberMarker:FC<EventNumberMarkerProps> = ({latitude,longitude,numberOfEvents}) =>{
    return <Marker
        coordinate={{
        latitude: latitude,
        longitude: longitude
        }}
    >
        <View
            style={{
                height : SIZES.padding,
                width : SIZES.padding,
                borderRadius : 10000,
                backgroundColor : COLORS.primary,
                justifyContent : "center",
                alignItems : "center"
            }}
        >
            <Text
                style={{color:COLORS.white}}
            >
                {numberOfEvents}
            </Text>
        </View>
    </Marker>
}


 
export default connect(null, { postLogoutRequest })(Home);

 
