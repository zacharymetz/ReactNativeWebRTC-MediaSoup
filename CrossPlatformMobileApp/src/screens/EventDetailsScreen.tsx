import React, { FC, useState } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    Platform,
    Image,
    ImageBackground,
    ActivityIndicator
} from 'react-native';
import { COLORS, SIZES, dummyData, FONTS, icons, images } from '../constants';
import {Picker} from '@react-native-picker/picker';
import { TextInput } from 'react-native-gesture-handler';
import { LargeButton } from '../components/Buttons';
import { RootStackParamList } from '../app/App';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import {loadEvent} from '../redux/actions'
import { connect } from 'react-redux';
import { useEffect } from 'react';
type EventDetailsScreenProps = {
    navigation:StackNavigationProp<RootStackParamList>;
    route:RouteProp<RootStackParamList,'EventDetailsScreen'>;
    loadEvent:Function;
    loading:boolean;
    error:string|null;
    event:any;
  }
  
const EventDetailsScreen:FC<EventDetailsScreenProps> = ({ navigation,route, loading,error,event,loadEvent }) => {
 
         useEffect(()=>{
            (async ()=>{
                loadEvent(route.params.eventID);
            })();
         },[]); 
    if(loading)
        return <View
            style={{
                height : "100%",
                width : "100%",
                justifyContent : "center",
                alignItems : "center"
            }}
        ><ActivityIndicator  size="large" /></View>
    
    return (
        <ScrollView
        stickyHeaderIndices={[0]}
        style={{paddingBottom : 100}}
        >
            <View style={{flex:1}}>
                 

                <ImageBackground
                    style={{
                        backgroundColor : COLORS.lightGray,
                        flexDirection : "row",
                        padding : SIZES.padding,
                        paddingTop : Platform.OS == 'ios'? SIZES.padding + (SIZES.padding*0.75) : SIZES.padding/2,
                        paddingBottom : SIZES.padding/2,
                        alignItems : "center"
                    }}
                    source={images.banner}
                >
                    <View
                       
                    >
                         
                         <TouchableOpacity
                        onPress={()=>navigation.goBack()}
                    >
                        <Image 
                            style={{
                                tintColor : COLORS.white,
                                height : 24,
                                width : 24
                            }}
                            source={icons.back_arrow}
                        />
                    </TouchableOpacity>
                         
                        
                    </View>
                    <Text style={{flexGrow : 1, textAlign : "center", color : COLORS.white, ...FONTS.h2}}>{event?.title}</Text>
                    <View
                        
                    ><TouchableOpacity
                    onPress={()=>{
                          
                            
                    }}
                >

                            <Image 
                                source={icons.question}
                                style={{height : 22, width : 22,tintColor : "white"}}
                            />
                            </TouchableOpacity>
                    </View>
                </ImageBackground>
                     
                 
            </View>
            {/* Body of the event details  */}
            <View
                style={{
                    padding : SIZES.padding
                   
                }}
            >
                <Text
                    style={{...FONTS.h2, marginBottom : SIZES.padding/2}}
                >
                    Event Host:
                </Text>
                <TouchableOpacity
                    onPress={()=>navigation.navigate('ViewProfileScreen',{profileID:1})}
                >
                    <View
                        style={{
                            flexDirection : "row",
                            alignItems : "center"
                            , marginBottom : SIZES.padding
                        }}
                    >
                        <Image 
                            source={{uri:"https://picsum.photos/64/64"}}
                            style={{
                                height : 64,
                                width : 64,
                                borderRadius : 64,
                                marginRight : SIZES.padding
                            }}
                        />
                        <View>
                            <Text
                                style={{...FONTS.h2}}
                            >Jordan Grant</Text>
                            <Text  style={{...FONTS.body5}}>Hosted 13 events before this</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                



                <Text
                    style={{...FONTS.h2, marginBottom : SIZES.padding/2}}
                >
                    Details:
                </Text>
                <TouchableOpacity 
                    style={{
                        marginBottom : SIZES.padding/2
                    }}
                >
                    <View
                        style={{
                            flexDirection : "row",
                            alignItems : "center"
                        }}
                    >
                        <Image 
                            source={icons.location_pin}
                            style={{

                                tintColor : COLORS.gray,
                                height : SIZES.body2,
                                width : SIZES.body2,
                                marginRight : SIZES.padding/4

                            }}
                        />
                        <Text
                            style={{...FONTS.body3}}
                        >{event.eventLocationString}</Text>
                    </View>
                </TouchableOpacity>
                
                
                <TouchableOpacity 
                    style={{
                        marginBottom : SIZES.padding
                    }}
                >
                    <View
                        style={{
                            flexDirection : "row",
                            alignItems : "center"
                        }}
                    >
                        <Image 
                            source={icons.clock}
                            style={{

                                tintColor : COLORS.gray,
                                height : SIZES.body2,
                                width : SIZES.body2,
                                marginRight : SIZES.padding/4

                            }}
                        />
                        <Text
                            style={{...FONTS.body3}}
                        >Friday Jan 21st 7:30 pm</Text>
                    </View>
                </TouchableOpacity>

                


                <Text style={{...FONTS.body3, marginBottom : SIZES.padding}}>{event?.description} </Text>




                {/* Other attendees  */}
                <Text
                    style={{...FONTS.h2, marginBottom : SIZES.padding/2}}
                >
                    Attendies (4/8):
                </Text>
                <View
                     style={{
                        flexDirection : "row",
                        alignItems : "center"
                        , marginBottom : SIZES.padding * 2
                    }}
                >
                    {[null,null,null,null].map(x=><TouchableOpacity
                         onPress={()=>navigation.navigate('ViewProfileScreen',{profileID:1})}
                    ><View 
                        style={{alignItems : "center", marginRight : SIZES.padding}}
                    >
                        <Image 
                            source={{uri:"https://picsum.photos/64/64"}}
                            style={{
                                height : 48,
                                width : 48,
                                borderRadius : 64,
                                marginBottom : SIZES.padding / 3
                            }}
                        />
                        <Text>Maria P.</Text>
                    </View></TouchableOpacity>)}
                    
                </View>
                <LargeButton 
                    onPress={console.log}
                    label={"Join Public Chat"}
                />
                <LargeButton 
                    onPress={console.log}
                    label={"Join Event"}
                />
            </View>
            
            
             
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    },
    inputGroup : {
        
        paddingBottom : SIZES.padding / 2
    },
    inputLabel : {
        ...FONTS.h3,
        fontWeight : 'bold'
    },
    input : {
        height: 40,
        margin: SIZES.padding/2,
        borderBottomWidth: 1,
        borderColor : COLORS.gray,
        textAlign : "left"
    }
})
function mapStateToProps(state:any) {
    console.log({state})
    const { eventReducer } = state;
    return { ...eventReducer }
}
export default connect(mapStateToProps, { loadEvent })(EventDetailsScreen);
 