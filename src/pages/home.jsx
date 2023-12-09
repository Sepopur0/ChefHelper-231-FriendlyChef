import React, { useState, useEffect } from "react";
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
    return (
      <SafeAreaView style={HomeStyle.container}>
        <StatusBar style={HomeStyle.statusBar}/>
        <Text style={HomeStyle.categoryText}>Loading...</Text>
      </SafeAreaView>
    );
  }
  
  // const categoryRecipeData = categoryData.data.map((category) => {
  //   const { data: recipes, error: recipeError, isLoading: recipeIsLoading } = useRecipes(null, category.id);
  //   return {
  //     category,
  //     recipes,
  //     recipeError,
  //     recipeIsLoading,
  //   };
  // })

  return (
    <SafeAreaView style={HomeStyle.container}>
      <StatusBar style={HomeStyle.statusBar}/>
      <CommonTopBarNavigator pageName={pageName}/>

      {popularRecipes.data && popularRecipes.data?.length > 0 && (
        <View style={HomeStyle.recipeByCategoryContainer}>
          <Text style={HomeStyle.categoryText}>Popular</Text>
          <RecipeCard recipe={popularRecipes.data[0]}/>
        </View>
      )}

      {/* {Array.isArray(categoryRecipeData) && categoryRecipeData.map(({ category, recipeIsLoading, recipes }) => (
        !recipeIsLoading && recipes.data.length !== 0 && (
          <View key={category.id} style={HomeStyle.recipeByCategoryContainer}>
            <Text style={HomeStyle.categoryText}>{category.name}</Text>
            {category.id && <RecipeCard recipe={recipes.data[0]}/>}
          </View>
        )
      ))} */}
    </SafeAreaView>
  );
}