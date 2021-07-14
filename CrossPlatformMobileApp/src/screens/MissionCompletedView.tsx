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
      <View
        style={{
            height : "100%",
            width : "100%",
            justifyContent : "center",
            alignItems : "center"
        }}
      >
            <Text>25 Points !</Text>
           <Text>Nice you did it !</Text>
           <View
                style={{height: 145, paddingHorizontal : SIZES.padding}}
            >
               <Text>Check out these related missions</Text>
               <FlatList
             
            data={dummyData.missionFeedList}
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
                  onPress={() => navigation.navigate("MissionView",{challengeID : item.id})}
                  >
                    <ImageBackground
                      source={{uri:item.imageUrl}}
                      resizeMode="cover" 
                      style={{flex: 1, alignItems: 'flex-start',justifyContent : "flex-end"}}
                    >
                      <View
                        style={{ backgroundColor : "white",flexDirection : "row",marginLeft : SIZES.padding/5,padding : SIZES.padding/4,borderTopLeftRadius :6,borderTopRightRadius : 6, paddingBottom:0 }}
                      >
                    
                         <Text>Points:</Text>
                        <Text>{item.pointValue}</Text> 
                     
                   
                    </View>
                    </ImageBackground>
                    <View
                      style={{
                        paddingVertical: SIZES.padding / 2,
                        paddingHorizontal: SIZES.padding / 2,
                        flexDirection : "row"
                      }}
                    >

<Image
                    style={{height: 16, width: 16, marginRight: 6}}
                    source={icons[item.platform]}
                  /><Text style={{...FONTS.h5}}>{item.title}</Text>
                    
                    </View>
                    
                  
                  
                </TouchableOpacity>
              );
            }}
            keyExtractor={item => '${item.id}'}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
           </View>
           <TouchableOpacity
                onPress={()=>navigation.navigate("Home")}
           >
               <Text>Go Back To Mission Feed</Text>
           </TouchableOpacity>
      </View>
  )
}