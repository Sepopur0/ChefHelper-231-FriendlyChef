import React, { useState, useMemo } from 'react';
import { Image, View, SafeAreaView, StatusBar, Text, TouchableOpacity} from 'react-native';
import { ScanStyle, SelectIngredientStyle } from "../style/scanStyle";
import CommonTopBarNavigator from "../components/topBarNavigator";
import useIngredients from '../services/ingredient/fetchAllIngredients';
import SelectIngredient from '../components/selectIngredient';

export default SelectIngredientPage = ({route}) => {
  const image = route?.params?.image;
  const [imageUri, setImageUri] =  useState(image.assets[0].uri);
  const {data, isError, isLoading, error} = useIngredients();

  return (
    <SafeAreaView style={ScanStyle.container}>
      <StatusBar style={ScanStyle.statusBar}/>
      <CommonTopBarNavigator pageName={'Select ingredient'}/>
      <View style={SelectIngredientStyle.scanContainer}>
        <Image 
          source={{ uri: imageUri }} 
          style={ScanStyle.image} 
        />
      </View>
      {!isLoading&&<SelectIngredient ingredients={data.data} selectedIngredients={data.data} />}
    </SafeAreaView>
  );
}
