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



export default ({ navigation }) =>{
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
                  <Text style={{flexGrow : 1, textAlign : "center", color : COLORS.white, ...FONTS.h2}}>Combo</Text>
                  <View
                      
                  >
                          <Image 
                              source={icons.target}
                              style={{height : 16, width : 16,tintColor : "white"}}
                          />
                  </View>
              </ImageBackground>
                   
               
          </View>
          
           {/* stick scroll bar */}
      </ScrollView>
  )
}