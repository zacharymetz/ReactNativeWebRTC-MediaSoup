import React, {useEffect} from 'react';
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
} from 'react-native';
import {COLORS, SIZES, FONTS, icons, images, uiText, dummyData} from '../constants';
import * as Progress from 'react-native-progress';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
type RootStackParamList = {
  props : { challengeID : Number; }
}

type props = {
  navigation:StackNavigationProp<RootStackParamList,'props'>;
  route:RouteProp<RootStackParamList,'props'>;
}


const Home = ({ navigation, route }:props) =>{

    // get the challenge that we went too 
    const challenge = dummyData.dailyChallengesList.find(x=>x.id == route.params.challengeID);
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
                  <Text style={{flexGrow : 1, textAlign : "center", color : COLORS.white, ...FONTS.h2}}>Challenge</Text>
                  <View
                      
                  >
                          <Image 
                              source={icons.target}
                              style={{height : 16, width : 16,tintColor : "white"}}
                          />
                  </View>
              </ImageBackground>
                   
               
          </View>
                  
            <View style={{padding:SIZES.padding, alignItems: "center"}}>
              <Text style={{ ...FONTS.h1, textAlign : "center" }}>
                  {challenge?.title}
              </Text>
              <Text style={{ ...FONTS.body3 }}>
                   Here is a desciption abou the mission 
              </Text>
              <Text style={{ ...FONTS.h2, textAlign : "center" }}>
                  Reward:
              </Text>
              <Text style={{ ...FONTS.h2, textAlign : "center" }}>
                  Progress
              </Text>
              <Progress.Circle progress={challenge?.progress.percent} size={200} showsText color={COLORS.primary} thickness={10} borderWidth={3}  />
              <Text style={{ ...FONTS.h3, textAlign : "center" }}>
                  Checkout these missions to help you finish this challenge
              </Text>
              <View
        style={{
          marginTop : SIZES.padding,
           
          padding: 20,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
        }}>
              <Text style={{ ...FONTS.h2 }}>
                Suggested Missions     
              </Text>
              <FlatList
          contentContainerStyle={{
            marginTop: SIZES.radius,
          }}
          scrollEnabled={false}
          data={dummyData.missionFeedList}
          keyExtractor={(item, index) => item.id.toString()}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                style={{
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  paddingVertical: SIZES.padding,
                }}
                  onPress={() => navigation.navigate("MissionView",{missionID : item.id})}
                >
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: SIZES.radius / 2,
                  }}>
                  <Image
                    style={{height: 18, width: 18, marginRight: SIZES.radius}}
                    source={icons[item.platform]}
                  />
                  <Text style={{...FONTS.h3}}>{item.title}</Text>
                </View>
                
                <ImageBackground
                  source={{ uri: item.imageUrl}}
                  
                  resizeMode="cover"
                  style={{
                    width: '100%',
                    height: 100,
                    marginBottom: SIZES.radius,
                    alignItems: 'flex-start',justifyContent : "flex-end"
                  }}
                >

<View
                        style={{ backgroundColor : "white",flexDirection : "row",marginLeft : SIZES.padding/5,padding : SIZES.padding/4,borderTopLeftRadius :6,borderTopRightRadius : 6, paddingBottom:0 }}
                      >
                     
                       
                        <><Text>Points:</Text>
                        <Text>{item.pointValue}</Text></>
                     
                    </View>
                </ImageBackground>
                <View
                    style={{
                        flexDirection : "row",
                        padding : SIZES.padding/4
                    }}
                >
                    {["30 Seconds","Hate","Report"].map(x=>{
                        return <TouchableOpacity
                            style={{paddingHorizontal : SIZES.padding/2, backgroundColor : COLORS.lightGray, borderRadius : 222, marginRight : SIZES.padding/2}}
                        >
                            <Text
                                style={{...FONTS.body5}}
                            >
                                {x}
                            </Text>
                        </TouchableOpacity>
                    })}
                </View>
                <Text style={{...FONTS.body5}}>
                    {item.description}
                </Text>
              </TouchableOpacity>
            );
          }}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => {
            return (
              <View
                style={{
                  width: '100%',
                  backgroundColor: COLORS.lightGray,
                  height: 1,
                }}></View>
            );
          }}
        />
           </View>
            </View>
      </ScrollView>
  )
}


export default Home;