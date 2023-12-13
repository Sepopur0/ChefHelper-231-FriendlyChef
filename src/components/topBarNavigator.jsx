import * as React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import TopBarNavigationStyle from '../style/topBarNavigationBar';
import { useNavigation } from "@react-navigation/native";

function CommonTopBarNavigator({ pageName }) {
  const navigation = useNavigation();
  const toHelp = () => {
    //Navigate to help page
    navigation.navigate('Login')
  }
  const toSetting = () => {
    //Navigate to setting page
    navigation.navigate('Login')
  }
  return (
    <View style={TopBarNavigationStyle.container}>
      <TouchableOpacity onPress={toHelp}>
        <View style={TopBarNavigationStyle.image1}>
          <Image
            source={require('../../assets/help-icon.png')}
            style={TopBarNavigationStyle.image}
          />
        </View>
      </TouchableOpacity>
      <Text style={TopBarNavigationStyle.text}>{pageName}</Text>
      <TouchableOpacity onPress={toSetting}>
        <View style={TopBarNavigationStyle.image2}>
          <Image
            source={require('../../assets/setting-icon.png')}
            style={TopBarNavigationStyle.image}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default CommonTopBarNavigator;
