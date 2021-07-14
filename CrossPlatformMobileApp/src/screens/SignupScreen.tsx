import React, { useState } from 'react';
import { useEffect } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Text,
    ActivityIndicator,
    TouchableOpacity,
    Dimensions,
    Image,
    ImageBackground
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { connect } from 'react-redux';
import { COLORS, SIZES, dummyData, FONTS, icons, images } from '../constants';
import { postLoginRequest } from '../redux/actions';
import { LargeButton } from '../components/Buttons';
/*
The screen will ping the server to see if there is a connection 
then check the authentication statuts and verify it with the server 
*/
const SignupScreen = ({ loading, postLoginRequest }) => {
    const navigation = useNavigation()
    //useEffect(()=>fetchHealthCheck(),[]);
    const [email, setEmail] = useState("lim@gmail.com");
    const [password, setPassword] = useState("q1w2e3r4");
    return (
        <View style={{ justifyContent : "center", alignItems : "center", height : "100%", width : "100%"}} >
                <View
                    style={{
                        paddingTop : SIZES.padding * 2,
                        paddingLeft :SIZES.padding,
                        width : "100%",
                        zIndex : 2
                    }}
                >
                    <TouchableOpacity
                        onPress={()=>navigation.goBack()}
                    >
                        <Image 
                            style={{
                                tintColor : COLORS.primary,
                                height : 24,
                                width : 24
                            }}
                            source={icons.back_arrow}
                        />
                    </TouchableOpacity>
                    
                </View>
                <View  
                    style={{
                         padding : SIZES.padding,
                         width : "100%",
                         flexGrow : 1,
                         justifyContent : "center", alignItems : "center",
                         marginTop : -(24 + (SIZES.padding) *2)
                    }}
                >
                    <Image 
                        source={icons.map}
                        style={{
                            height : 64,
                            width : 64,
                            marginBottom : SIZES.padding
                        }}
                    />
                    <Text
                        style={{
                            ...FONTS.h1,
                            fontWeight :"bold"
                        }}
                    >
                        Signup
                    </Text>
                    <TextInput
                    style={{...styles.input, width : "100%"}}
                    onChangeText={setEmail}
                    value={email}
                    placeholder="First Name"
                    
                />
                <TextInput
                    style={{...styles.input, width : "100%"}}
                    onChangeText={setEmail}
                    value={email}
                    placeholder="Last Name"
                    
                />
                <TextInput
                    style={{...styles.input, width : "100%"}}
                    onChangeText={setEmail}
                    value={email}
                    placeholder="Phone Number"
                    
                />
                <TextInput
                     style={{...styles.input, width : "100%"}}
                    onChangeText={setPassword}
                    value={password}
                    secureTextEntry={true}
                    placeholder="password"
                />
                <View
                style={{
                    
                    width : "100%"
                }}
            >
                <LargeButton 
                    onPress={()=>{
                        postLoginRequest(email,password)
                    }}
                    label={"Create Account"}
                />
            </View>
                
                </View>
                
        </View>
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
    input: {
        height: 40,
        margin: SIZES.padding/2,
        borderBottomWidth: 1,
        borderColor : COLORS.gray,
        textAlign : "center"
      },
})



function mapStateToProps(state:any) {
    console.log({state})
    const { userAuth } = state;
    return { ...userAuth }
}
export default connect(mapStateToProps, { postLoginRequest })(SignupScreen);
  
  
 