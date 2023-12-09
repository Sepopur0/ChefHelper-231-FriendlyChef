import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {colorPalette} from '../utils/systemDesign';
export default function CommonTextInput({
    width='98%',
    style = null,
    containerStyle=null,
    textStyle=null,
    primarycolor=colorPalette.color10,
    type = "default", // "default","password","cancelable"
    placeholder,
    iconSize=24,
    value,
    onChangeText,
    ...props
}) {
    const [hideState, setHideState] = useState(false);
    const hide = () => {
        return hideState?(
            <TouchableOpacity onPress={()=>setHideState(!hideState)}>
                <MaterialCommunityIcons name="eye-outline" size={iconSize} color={primarycolor} />
            </TouchableOpacity>
        )
        :(
            <TouchableOpacity onPress={()=>setHideState(!hideState)}>
                <MaterialCommunityIcons name="eye-off-outline" size={iconSize} color={primarycolor} />
            </TouchableOpacity>
        );
    }
    const cancel = () => {
        return (
            <TouchableOpacity onPress={()=>{onChangeText("")}}>
                <MaterialCommunityIcons name="close-circle-outline" size={iconSize} color={primarycolor} />
            </TouchableOpacity>
        );
    }

    return (
        <View style={[(containerStyle == null) ? defaultStyle.container : containerStyle, {width:width}]}>
            <View style={(style == null) ? defaultStyle.input : style}>
                <TextInput
                    style={(textStyle == null) ? defaultStyle.textinput : textStyle}
                    placeholder={placeholder}
                    secureTextEntry={hideState}
                    color={primarycolor}
                    value={value}
                    onChangeText={onChangeText}
                    {...props}
                />
                {type === "hide" ? hide() : (type === "cancelable" ? cancel() : null)}
            </View>
        </View>
    )
}
const defaultStyle = StyleSheet.create({
    container:{
        overflow: 'hidden',
        alignItems:'center',
        justifyContent:'center',
        paddingBottom:8,
        paddingHorizontal:2,
        borderRadius:20,
    },
    input: {
        backgroundColor: colorPalette.color4,
        height:60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        paddingHorizontal: 10,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        width:'100%',
    },
    textinput: {
        width: '90%',
        fontSize:18,
    }
})