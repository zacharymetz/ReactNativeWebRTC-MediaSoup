import React, { FC, useState } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    Platform,
    Image,
    ImageBackground
} from 'react-native';
import { COLORS, SIZES, dummyData, FONTS, icons, images } from '../constants';
import {Picker} from '@react-native-picker/picker';
import { TextInput } from 'react-native-gesture-handler';
import { LargeButton } from '../components/Buttons';
import { RootStackParamList } from '../app/App';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
type props = {
    navigation:StackNavigationProp<RootStackParamList>;
    route:RouteProp<RootStackParamList,'EventDetailsScreen'>;
  }
  
const Facts:FC<props> = ({ navigation,route }) => {
 
        const event = dummyData.events.find(x=>x.eventID == route.params.eventID)
     

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
                    <Text style={{flexGrow : 1, textAlign : "center", color : COLORS.white, ...FONTS.h2}}>{event?.label}</Text>
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
            <View>

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

export default Facts;