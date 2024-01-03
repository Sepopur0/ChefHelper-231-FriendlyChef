import useCategory from '../services/recipe/getCategoryById';
import { RecipeCardStyle } from '../style/recipeCardStyle';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";

const RecipeCard = ({ recipe }) => {
  const {data: category, error: categoryError, isLoading: categoryIsLoading} = useCategory(recipe.category[0]);

  const navigation = useNavigation();
  
  const toRecipeDetail = () => {
    navigation.navigate('RecipeDetail', {recipeId: recipe.id})
  }

  // const onPressRecipe = () => {
  //   navigation.navigate('RecipeDetail', { id: recipe.id });
  // };

  return(
    <TouchableOpacity style={RecipeCardStyle.container} onPress={toRecipeDetail}>
      <Image
        style={RecipeCardStyle.image}
        source={{uri:recipe.images[0]}}
      />
      <View style={RecipeCardStyle.rowContainer}>
        <View style={RecipeCardStyle.nameAndCategoryContainer}>
          <Text style={RecipeCardStyle.recipeNameText}>{recipe.name}</Text>
          {!categoryIsLoading && <Text style={RecipeCardStyle.smallText}>{category.data.name}</Text>}
        </View>
        <View style={RecipeCardStyle.timeContainer}>
          <Text style={RecipeCardStyle.normalText}>{recipe.time} mins</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
export default RecipeCard;