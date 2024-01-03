import { StyleSheet, StatusBar } from "react-native";
import { colorPalette } from "../utils/systemDesign";
import { Dimensions } from "react-native";
export const ScanStyle = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        flex: 1,
        alignItems: 'center',
        paddingTop: 30,
        paddingHorizontal: 20,
        backgroundColor: colorPalette.color13,
    },
    statusBar: {
      animated: true,
      backgroundColor: colorPalette.color13,
      barStyle: 'light-content',
      showHideTransition: 'slide'
    },
    scanContainer: {
      width: '100%',
      flex: 1,
      alignItems: 'center', 
      justifyContent: 'center',
      paddingHorizontal: 10,
    },
    image: {
      width: '100%',
      aspectRatio: 16 / 9, // Set the aspect ratio based on your image dimensions
      borderRadius: 20,
    },
    rowContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between', // Adjust as needed
      width: '100%',
      height: 'auto',
      marginVertical: 10,
      paddingHorizontal: 0,
    },
    normalText:{
      textAlign: 'justify',
      fontSize: 16,
      fontWeight: '400',
      color: colorPalette.color4,
    },
    buttonText: {
      textAlign: 'center',
      fontSize: 16,
      fontWeight: '700',
      color: '#FBBC05',
    },
    button1: {
      width: '52%',
      height: 40,
      marginLeft: 0,
      backgroundColor: colorPalette.color14,
      borderRadius: 20,
      justifyContent: 'center',
    },
    button2:{
      width: '42%',
      height: 40,
      marginRight: 0,
      backgroundColor: colorPalette.color14,
      borderRadius: 20,
      justifyContent: 'center',
    }
});

export const SelectIngredientStyle = StyleSheet.create({
  scanContainer: {
    width: '100%',
    flex: 1,
    alignItems: 'center', 
    paddingHorizontal: 10,
  },
  bottomSheetContainer: {
    width: '100%',
    height: 'auto',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colorPalette.color4,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Adjust as needed
    flexWrap: 'wrap', // Allow items to wrap to the next row
    width: '100%',
    height: 'auto',
    marginVertical: 10,
    paddingHorizontal: 0,
  },
  ingredientContainer: {
    width: '25%', // Updated to 25% to fit four items in a row
    backgroundColor: '#2B2D2D',
    alignItems: 'center',
    borderRadius: 20,
    marginHorizontal: '1%',
    marginVertical: 5, // Adjust as needed for vertical spacing
  },
  ingredientContainerSelected: {
    width: '25%', // Updated to 25% to fit four items in a row
    backgroundColor: '#4B5052',
    alignItems: 'center',
    borderRadius: 20,
    marginHorizontal: '1%',
    marginVertical: 5, // Adjust as needed for vertical spacing
  },
  image: {
    width: 30,
    height: 30,
  },
  smallText:{
    fontSize: 12,
    fontWeight: '400',
    color: colorPalette.color4,
  }
});