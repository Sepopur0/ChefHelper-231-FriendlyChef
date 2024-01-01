import { StyleSheet, StatusBar } from "react-native";
import { colorPalette } from "../utils/systemDesign";

export const RecipeGuideStyle = StyleSheet.create({
  container: {
    padding: 10,
    // maxHeight: "100%"
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
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    borderRadius: 20,
    height: 200,
    resizeMode: 'stretch',
  },
  stepText: {
    color: colorPalette.color4,
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 5,
  },
  leftBorder: {
    width: 1,
    // height: 230,
    flex: 1,
    borderRadius: 1,
    borderWidth: 1,
    borderColor: colorPalette.color4,
    borderStyle: "dashed",
    marginTop: -15
  },
  stepContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 10,
  },
  content: {
    flex: 1,
    marginLeft: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colorPalette.color4,
    marginTop: 5,
    marginLeft: -4
  },
});
