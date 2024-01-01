import BackTopBarNavigator from "../components/backTopBarNavigator";
import { SettingStyle } from "../style/settingStyle";
import { View, SafeAreaView, StatusBar, Text, Image, Button, TouchableOpacity } from "react-native";
import { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import useProfile from "../services/auth/profile";
import { colorPalette } from "../utils/systemDesign";

export default SettingPage = () => {
  const navigation = useNavigation();
  const [isLogin, setIsLogin] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [avatar, setAvatar] = useState('https://s.net.vn/wU5m');
  const [name, setName] = useState('Not login yet');

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        if (token != null) {
          setIsLogin(true);
          setAccessToken(token);
        }
      } catch (error) {
        console.error('Error fetching access token:', error);
      }
    };
  
    fetchAccessToken();
  }, []); // Empty dependency array means this effect runs once after the initial render
  
  const { data: profileData, isError, isLoading, error: profileError } = useProfile(accessToken);
  
  useEffect(() => {
    if (isLogin && profileData?.data) {
      setAvatar(profileData.data.avatar ?? '');
      if (profileData.data.fullName) {
        setName(profileData.data.fullName);
      } else {
        setName(profileData.data.userName || 'Not login yet');
      }
    }
  }, [isLogin, profileData]);
  
  const toHelp = () => {
    //Navigate to help page
  }

  const toAboutUs = () => {
    //Navigate to about us
  }

  const toAuthPage = async () => {
    if(isLogin){
      await AsyncStorage.removeItem('accessToken')
    }
    navigation.navigate('Login')
  }

  return (
    <SafeAreaView style={SettingStyle.container}>
      <StatusBar style={SettingStyle.statusBar} />
      <BackTopBarNavigator pageName={"Setting"} />
      <SafeAreaView style={SettingStyle.subContainer}>
        <SafeAreaView style={SettingStyle.subTitleContainer}>
          <Text style={SettingStyle.subTitle}>Account</Text>
        </SafeAreaView>
        <SafeAreaView style={SettingStyle.rowContainer}>
          <SafeAreaView style={SettingStyle.leftRowContainer}>
          <Image
            source={isLogin?{uri:avatar}:require('./../../assets/default-avatar.jpg')}
            style={SettingStyle.image}
          />
          </SafeAreaView>
          <SafeAreaView style={SettingStyle.rightRowContainer}>
          <Text style={SettingStyle.nameText}>{name}</Text>
          </SafeAreaView>
        </SafeAreaView>
      </SafeAreaView>
      <SafeAreaView style={SettingStyle.subContainer}>
        <SafeAreaView style={SettingStyle.subTitleContainer}>
          <Text style={SettingStyle.subTitle}>General</Text>
        </SafeAreaView>
        <SafeAreaView style={SettingStyle.generalContainer}>
          <TouchableOpacity  style={SettingStyle.rowContainer} onPress={toHelp}>
            <SafeAreaView style={SettingStyle.leftRowContainer}>
              <Image
                source={require('../../assets/help-icon-white.png')}
                style={SettingStyle.icon}
              />
            </SafeAreaView>
            <SafeAreaView style={SettingStyle.rightRowContainer}>
              <Text style={SettingStyle.titleText}>Help</Text>
              <Text style={SettingStyle.normalText}>How to use our app</Text>
            </SafeAreaView>
          </TouchableOpacity>
          <TouchableOpacity style={SettingStyle.rowContainer} onPress={toAboutUs}>
            <SafeAreaView style={SettingStyle.leftRowContainer}>
              <Image
                source={require('../../assets/about-us.png')}
                style={SettingStyle.icon}
              />
            </SafeAreaView>
            <SafeAreaView style={SettingStyle.rightRowContainer}>
              <Text style={SettingStyle.titleText}>About us</Text>
              <Text style={SettingStyle.normalText}>About our team and our mission</Text>
            </SafeAreaView>
          </TouchableOpacity>
        </SafeAreaView>
      </SafeAreaView>
      <TouchableOpacity style={SettingStyle.logOutButton} onPress={toAuthPage}>
        <Text style={SettingStyle.titleText}>{isLogin?'Log Out':'Login'}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
