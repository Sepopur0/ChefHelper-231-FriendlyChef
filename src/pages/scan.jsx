import React, { useState, useEffect } from 'react';
import { Button, Image, View, SafeAreaView, StatusBar, Text, TouchableOpacity} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ScanStyle } from "../style/scanStyle";
import CommonTopBarNavigator from "../components/topBarNavigator";
import BottomNavigator from "../components/bottomNavigator";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation

export default ScanPage = () => {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const navigation = useNavigation();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setFile(result);
      setImage(result.assets[0].uri);
    }    
  };

  const toSelectIngredient = () => {
    navigation.navigate("SelectIngredient", { image: file });
  }

  return (
    <SafeAreaView style={ScanStyle.container}>
      <StatusBar style={ScanStyle.statusBar}/>
      <CommonTopBarNavigator pageName={'Scan ingredient'}/>
      {!image &&
      <View style={ScanStyle.scanContainer}>
        <Button title="Pick an image from gallery" onPress={pickImage} />
      </View>}
      {image &&
      <View style={ScanStyle.scanContainer}>
        <View style={ScanStyle.rowContainer}>
          <Text style={ScanStyle.normalText}>Please make sure below are pictures of 
    your cooking ingredients</Text>
        </View>
        <Image 
          source={{ uri: image }} 
          style={ScanStyle.image} 
        />
        <View style={ScanStyle.rowContainer}>
          <TouchableOpacity style={ScanStyle.button1} onPress={pickImage}>
            <Text style={ScanStyle.buttonText}>Use another photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={ScanStyle.button2} onPress={toSelectIngredient}>
            <Text style={ScanStyle.buttonText}>Let's continue</Text>
          </TouchableOpacity>
        </View>
      </View>}
      <BottomNavigator buttonIndex={2}/>
    </SafeAreaView>
  );
}
