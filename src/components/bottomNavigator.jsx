import {SafeAreaView, TouchableOpacity, Image, View} from 'react-native';
import BottomNavigatorStyle from '../style/bottomNavigatorStyle';
import { useNavigation } from "@react-navigation/native";

export default BottomNavigator = ({buttonIndex}) => {
  const navigation = useNavigation();
  const toHome = () => {
    navigation.navigate('Home')
  }
  const toProfile = () => {
    //
    navigation.navigate('Profile')
  }
  const toScan = () => {
    navigation.navigate('ScanIngredient')
  }
  return(
    <SafeAreaView style={BottomNavigatorStyle.container}>
      <TouchableOpacity style={BottomNavigatorStyle.image1} onPress={toHome}>
        <Image
          style={BottomNavigatorStyle.image}
          source={buttonIndex==1?require('../../assets/yellow-home.png'):require('../../assets/home-button-white.png')}
        />
      </TouchableOpacity>
      <View style={BottomNavigatorStyle.image2}>
        <TouchableOpacity style={BottomNavigatorStyle.image2Container} onPress={toScan}>
          <Image
            style={BottomNavigatorStyle.mediumImage}
            source={require('../../assets/scan-button.png')}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={BottomNavigatorStyle.image3} onPress={toProfile}>
        <Image
          style={BottomNavigatorStyle.image}
          source={buttonIndex==3?require('../../assets/profile-yellow-button.png'):require('../../assets/profile-white-button.png')}
        />
      </TouchableOpacity>
    </SafeAreaView>
  )
}