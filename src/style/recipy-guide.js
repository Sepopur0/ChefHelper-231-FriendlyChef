import { StyleSheet, StatusBar } from "react-native";
import { colorPalette } from "../utils/systemDesign";

export const RecipeGuideStyle = StyleSheet.create({
  container: {
    padding: 20,
    maxHeight: "100%"
  },
  recipeNameText: {
    color: colorPalette.color4,
    fontSize: 18,
    fontWeight: 'bold',
  },
  normalText: {
    color: colorPalette.color4,
    fontSize: 12,
  },
  smallText: {
    color: colorPalette.color4,
    fontSize: 13,
  },
  image: {
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 200,
    resizeMode: 'stretch',
  },
  stepText: {
    color: colorPalette.color4,
    fontSize: 14,
    fontWeight: "bold"
  }
});
