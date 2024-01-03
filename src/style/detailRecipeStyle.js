import { StyleSheet, StatusBar } from "react-native";
import { colorPalette } from "../utils/systemDesign";
import { Dimensions } from "react-native";

export const RecipeDetailStyle = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colorPalette.color13,
  },
  recipeByCategoryContainer: {
    width: '100%',
    height: 'auto',
    backgroundColor: colorPalette.color13,
  },
  statusBar: {
    animated: true,
    backgroundColor: colorPalette.color13,
    barStyle: 'light-content',
    showHideTransition: 'slide',
  },
  contentContainer: {
    width: "100%",
    paddingTop: 8,
    marginHorizontal: 36,
  },
  bgimg: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  categoryText: {
    marginVertical: 10,
    fontSize: 14,
    fontWeight: "600",
    textAlign: 'center',
    color: colorPalette.color4,
  },
  timeText: {
    marginVertical: 10,
    color: "#FBBC05",
    fontWeight: 'bold',
    textAlign: "right",
  },
  image: {
    width: '100%',
    borderRadius: 20,
    height: 200,
    resizeMode: 'cover',
  },
  swiperImage: {
    width: '100%',
    borderRadius: 20,
    height: 200,
    // backgroundColor: "red",
  },
  imageContainer: {
    width: '100%',
    borderRadius: 20,
    height: 200,
  },
  activeDotStyle: {
    backgroundColor: colorPalette.color4,
    marginBottom: -30,
    width: 40,
    height: 6,
  },
  dotStyle: {
    backgroundColor: colorPalette.color4,
    width: 6,
    height: 6,
    borderRadius: 4,
    marginBottom: -30,
  }
});
