import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import React, {useEffect, FC, ReactElement} from 'react';
import { 
  View,
  Text,
  TouchableOpacity, 
  FlatList,
  Image,
  ImageBackground, 
} from 'react-native';
import { connect } from 'react-redux' 
import {COLORS, SIZES, FONTS, icons, images, uiText, dummyData} from '../constants';
import { getIconByString } from '../constants/icons';
import { fetchMissionFeed } from '../redux/actions';
import LinearGradient from 'react-native-linear-gradient'; 
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder'

 
type MissionFeedProps = {
    fetchMissionFeed:Function,
    loading:Boolean,
    missionFeedListItems : any[]
}

const MissionFeedList:FC<MissionFeedProps> = (({ loading,missionFeedListItems,fetchMissionFeed}) =>{
    //TODO is replace this bs right here lol 
    console.log({missionFeedListItems,loading})
    useEffect(()=>{
 
        fetchMissionFeed()},[])
    
    return (
      <View
        style={{
          //marginTop : SIZES.padding,
          marginHorizontal: SIZES.padding,
          padding: 20,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
        }}>
        <Text style={{...FONTS.h2}}>Hand Picked Missions</Text>
        <FlatList
          contentContainerStyle={{
            marginTop: SIZES.radius,
          }}
          scrollEnabled={false}
          data={loading ? [1,2,3,4,5].map((x,i)=>({id:i})) : missionFeedListItems}
          keyExtractor={(item, index) => item.id.toString()}
          renderItem={({item}) => {
            return loading ? <MissionListItemShimmerLoader id={item.id} /> : <MissionListItem  
                        id={item.id} 
                        platform={item.platform}  
                        title={item.title}
                        imageUrl={item.imageUrl}
                        pointValue={item.pointValue}
                        description={item.description}
                    />
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
    )
  }
)




type MissionListItemProps = {
    id:number, platform:string, title:string, imageUrl:string, pointValue:number,description:string
}


export const MissionListItem:FC<MissionListItemProps> = ({ id, platform, title, imageUrl, pointValue,description })=>{
    const navigation = useNavigation()
    return (
        <TouchableOpacity
          style={{
            flexDirection: 'column',
            alignItems: 'flex-start',
            paddingVertical: SIZES.padding,
          }}
            onPress={() => navigation.navigate("MissionView",{missionID : id})}
            key={id.toString()}  
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
              source={getIconByString(platform)}
            />
            <Text style={{...FONTS.h3}}>{title}</Text>
          </View>
          
          <ImageBackground
            source={{ uri: imageUrl}}
            
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
                  <Text>{pointValue}</Text></>
               
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
              {description}
          </Text>
        </TouchableOpacity>
      );
}

export const MissionListItemShimmerLoader:FC<{id:any}>= ({id})=>{
    return <View
    style={{
      flexDirection: 'column',
      alignItems: 'flex-start',
      paddingVertical: SIZES.padding,
    }}
     key={id.toString()}  
    >
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SIZES.radius / 2,
      }}>
       <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
        />
    </View>
    <ShimmerPlaceHolder
        LinearGradient={LinearGradient}
        style={{
            width: '100%',
            height: 100,
           
          }}
    />
    

 
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
    <ShimmerPlaceHolder
        LinearGradient={LinearGradient}
    
    />
    </Text>
  </View>
    
    
   

}



function mapStateToProps(state:any) {
    console.log({state})
    const { missionFeed } = state;
    return { loading : missionFeed.loading,missionFeedListItems : missionFeed.missionFeedListItems,  }
}
export default connect(mapStateToProps, { fetchMissionFeed })(MissionFeedList);
  
  