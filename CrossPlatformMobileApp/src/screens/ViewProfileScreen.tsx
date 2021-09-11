import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, {FC} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import { RootStackParamList } from '../app/App';
import {COLORS, SIZES, FONTS, images, icons, dummyData} from '../constants';
import { postLogoutRequest } from '../redux/actions';
type props = {
    navigation:StackNavigationProp<RootStackParamList>;
    route:RouteProp<RootStackParamList,'ViewProfileScreen'>;
  }
  
const ViewProfileScreen:FC<props> = ({ navigation, route }) => {
  function renderHeader() {
    return (
      <View
        style={{
          width: '100%',
          height: Platform.OS === 'ios' ? 250 : 225,
          ...styles.shadow,
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
              flexDirection : 'row',
              paddingHorizontal: SIZES.padding,
            }}>
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
            <View style={{flexGrow: 2}}></View>
            <TouchableOpacity
              style={{
                width: 35,
                height: 35,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={console.log}>
              <Image
                source={icons.notification_white}
                resizeMode="contain"
                style={{flex: 1, display : "none"}}
              />
            </TouchableOpacity>
          </View>

          {/* Headline  */}
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
              marginTop: 42,
            }}>
            <Image
              source={{uri : dummyData.userProfile.profileImageUrl}}
              style={{
                height: 196,
                width: 196,
                borderRadius : 196,
                marginBottom : SIZES.padding
              }}
            />
            <Text style={{color: COLORS.black, ...FONTS.h2}}>
              John Doe
            </Text>
             
          </View>

          {/* Summary */}
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: SIZES.padding,
              marginTop: -24,
            }}>
              
          </View>
        </ImageBackground>
      </View>
    );
  }

   
  return (
    <ScrollView  style={{
       
      }}>
     
        {renderHeader()}
        <View
          style={{
            paddingTop : 128,
            alignItems : "center"
          }}
        >
        <Text>
           asd
         </Text>
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

export default ViewProfileScreen;

 