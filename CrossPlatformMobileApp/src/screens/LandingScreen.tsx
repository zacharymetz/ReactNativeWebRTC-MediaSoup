import React from 'react';
import { useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
    TouchableOpacity,
    Image,
    Platform
} from 'react-native';
import { connect } from 'react-redux';
import { COLORS, SIZES, FONTS, icons } from '../constants';
import { initAppConnection,postTokenValidatorRequest } from '../redux/actions';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { LargeButton } from '../components/Buttons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../app/App';
import { FC } from 'react';
/*
The screen will ping the server to see if there is a connection 
then check the authentication statuts and verify it with the server 
*/
type LandingScreenProps = {
    navigation:StackNavigationProp<RootStackParamList>;
    route:RouteProp<RootStackParamList,'LandingScreen'>;
    loading:Boolean;
    healthCheckPassed:Boolean;
    initAppConnection:Function;
    authLoading:Boolean;
    loggedIn:Boolean;
}
  
const LandingScreen:FC<LandingScreenProps> = ({ loading, initAppConnection ,healthCheckPassed,authLoading,loggedIn, navigation}) => {
    // use this once to get the heathcheck and mak sure we check the stored auth as well
    useEffect(()=>{initAppConnection(true)},[]); 
    useEffect( ()=>{
        (async ()=>{
        })()
        
    },[]);
    if(loading || authLoading){
        console.log({loading,authLoading})
        return <View style={{ justifyContent : "center", alignItems : "center", height : "100%", width : "100%"}} >
        <ActivityIndicator size="large" />
    </View>
    }else{
        // now the loading is done check to see if we are connect to the server,

        if(healthCheckPassed){
            if(loggedIn){
                // naviagte to the home page 
                navigation.navigate("Home")
            }
        }else{
            return  <View style={{ justifyContent : "center", alignItems : "center", height : "100%", width : "100%"}} >
                <Text>Cannont Reach the server :(</Text>
            </View>
        }
    }
     
    return (
        <View style={{ justifyContent : "center", alignItems : "center", height : "100%", width : "100%"}} >
            {loading ? 
            <ActivityIndicator  size="large" />
            : 
            <Hello />
            // <>
            // <TouchableOpacity
            //     onPress={async () =>{ 
            //         const value = await AsyncStorage.getItem('client_auth_token')
            //         console.log({value});
            //         navigation.navigate("LoginScreen")
            //     }}
            // ><Text>Login</Text></TouchableOpacity>
            // <TouchableOpacity
            //     onPress={console.log}
            // ><Text>Signup</Text></TouchableOpacity>
            // </>
            }
        </View>
    )
}



function Hello(){

    const navigation = useNavigation()

    return <View
    style={{ justifyContent : "center", alignItems : "center", height : "100%", width : "100%"}}
    >
        <View
            style={{
                paddingTop : Platform.OS  == 'ios' ?  SIZES.padding * 2 :  SIZES.padding 
            }}
        >
            <Image 
                source={icons.map}
                style={{
                    height : 64,
                    width : 64
                }}
            />
        </View>
        <View 
            style={{
                flexGrow : 1
            }}
        />
        <Text style={{
            ...FONTS.h1,
            fontWeight : "700",
            padding : SIZES.padding
            }} >See Whats Happening in the world right now.</Text>
            <View
                style={{
                    
                    width : "100%"
                }}
            >
                <LargeButton 
                    onPress={()=>{
                        navigation.navigate('SignupScreen')
                    }}
                    label={"Create Account"}
                />
            </View>
            
            <View
                style={{
                    justifyContent : "flex-end",
                    alignItems : "flex-start",
                    flexGrow : 1,
                    paddingBottom : SIZES.padding * 3,
                    paddingLeft : SIZES.padding * 2,
                    width : "100%"
                }}
            >
                <View
                    style={{
                        flexDirection : "row"
                    }}
                >
                    <Text 
                        style={{
                            textAlign : "left",
                            marginRight : 4,
                            color : COLORS.gray
                        }}
                    >Have an account already? 
                    </Text>
                    <TouchableOpacity
                    onPress={()=> navigation.navigate("LoginScreen")}
                       
                    >
                        <Text
                            style={{
                                color : "blue"
                            }}
                        >
                        Log in
                        </Text>
                    </TouchableOpacity>
                </View>
               
            </View>
    </View>
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



function mapStateToProps(state:any) {
    console.log({state})
    const { healthCheck, userAuth } = state;
    return { ...healthCheck, loggedIn : userAuth.loggedIn, authLoading : userAuth.loading }
}
export default connect(mapStateToProps, { initAppConnection,postTokenValidatorRequest })(LandingScreen);
  
  
 