import { StyleSheet, StatusBar } from "react-native";
import { colorPalette } from "../utils/systemDesign";
import { Dimensions } from "react-native";
export const ManageAccountStyle = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        flex: 1,
        paddingTop: 30,
        paddingHorizontal: 30,
        backgroundColor: colorPalette.color13,
    },
    statusBar: {
      animated: true,
      backgroundColor: colorPalette.color13,
      barStyle: 'light-content',
      showHideTransition: 'slide'
    },
    imageContainer: {
      width: '100%',
      marginVertical: 20,
      alignItems: 'center',
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    titleText: {
        color: colorPalette.color4,
        fontSize: 14,
        fontWeight: "700",
    },
    normalText: {
        color: colorPalette.color4,
        fontSize: 14,
        fontWeight: "400",
        marginBottom: 10,
    },
    loadingText: {
      color: colorPalette.color4,
      fontWeight: '400',
      fontSize: 20,
      textAlign: 'center',
    },
    textInput: {
      width: '100%',
      height: 60,
      backgroundColor: colorPalette.color13,
      borderRadius: 20,
      borderColor: colorPalette.color4,
      borderWidth: 2,
      color: colorPalette.color4,
      fontSize: 24,
      paddingHorizontal: 20,
      fontWeight: '400',
    },
    button: {
      width: '100%',
      height: 40,
      backgroundColor: '#E47B06',
      borderRadius: 20,
      marginTop: 20,
      justifyContent: 'center'
    }
})