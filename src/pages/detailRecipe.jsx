import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  StatusBar,
  Text,
  Image,
  ScrollView,
} from "react-native";
import { RecipeDetailStyle } from "../style/detailRecipeStyle.js";
import RecipeGuide from "../components/recipe-guide.jsx";
import BackTopBarNavigator from "../components/backTopBarNavigator.jsx";
import useRecipeById from "../services/recipe/getRecipeById.js";
import Swiper from "react-native-swiper";

const RecipeDetail = ({ route }) => {
  const id = route?.params?.recipeId;
  const { data: recipe, error, isLoading } = useRecipeById(id);
  // const [swiperIndex, setSwiperIndex] = useState(0);

  // useEffect(() => {
  //   let swiperInterval;

  //   const prefetchImages = async () => {
  //     try {
  //       await Promise.all(recipe.images.map((image) => Image.prefetch(image)));
  //       setSwiperIndex(0); // Reset swiperIndex after images are prefetched
  //       swiperInterval = setInterval(() => {
  //         setSwiperIndex((prevIndex) => (prevIndex + 1) % recipe.images.length);
  //       }, 3000);
  //     } catch (error) {
  //       console.error("Lỗi tải trước ảnh:", error);
  //     }
  //   };

  //   if (recipe && recipe.images && recipe.images.length > 0) {
  //     prefetchImages();
  //   }

  //   return () => {
  //     clearInterval(swiperInterval);
  //   };
  // }, [recipe]);

  // const onIndexChanged = (index) => {
  //   setSwiperIndex(index);
  // };

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

  if (!recipe || !recipe.images || recipe.images.length === 0) {
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
            dotStyle={RecipeDetailStyle.dotStyle}
            activeDotStyle={RecipeDetailStyle.activeDotStyle}
            // index={swiperIndex}
            // onIndexChanged={onIndexChanged}
            autoplay={true}
          >
            {recipe.images.map((image, index) => {
              const imageElement = (
                <Image
                  style={RecipeDetailStyle.image}
                  source={{ uri: image }}
                />
              );
              return (
                <View style={{ flex: 1, height: 200 }} key={index}>
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
