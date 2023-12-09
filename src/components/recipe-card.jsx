import useCategory from '../services/recipe/get-category-by-id';
import useCategories from '../services/recipe/fetch-all-category';
import { RecipeCardStyle } from '../style/recipe-card-style';
import { View, Text, Image } from 'react-native';
const RecipeCard = ({recipe}) => {
  const {data: category, error: categoryError, isLoading: categoryIsLoading} = useCategory(recipe.category[0]);
  return(
    <View style={RecipeCardStyle.container}>
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
    </View>
  )
}
export default RecipeCard;