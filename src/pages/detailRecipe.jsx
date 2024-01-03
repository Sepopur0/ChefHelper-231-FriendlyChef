import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  StatusBar,
  Text,
  Image,
  ScrollView,
  Animated,
} from "react-native";
import { RecipeDetailStyle } from "../style/detailRecipeStyle.js";
import RecipeGuide from "../components/recipe-guide.jsx";
import BackTopBarNavigator from "../components/backTopBarNavigator.jsx";
import useRecipeById from "../services/recipe/getRecipeById.js";

import Swiper from "react-native-swiper";

const RecipeDetail = ({ route }) => {
  const id = route?.params?.recipeId;
  const { data: recipe, error, isLoading } = useRecipeById(id);

  if (isLoading) {
    return (
      <SafeAreaView style={RecipeDetailStyle.container}>
        <StatusBar style={RecipeDetailStyle.statusBar} />
        <Text style={RecipeDetailStyle.categoryText}>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={RecipeDetailStyle.container}>
        <StatusBar style={RecipeDetailStyle.statusBar} />
        <Text style={RecipeDetailStyle.categoryText}>
          Error loading data: {error.message}
        </Text>
      </SafeAreaView>
    );
  }

  if (!recipe) {
    return (
      <SafeAreaView style={RecipeDetailStyle.container}>
        <StatusBar style={RecipeDetailStyle.statusBar} />
        <Text style={RecipeDetailStyle.categoryText}>
          No recipe data available.
        </Text>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={RecipeDetailStyle.container}>
      <ScrollView style={RecipeDetailStyle.contentContainer}>
        <StatusBar style={RecipeDetailStyle.statusBar} />
        <BackTopBarNavigator pageName={recipe.name} />

        <View style={RecipeDetailStyle.recipeByCategoryContainer}>
          <Text style={RecipeDetailStyle.categoryText}>
            {recipe.description}
          </Text>
          <Text style={RecipeDetailStyle.timeText}> {recipe.time} minutes</Text>
          <Text style={RecipeDetailStyle.calorieText}>
            {recipe.calorie} calories
          </Text>
          <Swiper
            style={RecipeDetailStyle.imageContainer}
            showsButtons={false}
            autoplay={true}
            dotStyle={RecipeDetailStyle.dotStyle}
            activeDotStyle={RecipeDetailStyle.activeDotStyle}
          >
            {recipe.images.map((image, index) => {
              const imageElement = (
                <Image
                  style={RecipeDetailStyle.image}
                  source={{ uri: image }}
                />
              );
              return (
                <View style={{ flex: 1 }} key={index}>
                  {/* <Text style={RecipeDetailStyle.timeText}>{index}</Text> */}
                  {imageElement}
                </View>
              );
            })}
          </Swiper>
          <RecipeGuide guide={recipe.guide} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RecipeDetail;
