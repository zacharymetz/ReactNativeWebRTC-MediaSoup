import React from 'react';
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
import {COLORS, SIZES, FONTS, images, icons, dummyData} from '../constants';
import { postLogoutRequest } from '../redux/actions';

const Progress = ({ navigation, postLogoutRequest }) => {
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
              style={{
                width: 26,
                height: 26,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={()=> postLogoutRequest(navigation)}>
              <Image
                source={icons.exit} 
                resizeMode="contain"
                style={{flex: 1,tintColor : "white"}}
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

  function renderBadgeList() {
    return (
      <View>
        <View
          style={{
            padding: SIZES.padding,
            paddingBottom : 0,
            flexDirection: 'row',
            alignItems: 'center',
           
          }}>
          <Text style={{...FONTS.h2, marginRight: 14}}>Badges</Text>
          <Text style={{...FONTS.body3, color: COLORS.gray}}>13/240</Text>
        </View>
        <View
          style={{
            padding: SIZES.padding,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly',
            paddingBottom: 128,
          }}>
          {[...new Array(30)].map(x => (
            <TouchableOpacity
              style={{
                margin: SIZES.padding / 4,
                backgroundColor: COLORS.secondary,
                height: 64,
                width: 64,
                borderRadius: 32,
              }}></TouchableOpacity>
          ))}
        </View>
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

export default connect(null, { postLogoutRequest })(Progress);

 