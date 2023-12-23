
import BackTopBarNavigator from "../components/backTopBarNavigator";
import { HomeStyle } from "../style/homeStyle";
import { View, SafeAreaView, StatusBar, Text, ScrollView } from "react-native";
import useRecipes from "../services/recipe/getRecipeList";
import RecipeCard from "../components/recipeCard";
export default RecipeByCategoryPage = ({route}) => {
  const categoryId = route?.params?.id;
  const categoryName = route?.params?.name;
  const isCommon = route?.params?.isCommon;
  let { data: recipes, error: recipeError, isLoading: recipeIsLoading } = useRecipes(null, categoryId);
  if(isCommon){
    ({ data: recipes, error: recipeError, isLoading: recipeIsLoading } = useRecipes(true, undefined));
  }
  console.log(recipes);
  if(recipeIsLoading){
    return (
      <SafeAreaView style={HomeStyle.container}>
        <StatusBar style={HomeStyle.statusBar}/>
        <Text style={HomeStyle.categoryText}>Loading...</Text>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={HomeStyle.container}>
      <StatusBar style={HomeStyle.statusBar}/>
      <BackTopBarNavigator pageName={categoryName}/>

      <ScrollView>
        {Array.isArray(recipes.data) && recipes.data.map((recipe) => 
          <RecipeCard recipe={recipe} key={recipe.id}/>
        )}
      </ScrollView>
      <BottomNavigator buttonIndex={1}/>
    </SafeAreaView>
  );
}