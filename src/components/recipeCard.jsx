import useCategory from '../services/recipe/getCategoryById';
import { RecipeCardStyle } from '../style/recipeCardStyle';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";

const RecipeCard = ({ recipe }) => {
  const {data: category, error: categoryError, isLoading: categoryIsLoading} = useCategory(recipe.category[0]);

  const navigation = useNavigation();

  // const onPressRecipe = () => {
  //   navigation.navigate('RecipeDetail', { id: recipe.id });
  // };

  return(
      <View style={RecipeCardStyle.container}>
        <TouchableOpacity onPress={() => navigation.navigate('RecipeDetail', { id: recipe.id })}> 
        {/* Test API, done test ---> add recipe.id */}
          <Image
            style={RecipeCardStyle.image}
            source={{uri:recipe.images[0]}}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('RecipeDetail', { id: recipe.id })}>
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
      </View>
  )
}
export default RecipeCard;