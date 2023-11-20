import React, { useState } from "react";
import { View, Text, StyleSheet, Image, ImageBackground, ScrollView } from "react-native";
import CommonButton from "../components/button";
import { colorPalette } from "../utils/systemDesign";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { welcomeStyle } from "../style/welcomeStyle";
export default function Welcome() {
    const navigation = useNavigation();
    const toLogin = () => {
        navigation.navigate('Login')
    }
    const toRegister = () => {
        navigation.navigate('Register')
    }
    const toHome = () => {

    }
    return (

        <ImageBackground source={require('../../assets/Welcome.png')} resizeMode="stretch" style={welcomeStyle.bgimg}>
            <View style={{ flex: 1, flexDirection: 'column-reverse', alignItems: 'center' }}>
                <View style={{ width: '100%',marginBottom:'35%',alignItems:'center' }}>
                    <CommonButton width="30%" containerStyle={{}} style={{ flexDirection: 'row',justifyContent:'center',alignItems:'center'}} action={toHome}>
                        <Text style={{ color: colorPalette.color4, fontSize: 18 }}>Skip</Text>
                        <MaterialCommunityIcons name="chevron-double-right" size={24} color={colorPalette.color4} />
                    </CommonButton>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: '10%' }}>
                    <CommonButton style={welcomeStyle.navigate} containerStyle={welcomeStyle.navigateContainer} width="30%" action={toLogin}>
                        <Text style={[welcomeStyle.text, { color: colorPalette.color4 }]}>Sign In</Text>
                    </CommonButton>
                    <CommonButton style={[welcomeStyle.navigate, { backgroundColor: colorPalette.color4, }]} containerStyle={welcomeStyle.navigateContainer} width="30%" action={toRegister}>
                        <Text style={[welcomeStyle.text, { color: colorPalette.color11 }]}>Register</Text>
                    </CommonButton>
                </View>
            </View>
        </ImageBackground>

    )
}

