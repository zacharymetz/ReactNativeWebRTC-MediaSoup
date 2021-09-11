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
import { UrlTile } from 'react-native-maps';
import { RootStackParamList } from '../app/App';
import {COLORS, SIZES, FONTS, icons, images, uiText, dummyData} from '../constants'; 
import MissionFeedList from '../components/MissionFeed';
import {fetchEvents} from '../redux/actions';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useState } from 'react';
import { Socket } from 'socket.io-client';
import { Device } from 'mediasoup-client';
import { RtpCapabilities } from 'mediasoup-client/lib/types';
import {
    RTCPeerConnection,
    RTCIceCandidate,
    RTCSessionDescription,
    RTCView,
    MediaStream,
    MediaStreamTrack,
    mediaDevices,
    registerGlobals
  } from 'react-native-webrtc';
type MapScreenScreenProps = {
  navigation:StackNavigationProp<RootStackParamList>;
  fetchEvents:Function,
  events:any[],
  authToken:string
}

const MapScreen: FC<MapScreenScreenProps> = ({ navigation,fetchEvents, events,authToken} ) => { 
    
    const [stream, setStream] = useState(null)
    useEffect(()=>{fetchEvents()},[])
    useEffect(()=>{
        registerGlobals();
        const io = require("socket.io-client");

        const socket = io("https://192.168.1.68:3000",{
            extraHeaders: {
              Authorization: "Bearer " + authToken
            }
          });
        // this is a helper to make my life easier 
        socket.request = socketPromise(socket);
        
        let producer;
        socket.request('getRouterRtpCapabilities').then(async (routerRtpCapabilities:RtpCapabilities)=>{
            try{
                let device:Device = new Device();
                console.log(1)
                await device.load({ routerRtpCapabilities });
                console.log(2)
                console.log(device)
                // okay down here we should be connected to the server and have something 

                // so lets start producing 
                const data = await socket.request('createProducerTransport', {
                    forceTcp: false,
                    rtpCapabilities: device.rtpCapabilities,
                });
                console.log(data)
                const transport = device.createSendTransport(data);
                console.log({transport})

                // on transport connect 
                transport.on('connect', async ({ dtlsParameters }, callback, errback) => {
                    console.log("transport has connected lmao",{dtlsParameters})
                    
                    socket.request('connectProducerTransport', { dtlsParameters,transport : {id :transport.id }  })
                      .then(callback)
                      .catch(errback);
                    console.log("sent request to connectProducerTransport")
                  });


                // on produce 
                transport.on('produce', async ({ kind, rtpParameters }, callback, errback) => {
                    console.log("the server wants me to start producing media now")
                    try {
                      const { id } = await socket.request('produce', {
                        transport:{id: transport.id },
                        kind,
                        rtpParameters,
                      });
                      callback({ id });
                    } catch (err) {
                      errback(err);
                    }
                  });

                // on connection state change
                transport.on('connectionstatechange', (state) => {
                    console.log("the transport state has changed",state)
                    switch (state) {
                      case 'connecting':
                        console.log('connecting')
                      break;
                
                      case 'connected':
                        //document.querySelector('#local_video').srcObject = stream;
                        console.log('connected')
                      break;
                
                      case 'failed':
                        transport.close();
                        $txtPublish.innerHTML = 'failed';
                        $fsPublish.disabled = false;
                        $fsSubscribe.disabled = true;
                      break;
                
                      default: break;
                    }
                  });

                  console.log("device can produce video",device.canProduce('video'))
                 
                  mediaDevices.enumerateDevices().then(async sourceInfos=>{
                    console.log(sourceInfos);
                    let videoSourceId;
                    for (let i = 0; i < sourceInfos.length; i++) {
                      const sourceInfo = sourceInfos[i];
                      if(sourceInfo.kind == "videoinput" && sourceInfo.facing == ("environment")) {
                        videoSourceId = sourceInfo.deviceId;
                      }
                    }
                    const stream = await mediaDevices.getUserMedia({
                        audio: true,
                        video: {
                          width: 640,
                          height: 480,
                          frameRate: 30,
                          facingMode: ("environment"),
                          deviceId: videoSourceId
                        }
                  })
                  setStream(stream)
                  console.log({stream})
                  const track = stream.getVideoTracks()[0];
                  const params = { track };
                  try{
                    const producer = await transport.produce(params);
                  }catch(e){
                      console.log(e)
                  }
                  
                })


            
            }catch(e){
                console.log(e)
            }

            
        })

          

        console.log(socket,authToken)
        

    },[])

  return (
     
  <View style={{paddingTop : 64, display : "flex"}}>
      <Text>Yo</Text>
      {stream ? 
         <Text>{stream.toURL()}</Text>
      :null}
      {stream ? 
        <RTCView streamURL={stream.toURL()} style={{height : 400,width : 400,
            backgroundColor: '#4F4'}} />
      :null}
  </View>
    
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


function mapStateToProps(state:any) {
    console.log({state})
    const { missions, userAuth } = state;
    console.log("the props im passing to the app",{ ...missions, ...userAuth })
    return { ...missions, ...userAuth }
}
export default connect(mapStateToProps, { fetchEvents })(MapScreen);

 
function socketPromise(socket:Socket) {
    return function request(type:any, data = {}) {
      return new Promise((resolve) => {
        socket.emit(type, data, resolve);
      });
    }
  };
  