import { Platform } from "react-native";

// Andoid uses the 10.something address for local host fo some reason 
let API_URL_PROTO = 'https://192.168.1.68:3000'
if(Platform.OS == 'android'){
    API_URL_PROTO = 'https://10.0.2.2:3000'
}


export const API_URL = API_URL_PROTO ;

 