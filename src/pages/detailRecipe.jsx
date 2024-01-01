import React, { useState } from "react";
import { View, SafeAreaView, StatusBar, Text, Image } from "react-native";
import { RecipeDetailStyle } from "../style/detailRecipeStyle.js";
import useCategories from "../services/recipe/fetchAllCategories.js";
import useRecipes from "../services/recipe/getRecipeList.js";
import RecipeGuide from "../components/recipe-guide.jsx";
import BackTopBarNavigator from "../components/backTopBarNavigator.jsx";

export default function DetailRecipe() {
  // const [pageName, setPageName] = useState('detail');
  const { data: categoryData, error: categoryError, isLoading: categoryIsLoading } = useCategories();
  const { data: popularRecipes, error: popularRecipeError, isLoading: popularRecipeIsLoading } = useRecipes(null, 8);

  if (categoryIsLoading || popularRecipeIsLoading) {
    // Render a loading spinner or some indication that data is loading
    return (
      <SafeAreaView style={RecipeDetailStyle.container}>
        <StatusBar style={RecipeDetailStyle.statusBar} />
        <Text style={RecipeDetailStyle.categoryText}>Loading...</Text>
      </SafeAreaView>
    );
  }

  const categories = categoryData.data;
  console.log({ categories });
  console.log('popularRecipes:', popularRecipes);
  console.log(popularRecipes.data, popularRecipes.data?.length > 0);
  console.log("Guide", popularRecipes.data[0].guide)
  return (
    <SafeAreaView style={RecipeDetailStyle.container}>
      <StatusBar style={RecipeDetailStyle.statusBar} />
      <BackTopBarNavigator pageName={popularRecipes?.data[0].name} />

      {/* Render content when popular recipes are available */}
      {popularRecipes.data && popularRecipes.data?.length > 0 && (
        <View style={RecipeDetailStyle.recipeByCategoryContainer}>
          <Text style={RecipeDetailStyle.categoryText}>{popularRecipes?.data[0].description}</Text>
          <Text style={RecipeDetailStyle.timeText}> {popularRecipes?.data[0].time} minutes</Text>
          <Image
            style={RecipeDetailStyle.image}
            source={{ uri: popularRecipes?.data[0].images[0] }}
          />

          <RecipeGuide guide={popularRecipes.data[0].guide} />
        </View>)

      }
    </SafeAreaView>
  );
}
