import React, { useState } from "react";
import { View, Text, StyleSheet, Image, ImageBackground } from "react-native";
import CommonButton from "../components/button";
import CommonTextInput from "../components/textInput";
import { colorPalette } from "../utils/systemDesign";
import { useNavigation } from "@react-navigation/native";
import { welcomeStyle } from "../style/welcomeStyle";
// import { LoginRegisterBackGround } from "../components/linearGradients";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useLogin from "../services/auth/login";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function LoginPage() {
    const navigation = useNavigation();

    //get input from text
    const [email,changeEmail]=useState('');
    const [password,changePassword]=useState('');
    //data for calling login api
    const [emailInput,setEmailInput]=useState('');
    const [passwordInput,setPasswordInput]=useState('');
    //display input error
    const [error,changeError]=useState('');
    const { isLoading, isError, data: loginData, error: loginError } = useLogin(emailInput, passwordInput);
    
    const loginWithGoogle = () => {

    }
    const login = async () => {
        changeError('');
    
        // Validate email and password
        if (email.trim() === '') {
            changeError('Email field is left empty');
        } else if (password.trim() === '') {
            changeError('Password field is left empty');
        }else{
            try{
                setEmailInput(email);
                setPasswordInput(password);

                if(isError){
                    changeError('Invalid email or password');
                }
                else if (!isError && !isLoading) {
                    const accessToken = loginData?.data?.accessToken;
        
                    if (accessToken) {
                        await AsyncStorage.setItem('accessToken', accessToken);
                        navigation.navigate('Home');
                    }
                }
            } catch (error) {
                changeError('An unexpected error occurred');
            }
        }
    };
    
    
    const toRegister = () => {
        navigation.navigate('Register')
    }
    const recovery = () => {

    }
    const back=()=>{
        navigation.goBack()
    }
    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={require('../../assets/Onboarding.png')} resizeMode="stretch" style={welcomeStyle.bgimg}>
                <View style={welcomeStyle.common}>
                    <View style={{width:'100%'}}>
                        <CommonButton width="20%" containerStyle={{}} style={{flexDirection:'row'}} action={back}>
                        <MaterialCommunityIcons name="chevron-left" size={24} color={colorPalette.color12} />
                        <Text style={{color:colorPalette.color12, fontSize:18}}>Back</Text>
                        </CommonButton>
                    </View>
                    <Text style={welcomeStyle.titletext}>Sign In</Text>
                    <Text style={[welcomeStyle.smalltext, {color: 'red'}]}>{error}</Text>
                    <Text style={welcomeStyle.smallText}>Enter your email</Text>
                    <CommonTextInput placeholder={"Your email"} type="cancelable" value={email} onChangeText={(e)=>{changeEmail(e)}}/>

                    <Text style={welcomeStyle.smallText}>Enter your password</Text>
                    <CommonTextInput placeholder={"Your password"} type="hide" value={password} onChangeText={(e)=>{changePassword(e)}}/>

                    <CommonButton style={{}} containerStyle={welcomeStyle.recoveryContainer} width="100%" action={recovery}>
                        <Text style={[welcomeStyle.smallText, { color: colorPalette.color6, width: '100%' }]}>Recover password?</Text>
                    </CommonButton>

                    <CommonButton style={welcomeStyle.submit} containerStyle={welcomeStyle.submmitContainer} action={login}>
                        <Text style={[welcomeStyle.text, { color: colorPalette.color4 }]}>Sign In</Text>
                    </CommonButton>

                    <View style={{ flexDirection: 'row', alignItems: 'center', margin: '5%', width: '100%' }}>
                        <View style={{ flex: 1, height: 1, backgroundColor: colorPalette.color6 }} />
                        <View>
                            <Text style={{ width: 40, textAlign: 'center', color: colorPalette.color6 }}>Or</Text>
                        </View>
                        <View style={{ flex: 1, height: 1, backgroundColor: colorPalette.color6 }} />
                    </View>

                    <CommonButton style={welcomeStyle.button} action={loginWithGoogle}>
                        <Image source={require('../../assets/google.png')} style={{ width: 28, height: 28 }} />
                        <Text style={{ color: colorPalette.color10, paddingLeft: 8 }}>Continue with Google</Text>
                    </CommonButton>

                    <Text style={[welcomeStyle.text, { color: colorPalette.color12 }]}>Don't have an account?</Text>
                    <CommonButton style={{}} containerStyle={{}} width="40%" action={toRegister}>
                        <Text style={[welcomeStyle.text, { color: '#4461F2' }]}>Register here!</Text>
                    </CommonButton>
                </View>
            </ImageBackground>
        </View>
    )
}