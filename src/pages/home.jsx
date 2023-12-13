import React, { useEffect, useState } from "react";
import { View, SafeAreaView, StatusBar, Text } from "react-native";
import { HomeStyle } from "../style/homeStyle";
import useCategories from "../services/recipe/fetchAllRecipes";
import useRecipes from "../services/recipe/getRecipeList";

import CommonTopBarNavigator from "../components/topBarNavigator";
import RecipeCard from "../components/recipeCard";
import HomeSearchBar from "../components/searchBar"

export default function HomePage() {
  const [pageName, setPageName] = useState('Home');
  const [searchPhrase, setSearchPhrase] = useState("");

  const handleSearchPhraseChange = (text) => {
    console.log("Search phrase changed:", text);
    setSearchPhrase(text);
  };

  const handleSearchButtonClick = () => {
    //Call api using searchPhrase
    console.log("Search button clicked")
  }
  
  //Hard code until i find out how to fix bug
  const categoryData = [
    {
      "id": 1,
      "createdAt": "2023-11-30T01:00:38.093Z",
      "updatedAt": "2023-11-30T01:00:38.093Z",
      "name": "Healthy"
    },
    {
      "id": 2,
      "createdAt": "2023-11-30T01:00:38.093Z",
      "updatedAt": "2023-11-30T01:00:38.093Z",
      "name": "Fastfood"
    },
    {
      "id": 3,
      "createdAt": "2023-11-30T01:00:38.093Z",
      "updatedAt": "2023-11-30T01:00:38.093Z",
      "name": "Vegeterian"
    },
    {
      "id": 4,
      "createdAt": "2023-11-30T01:00:38.093Z",
      "updatedAt": "2023-11-30T01:00:38.093Z",
      "name": "Dessert"
    },
    {
      "id": 5,
      "createdAt": "2023-11-30T01:00:38.093Z",
      "updatedAt": "2023-11-30T01:00:38.093Z",
      "name": "Side-dish"
    },
    {
      "id": 6,
      "createdAt": "2023-11-30T01:00:38.093Z",
      "updatedAt": "2023-11-30T01:00:38.093Z",
      "name": "Baked-goods"
    },
    {
      "id": 7,
      "createdAt": "2023-11-30T01:03:32.729Z",
      "updatedAt": "2023-11-30T01:03:32.729Z",
      "name": "Soup"
    },
    {
      "id": 8,
      "createdAt": "2023-11-30T01:03:46.032Z",
      "updatedAt": "2023-11-30T01:03:46.032Z",
      "name": "Main-course"
    }
  ]
  // const { data: categoryData, error: categoryError, isLoading: categoryIsLoading } = useCategories();
  const { data: popularRecipes, error: popularRecipeError, isLoading: popularRecipeIsLoading } = useRecipes(null, 8);

  const recipeByCategory = categoryData.map((category) => {
    const { data: recipes, error: recipeError, isLoading: recipeIsLoading } = useRecipes(null, category.id);
    return {
      category,
      recipes,
      recipeError,
      recipeIsLoading,
    };
  })
  
  const recipeByCategoryIsLoading = recipeByCategory.some(item => item.recipeIsLoading);

  if (popularRecipeIsLoading || recipeByCategoryIsLoading) {
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
      <CommonTopBarNavigator pageName={pageName}/>
      <HomeSearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={handleSearchPhraseChange}
        searchButtonClick={handleSearchButtonClick}
      />

      {popularRecipes.data && popularRecipes.data?.length > 0 && (
        <View style={HomeStyle.recipeByCategoryContainer}>
          <Text style={HomeStyle.categoryText}>Popular</Text>
          <RecipeCard recipe={popularRecipes.data[0]}/>
        </View>
      )}

      {Array.isArray(recipeByCategory) && recipeByCategory.map(({ category, recipeIsLoading, recipes }) => (
        !recipeIsLoading && recipes.data.length !== 0 && (
          <View key={category.id} style={HomeStyle.recipeByCategoryContainer}>
            <Text style={HomeStyle.categoryText}>{category.name}</Text>
            {category.id && <RecipeCard recipe={recipes.data[0]}/>}
          </View>
        )
      ))}
    </SafeAreaView>
  );
}