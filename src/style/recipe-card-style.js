import { StyleSheet, StatusBar } from "react-native";
import { colorPalette } from "../utils/systemDesign";

export const RecipeCardStyle = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colorPalette.color10,
    borderRadius: 20,
    overflow: 'hidden', // This is important to clip the border
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Adjust as needed
    width: '100%', // or another value depending on your layout
    padding: 10,
  },
  nameAndCategoryContainer: {
    width: '70%',
    marginLeft: 0,
  },
  timeContainer: {
    width: '30%',
    marginRight: 0,
    alignItems: 'flex-end',
  },
  recipeNameText: {
    color: colorPalette.color4,
    fontSize: 18,
    fontWeight: 'bold',
  },
  normalText: {
    color: colorPalette.color4,
    fontSize: 16,
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
});
