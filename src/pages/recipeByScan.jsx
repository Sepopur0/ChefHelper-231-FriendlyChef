
import BackTopBarNavigator from "../components/backTopBarNavigator";
import { HomeStyle } from "../style/homeStyle";
import { SafeAreaView, StatusBar, Text, ScrollView } from "react-native";
import useRecipes from "../services/recipe/getRecipeList";
import RecipeCard from "../components/recipeCard";
import useRecipesByIngredientIds from './../services/recipe/fetchRecipesByIngredientIds';

export default RecipeByCategoryPage = ({route}) => {
  const ingredients = route?.params?.ingredients;
  const selectedIngredients = route?.params?.selectedIngredients;
  const selectedIds = selectedIngredients.map((ingredient)=>ingredient.id);
  const { data: recipes, error: recipeError, isLoading: recipeIsLoading } = useRecipesByIngredientIds(selectedIds);

  if(recipeIsLoading){
    return (
      <SafeAreaView style={HomeStyle.container}>
        <StatusBar style={HomeStyle.statusBar}/>
        <BackTopBarNavigator pageName={"Matching Recipes"}/>
        <Text style={[HomeStyle.categoryText,{marginTop:'50%'}]}>Loading...</Text>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={HomeStyle.container}>
      <StatusBar style={HomeStyle.statusBar}/>
      <BackTopBarNavigator pageName={"Matching Recipes"}/>

      <ScrollView>
        {Array.isArray(recipes.data) && recipes.data.map((recipe) => 
          <RecipeCard recipe={recipe} key={recipe.id}/>
        )}
      </ScrollView>
      <SelectIngredient ingredients={ingredients} selectedIngredients={selectedIngredients} />
    </SafeAreaView>
  );
}