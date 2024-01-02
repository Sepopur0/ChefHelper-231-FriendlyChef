import React, { useState } from "react";
import { View, Text, ScrollView, Image, ImageBackground } from "react-native";
import CommonButton from "../components/button";
import CommonTextInput from "../components/textInput";
import { colorPalette } from "../utils/systemDesign";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { welcomeStyle } from "../style/welcomeStyle";
import useRegister from '../services/auth/register';
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { LoginRegisterBackGround } from "../components/linearGradients";

export default function RegisterPage() {
    const navigation = useNavigation();
    //get input from text
    const [name, changeName] = useState('');
    const [email, changeEmail] = useState('');
    const [password, changePassword] = useState('');
    const [verifyPassword, changeVerifyPassword] = useState('');

    //data for calling login api
    const [emailInput,setEmailInput]=useState('');
    const [passwordInput,setPasswordInput]=useState('');
    const [userNameInput,setUserNameInput]=useState('');
    //display input error
    const [error, changeError] = useState('');
    const { isLoading, isError, data: registerData, error: registerError } = useRegister(userNameInput, passwordInput, emailInput);

    const registerWithGoogle = () => {

    }
    
    const register = async () => {
        try {
            changeError('');
    
            if (name.trim() === '') {
                changeError('Name field is left empty');
            } else if (email.trim() === '') {
                changeError('Email field is left empty');
            } else if (password.trim() === '') {
                changeError('Password field is left empty');
            } else if (password !== verifyPassword) {
                changeError('Password does not match');
            } else {
                setUserNameInput(name);
                setEmailInput(email);
                setPasswordInput(password);
    
                if (!isLoading) {
                    const accessToken = registerData?.data?.accessToken;
    
                    if (accessToken) {
                        await AsyncStorage.setItem('accessToken', accessToken);
                        navigation.navigate('Home');
                    } else {
                        changeError('Email or username has already been used');
                    }
                }
            }
        } catch (error) {
            console.error('Error during registration:', error);
    
            // Check if the error has a response object
            if (error.response) {
                // Set the error to error.response.data.message
                changeError(error.response.data.message);
            } else {
                changeError('An unexpected error occurred');
            }
        }
    };
    
    const back = () => {
        navigation.goBack()
    }
    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={require('../../assets/Onboarding.png')} resizeMode="stretch" style={welcomeStyle.bgimg}>
                <View style={{ width: '100%',marginTop:'12%' }}>
                    <CommonButton width="20%" containerStyle={{}} style={{ flexDirection: 'row' }} action={back}>
                        <MaterialCommunityIcons name="chevron-left" size={24} color={colorPalette.color12} />
                        <Text style={{ color: colorPalette.color12, fontSize: 18 }}>Back</Text>
                    </CommonButton>
                </View>
                <ScrollView contentContainerStyle={welcomeStyle.common}>
                    <Text style={welcomeStyle.titletext}>Register</Text>
                    <Text style={[welcomeStyle.smalltext, {color: 'red'}]}>{error}</Text>

                    <Text style={welcomeStyle.smallText}>Enter your name</Text>
                    <CommonTextInput placeholder={"Your name"} type="cancelable" value={name} onChangeText={(e) => { changeName(e) }} />

                    <Text style={welcomeStyle.smallText}>Enter your email</Text>
                    <CommonTextInput placeholder={"Your email"} type="cancelable" value={email} onChangeText={(e) => { changeEmail(e) }} />

                    <Text style={welcomeStyle.smallText}>Enter your password</Text>
                    <CommonTextInput placeholder={"Your password"} type="hide" value={password} onChangeText={(e) => { changePassword(e) }} />

                    <Text style={welcomeStyle.smallText}>Verify your password</Text>
                    <CommonTextInput placeholder={"Verify your password"} type="hide" value={verifyPassword} onChangeText={(e) => { changeVerifyPassword(e) }} />

                    <View style={{ height: '3%' }}>

                    </View>

                    <CommonButton style={welcomeStyle.submit} containerStyle={welcomeStyle.submitContainer} action={register}>
                        <Text style={[welcomeStyle.text, { color: colorPalette.color4 }]}>Register</Text>
                    </CommonButton>

                    <View style={{ flexDirection: 'row', alignItems: 'center', margin: '5%', width: '100%' }}>
                        <View style={{ flex: 1, height: 1, backgroundColor: colorPalette.color6 }} />
                        <View>
                            <Text style={{ width: 40, textAlign: 'center', color: colorPalette.color6 }}>Or</Text>
                        </View>
                        <View style={{ flex: 1, height: 1, backgroundColor: colorPalette.color6 }} />
                    </View>

                    <CommonButton style={welcomeStyle.button} action={registerWithGoogle}>
                        <Image source={require('../../assets/google.png')} style={{ width: 28, height: 28 }} />
                        <Text style={{ color: colorPalette.color10, paddingLeft: 8 }}>Continue with Google</Text>
                    </CommonButton>
                </ScrollView>
            </ImageBackground>
        </View>
    )
}
