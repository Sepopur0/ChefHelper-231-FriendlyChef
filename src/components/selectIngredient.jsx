import { useState, useMemo } from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import BottomSheet from '@gorhom/bottom-sheet';
import { SelectIngredientStyle } from "../style/scanStyle";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import { ScrollView } from "react-native-gesture-handler";

export default SelectIngredient = ({ingredients, selectedIngredients}) => {
  const navigation = useNavigation();
  const snapPoints = useMemo(()=>['10%', '25%', '40%', '65%',  '100%'], []);
  const [localIngredients, setLocalIngredients] = useState(ingredients);
  const [localselectedIngredients, setLocalSelectedIngredients] = useState(selectedIngredients);

  const toggleIngredient = (ingredient) => {
    setLocalSelectedIngredients((prevSelectedIngredients) => {
      const updatedSelectedIngredients = [...prevSelectedIngredients];
      const existingIndex = prevSelectedIngredients.findIndex((item) => item.id === ingredient.id);
  
      if (existingIndex !== -1) {
        // If the ingredient exists, remove it from the array
        updatedSelectedIngredients.splice(existingIndex, 1);
      } else {
        // If the ingredient doesn't exist, add it to the array
        updatedSelectedIngredients.push(ingredient);
      }
      return updatedSelectedIngredients;
    });
  };

  const toRecipeByScan = () => {
    navigation.navigate('RecipeByScan', {ingredients: localIngredients, selectedIngredients: localselectedIngredients})
  }
  

  return (
    <BottomSheet 
      snapPoints={snapPoints}
      backgroundStyle={{backgroundColor:'#202729'}}
    >
      <ScrollView style={SelectIngredientStyle.bottomSheetContainer}>
        <View style={SelectIngredientStyle.rowContainer}>
          <Text style={SelectIngredientStyle.title}>Ingredients</Text>
          <Text 
            style={[SelectIngredientStyle.title, {color: '#FBBC05'}]}
            onPress={toRecipeByScan}
          >Cook</Text>
        </View>
        <View style={SelectIngredientStyle.rowContainer}>
        {localIngredients.map((ingredient) => {
          const isSelected = localselectedIngredients.indexOf(ingredient) !== -1;
          return (
          <TouchableOpacity 
            style={isSelected?SelectIngredientStyle.ingredientContainerSelected:SelectIngredientStyle.ingredientContainer}
            onPress={()=>toggleIngredient(ingredient)}
          >
            <Image
              style={SelectIngredientStyle.image}
              source={{uri:ingredient.image}}
            />
            <Text style={SelectIngredientStyle.smallText} key={ingredient.id}>
            {ingredient.name}
            </Text>
          </TouchableOpacity>)
        })}
        </View>
      </ScrollView>
    </BottomSheet>
  )
}