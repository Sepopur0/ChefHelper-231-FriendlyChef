import React, { useState } from "react";
import { View, SafeAreaView, StatusBar, Text } from "react-native";
import { HomeStyle } from "../style/home-style";
import useCategories from "../services/recipe/fetch-all-category";
import useRecipes from "../services/recipe/get-recipe-list";

import CommonTopBarNavigator from "../components/top-bar-navigator";
import RecipeCard from "../components/recipe-card";

export default function HomePage() {
  const [pageName, setPageName] = useState('Home');
  const { data: categoryData, error: categoryError, isLoading: categoryIsLoading } = useCategories();
  const { data: popularRecipes, error: popularRecipeError, isLoading: popularRecipeIsLoading } = useRecipes(null, 8);

  if (categoryIsLoading || popularRecipeIsLoading) {
    // Render a loading spinner or some indication that data is loading
    return (
      <SafeAreaView style={HomeStyle.container}>
        <StatusBar style={HomeStyle.statusBar}/>
        <Text style={HomeStyle.categoryText}>Loading...</Text>
      </SafeAreaView>
    );
  }
  
  const categories = categoryData.data;
  console.log('categories', categories);
  console.log('popularRecipes:', popularRecipes);
  console.log(popularRecipes.data, popularRecipes.data?.length > 0);
  
  return (
    <SafeAreaView style={HomeStyle.container}>
      <StatusBar style={HomeStyle.statusBar}/>
      <CommonTopBarNavigator pageName={pageName}/>
      
      {/* Render content when popular recipes are available */}
      {popularRecipes.data && popularRecipes.data?.length > 0 && (
        <View style={HomeStyle.recipeByCategoryContainer}>
          <Text style={HomeStyle.categoryText}>Popular</Text>
          <RecipeCard recipe={popularRecipes.data[0]}/>
        </View>
      )}
  
      {/* Uncomment the following code for rendering categories */}
      {/* {Array.isArray(categories) && categories.map((category) => (
        <View key={category.id}>
          <Text style={HomeStyle.text}>{category.name}</Text>
          {/* Note: You may want to handle loading and errors for each category separately */}
          {/* {category.id && <RecipeCard recpie={useRecipes(null, category.id).data[0]}/>}
        </View>
      ))} */}
    </SafeAreaView>
  );
}
