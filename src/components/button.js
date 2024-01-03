import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import {colorPalette} from '../utils/systemDesign';
export default function CommonButton({
	width='98%',
    action=null,
    style=null,
	containerStyle=null,
    ...props
}) {
	return (
		<View style={[containerStyle==null?defaultStyle.container:containerStyle, {width:width}]}>
			<TouchableOpacity onPress={action} style={style==null?defaultStyle.button:style} {...props}>
				{props.children}
			</TouchableOpacity>
		</View>
	)
}

const defaultStyle = StyleSheet.create({
	container:{
		overflow: 'hidden',
        paddingBottom: 8,
        paddingHorizontal: 2,
		marginHorizontal:'5%',
        borderRadius: 10,
	},
    button: {
		flexDirection:'row',
		backgroundColor: colorPalette.color4,
        height:60,
        alignItems: 'center',
        justifyContent: 'center',
		paddingHorizontal: 10,
        borderRadius: 10,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
		width:'100%'
	}
})