import React, {FC} from "react";
import { GestureResponderEvent, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS, FONTS, SIZES } from "../constants";


type LargeButtonProps = {
    label:String,
    onPress:((event: GestureResponderEvent) => void) & (() => void)
}

export const LargeButton:FC<LargeButtonProps> = ({label,onPress}) =>{
    return <TouchableOpacity
    onPress={onPress}
    style={{
        marginTop : SIZES.padding/2,
        width : "100%",
        paddingHorizontal : SIZES.padding * 2
    }}
    
>
    <View 
        style={{
            backgroundColor : COLORS.primary,
            width : "100%",
            justifyContent : "center", alignItems : "center",
            padding : SIZES.padding/2,
            borderRadius : 10000
        }}
    >
        <Text
            style={{
                ...FONTS.h3,
                fontWeight : "700",
                color : COLORS.white
            }}
        >{label}</Text>
    </View>
    
</TouchableOpacity>
}   