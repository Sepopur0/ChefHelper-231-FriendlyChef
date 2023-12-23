import * as React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import TopBarNavigationStyle from '../style/topBarNavigationBar';
import { useNavigation } from "@react-navigation/native";

function BackTopBarNavigator({ pageName }) {
  const navigation = useNavigation();
  const back = () => {
    navigation.goBack()
  }
  return (
    <View style={TopBarNavigationStyle.container}>
      <TouchableOpacity onPress={back}>
        <View style={TopBarNavigationStyle.image1}>
          <Image
            source={require('../../assets/left-arrow.png')}
            style={TopBarNavigationStyle.image}
          />
        </View>
      </TouchableOpacity>
      <Text style={TopBarNavigationStyle.text}>{pageName}</Text>
    </View>
  );
}

export default BackTopBarNavigator;
