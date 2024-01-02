
import BackTopBarNavigator from "../components/backTopBarNavigator";
import { HomeStyle } from "../style/homeStyle";
import { View, SafeAreaView, StatusBar, Text, ScrollView } from "react-native";
import useRecipes from "../services/recipe/getRecipeList";
import RecipeCard from "../components/recipeCard";
import HomeSearchBar from "../components/searchBar";
import {useState} from 'react';
export default RecipeByCategoryPage = ({route}) => {
  const categoryId = route?.params?.id;
  const categoryName = route?.params?.name;
  const isCommon = route?.params?.isCommon;
  const [searchText, setSearchText] = useState("");
  const [searchPhrase, setSearchPhrase] = useState(searchText);
  let { data: searchedRecipes, error: searchedRecipeError, isLoading: searchedRecipesIsLoading } = useRecipes(null, categoryId, searchPhrase); 
  let { data: recipes, error: recipeError, isLoading: recipeIsLoading } = useRecipes(null, categoryId);
  if(isCommon){
    ({ data: recipes, error: recipeError, isLoading: recipeIsLoading } = useRecipes(true, undefined));
    ({ data: searchedRecipes, error: searchedRecipeError, isLoading: searchedRecipesIsLoading } = useRecipes(true, undefined, searchPhrase)); 
  }
  const handleSearchTextChange = (text) => {
    setSearchText(text);
  };

  const handleSearchButtonClick = () => {
    //Call api using searchPhrase
    setSearchPhrase(searchText);
  }

  if(searchPhrase != ""){
    if(searchedRecipesIsLoading) {
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
      <HomeSearchBar
        searchPhrase={searchText}
        setSearchPhrase={handleSearchTextChange}
        searchButtonClick={handleSearchButtonClick}
      />
      
      <View>
      {Array.isArray(searchedRecipes.data) && searchedRecipes.data.length == 0 && <Text style={HomeStyle.searchNotFoundText}>
        There is no recipes that match your keyword, try another one
      </Text>}
      </View>
    

      <ScrollView>
        {Array.isArray(searchedRecipes.data) && searchedRecipes.data.length > 0 && searchedRecipes.data.map((recipe) => 
          <View style={HomeStyle.recipeByCategoryContainer}>
            <RecipeCard recipe={recipe} key={recipe.id}/>
          </View>
        )}
      </ScrollView>
      <BottomNavigator buttonIndex={1}/>
    </SafeAreaView>
    )
  }

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
      <HomeSearchBar
        searchPhrase={searchText}
        setSearchPhrase={handleSearchTextChange}
        searchButtonClick={handleSearchButtonClick}
      />

      <ScrollView>
        {Array.isArray(recipes.data) && recipes.data.map((recipe) => 
          <RecipeCard recipe={recipe} key={recipe.id}/>
        )}
      </ScrollView>
      <BottomNavigator buttonIndex={1}/>
    </SafeAreaView>
  );
}