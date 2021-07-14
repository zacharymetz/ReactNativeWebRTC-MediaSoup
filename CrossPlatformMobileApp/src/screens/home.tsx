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
} from 'react-native';
import { connect } from 'react-redux'
import { AnyAction } from 'redux';
import { RootStackParamList } from '../app/App';
import {COLORS, SIZES, FONTS, icons, images, uiText, dummyData} from '../constants'; 
import MissionFeedList from '../components/MissionFeed';
import {postLogoutRequest} from '../redux/actions'
type HomeScreenProps = {
  navigation:StackNavigationProp<RootStackParamList>;
  postLogoutRequest:Function
}

const Home: FC<HomeScreenProps> = ({ navigation,postLogoutRequest} ) => { 

  function renderHeader() {
    return (
      <View
        style={{
          width: '100%',
          height: 290,
          ...styles.shadow,
          marginBottom: '20%',
        }}>
        <ImageBackground
          source={images.banner}
          resizeMode="cover"
          style={{flex: 1, alignItems: 'center'}}>
          {/* Header bar */}
          <View
            style={{
              marginTop:
                Platform.OS == 'ios' ? SIZES.padding * 2 : SIZES.padding,
              width: '100%',
              alignItems: 'flex-end',
              paddingHorizontal: SIZES.padding,
            }}>
            <TouchableOpacity
              style={{
                width: 35,
                height: 35,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={()=>postLogoutRequest(navigation)}>
              <Image
                source={icons.notification_white}
                resizeMode="contain"
                style={{flex: 1}}
              />
            </TouchableOpacity>
          </View>

          {/* Headline  */}
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
            }}>
            <Text style={{color: COLORS.white, ...FONTS.h3}}>
              Welcome Back {dummyData.userProfile.username}
            </Text>
            <Text style={{color: COLORS.white, ...FONTS.h1}}>{dummyData.userProfile.pointsUntilNextLevel} Points</Text>
            <Text style={{color: COLORS.white, ...FONTS.body5}}>Until you reach level {dummyData.userProfile.level+1}</Text>
          </View>

          {/* Trending */}
        </ImageBackground>
        <View
          style={{
            position: 'absolute',
            bottom: '-20%',
          }}>
          <Text
            style={{
              marginLeft: SIZES.padding,
              color: COLORS.white,
              ...FONTS.h2,
              marginBottom: SIZES.padding,
            }}>
            {uiText.titles.homeScreenChallenges}
          </Text>
          <FlatList
            contentContainerStyle={{
              marginRight: SIZES.base,
            }}
            data={dummyData.dailyChallengesList}
            renderItem={({index,item}) => {
              return (
                <TouchableOpacity
                  style={{
                    width: 220,
                    height: 130,
                   
                    marginLeft: index === 0 ? SIZES.padding : 0,
                    marginRight: SIZES.radius,
                    borderRadius: 10,
                    backgroundColor: COLORS.white,
                  }}
                  onPress={() => navigation.navigate("ChallengeView",{challengeID : item.id})}
                  >
                    <ImageBackground
                      source={{uri:item.imageUrl}}
                      resizeMode="cover" 
                      style={{flex: 1, alignItems: 'flex-start',justifyContent : "flex-end"}}
                    >
                      <View
                        style={{ backgroundColor : "white",flexDirection : "row",marginLeft : SIZES.padding/5,padding : SIZES.padding/4,borderTopLeftRadius :6,borderTopRightRadius : 6, paddingBottom:0 }}
                      >
                    {item.reward.isBadge ? 
                        <> 
                        <Text>Cool Badge Name</Text></>
                      : 
                       
                        <><Text>Points:</Text>
                        <Text>{item.reward.points}</Text></>
                     
                    } 
                    </View>
                    </ImageBackground>
                    <View
                      style={{
                        paddingVertical: SIZES.padding / 4,
                        paddingHorizontal: SIZES.padding / 2,
                      }}
                    >

                  <Text style={{...FONTS.h4}}>{item.title}</Text>
                    
                    </View>
                    
                  
                  
                </TouchableOpacity>
              );
            }}
            keyExtractor={item => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    );
  }



  return (
    <ScrollView>
      <View style={{flex: 1, paddingBottom: 100}}>
        {renderHeader()}
        <MissionFeedList />
        <View
          style={{
            padding: 16,
          }}></View>
      </View>
    </ScrollView>
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
});



 
export default connect(null, { postLogoutRequest })(Home);

 
