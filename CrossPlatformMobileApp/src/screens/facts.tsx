import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    Platform,
    Dimensions,
    Image,
    ImageBackground
} from 'react-native';
import { COLORS, SIZES, dummyData, FONTS, icons, images } from '../constants';

const Facts = ({  }) => {
 
        const [parent,setParent] = useState(dummyData.factLibary)
        const [lastParent,setLastParent] = useState([])
        const facts =  <View
            style={{display :"flex",flexDirection : "row", flexWrap : "wrap", paddingBottom : 128}}
        >
            {parent.map(x=>{
                return <TouchableOpacity
                onPress={()=>{
                    switch(x.type){
                        case "folder":
                        
                            setLastParent([...lastParent,parent]);setParent(x.factLibary)
                        case "image":
                            // open the page for a full screen image
                        case "doc":  
                            // open the page for a full screen pdf 
                        case "video":
                            // open the page for a full screen video 
                        default:

                    }
                    
                }}
                    style={{ padding : SIZES.padding,  width : Dimensions.get("screen").width/2, height :  Dimensions.get("screen").width/2}}
                >
                    <View style={{height : "100%",width:"100%", display : "flex"}}>
                        <View style={{flexGrow : 1 ,padding : SIZES.padding/2,}}>
                            {x.type == "folder" ?
                                <Image 
                                    source={images.folder}
                                    resizeMode="cover"
                                    style={{height : "100%", width : "100%"}}
                                />
                            :null}
                             {x.type == "image" ?
                                <Image 
                                    source={{uri:x.thumbnail}}
                                    resizeMode="cover"
                                    style={{height : "100%", width : "100%"}}
                                />
                            :null}
                            {x.type == "doc" ?
                                <Image 
                                    source={icons.pdf}
                                    resizeMode="cover"
                                    style={{height : "100%", width : "100%"}}
                                />
                            :null}
                            {x.type == "video" ?
                                <Image 
                                    source={{uri:x.thumbnail}}
                                    resizeMode="cover"
                                    style={{height : "100%", width : "100%"}}
                                />
                            :null}
                        </View>
                        <Text style={{...FONTS.h3,textAlign : "center"}}   >{x.name}</Text>
                         
                    </View>
                </TouchableOpacity>
            })}

        </View>
     

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
                        {lastParent.length > 0 ?
                        <TouchableOpacity
                        onPress={()=>{
                             
                            if(lastParent){
                                setParent(lastParent.pop());
                                
                                setLastParent([...lastParent])  

                            }
                                
                        }}
                    >
                        <Image 
                            source={icons.back_arrow}
                            style={{height : 16, width : 16,tintColor : "white"}}
                        />
                    </TouchableOpacity>
                        : null }
                        
                    </View>
                    <Text style={{flexGrow : 1, textAlign : "center", color : COLORS.white, ...FONTS.h2}}>Fact Library</Text>
                    <View
                        
                    >
                            <Image 
                                source={icons.target}
                                style={{height : 16, width : 16,tintColor : "white"}}
                            />
                    </View>
                </ImageBackground>
                     
                 
            </View>
            {facts}
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
    }
})

export default Facts;