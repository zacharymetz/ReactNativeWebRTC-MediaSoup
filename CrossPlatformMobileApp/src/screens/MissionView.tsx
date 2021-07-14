import React, {useEffect, version,FC} from 'react';
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
import {COLORS, SIZES, FONTS, icons, images, uiText, dummyData} from '../constants';

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../app/App';
 
type props = {
  navigation:StackNavigationProp<RootStackParamList>;
  route:RouteProp<RootStackParamList,'MissionView'>;
}


const MissionView:FC<props> =  ({ route , navigation }) =>{

    // get the dummy data and show it here
    const mission = dummyData.missionFeedList.find(x=>x.id == route.params.missionID)


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
                         onPress={() => navigation.goBack()}
                    >
                        <Image 
                            source={icons.back_arrow}
                            style={{height : 16, width : 16,tintColor : "white"}}
                        />
                    </TouchableOpacity>
                         
                        
                    </View>
                    <Text style={{flexGrow : 1, textAlign : "center", color : COLORS.white, ...FONTS.h2}}>Mission</Text>
                    <View
                        
                    >
                            <Image 
                                source={icons.target}
                                style={{height : 16, width : 16,tintColor : "white"}}
                            />
                    </View>
                </ImageBackground>
                     
                {mission?.completed ?
                  <View
                  style={{backgroundColor : COLORS.green,padding : SIZES.padding/2, paddingVertical : SIZES.padding/4,flexDirection :"row"}}
              >
                  <Image 
                      source={icons.settings}
                      style={{
                          tintColor : COLORS.white,
                          height : SIZES.body3,
                          width : SIZES.body3,
                          marginRight : SIZES.padding/4
                      }}
                  />
                  <Text
                      style={{color : COLORS.white}}
                  >You have completed this mission</Text>
              </View>
                : null}
            </View>
          
            <ImageBackground
                    source={{uri:"https://picsum.photos/2000/3000"}}
                    style={{
                        width : Dimensions.get("screen").width,
                        height : Dimensions.get("screen").width/2
                    }}
                    resizeMode="cover"
                >

                   
                </ImageBackground>
            <View
                style={{
                    padding : SIZES.padding
                }}
            >
                
                <Text 
                    style={{...FONTS.h1}}
                >
                    {mission?.title}
                </Text>
                {/* Tags  */}
                <View
                    style={{
                        flexDirection : "row",
                        padding : SIZES.padding/4,
                        marginBottom : SIZES.padding/4
                    }}
                >
                    {["30 Seconds","Hate","Report"].map(x=>{
                        return <View
                            style={{paddingHorizontal : SIZES.padding/2, backgroundColor : COLORS.lightGray, borderRadius : 222, marginRight : SIZES.padding/2}}
                        >
                            <Text
                                style={{...FONTS.body5}}
                            >
                                {x}
                            </Text>
                        </View>
                    })}
                </View>


                {/* long description */}
                <Text
                    style={{...FONTS.body2}}
                >
                    {mission?.description}
                </Text>

                {/* How to do the action desciption right here */}
                <View
                    style={{
                        paddingVertical : SIZES.padding
                    }}
                >
                    <Text
                     style={{...FONTS.body2}}
                    >
                        How To Report:
                    </Text>
                    <Text style={{...FONTS.body3}}>
                        To report the post and stop the stpread of mis information do the following steps and 
                    </Text>
                    <Image 
                        source={{uri : "https://picsum.photos/2000/3000"}}
                        
                        style={{
                            width : "100%",
                            height : 400,
                            paddingVertical : SIZES.padding/2
                        }}
                    />
                    <Image 
                        source={{uri : "https://picsum.photos/2000/3000"}}
                        
                        style={{
                            width : "100%",
                            height : 400,
                            paddingVertical : SIZES.padding/2
                        }}
                    />
                </View>


                {/* Call to action goes down here  */}
                <View 
                    style={{
                        borderColor : COLORS.black,
                        borderWidth : 1,
                        borderStyle : "solid",
                        borderRadius : 6,
                        marginTop : SIZES.padding
                    }}
                >
                    <View 
                        style={{
                            
                        padding : SIZES.padding/2,
                        borderBottomWidth : 1,
                        borderColor : COLORS.black
                        }}
                    >
                        <Text 
                            style={{...FONTS.h2}}
                        >Report This Post On Facebook</Text>
                    </View>
                    <View style={{
                            
                            padding : SIZES.padding/2,}}>
                        <Text
                            style={{marginBottom : SIZES.padding *1.25}}
                        >
                            Click Below to be redirected to facebook and start your mission
                        </Text>
                        <TouchableOpacity
                            style={{
                                padding : SIZES.padding/2,
                                paddingVertical : SIZES.padding/4,
                                borderColor : COLORS.black,
                                borderWidth : 1,
                                display : "flex",
                                alignItems : "center",
                                borderRadius : SIZES.radius
                            }}  
                        >
                            <Text
                                style={{
                                    ... FONTS.h2
                                }}
                            >
                                Click to Action
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View
                    style={{

                        paddingVertical : SIZES.padding
                    }}
                >
                    <TouchableOpacity
                        style={{
                            padding : SIZES.padding/2,
                            paddingVertical : SIZES.padding/4,
                            borderColor : COLORS.green,
                            borderWidth : 1,
                            display : "flex",
                            alignItems : "center",
                            borderRadius : SIZES.radius,
                            backgroundColor : COLORS.primary
                        }}  

                        onPress={() => navigation.navigate("MissionCompletedView")}
                    >
                        <Text
                            style={{
                                ... FONTS.h2,
                                color : COLORS.green,
                                textAlign : "center"
                            }}
                        >
                            Done ? Claim your Points !
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
             {/* stick scroll bar */}
        </ScrollView>
    )
}

export default MissionView;