import { StyleSheet, StatusBar } from "react-native";
import { colorPalette } from "../utils/systemDesign";
import { Dimensions } from "react-native";
export const HomeStyle = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        flex: 1,
        alignItems: 'center',
        paddingTop: 30,
        paddingHorizontal: 20,
        backgroundColor: colorPalette.color13,
    },
    recipeByCategoryContainer: {
        width: '100%',  // Set width to '100%' to match the parent's width
        height: 'auto',
        alignItems: 'left',
        backgroundColor: colorPalette.color13,
    },
    statusBar: {
      animated: true,
      backgroundColor: colorPalette.color13,
      barStyle: 'light-content',
      showHideTransition: 'slide'
    },
    bgimg: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },
    categoryText: {
        marginVertical: 10,
        fontSize: 20,
        color: colorPalette.color4,
        fontWeight: 'bold',
    },
})