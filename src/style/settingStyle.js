import { StyleSheet, StatusBar } from "react-native";
import { colorPalette } from "../utils/systemDesign";
import { Dimensions } from "react-native";
export const SettingStyle = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        flex: 1,
        alignItems: 'center',
        paddingTop: 30,
        paddingHorizontal: 20,
        backgroundColor: colorPalette.color13,
    },
    subContainer: {
        width: '100%',
        height: 'auto',
        padding: 0,
        marginVertical: 10,
    },
    generalContainer: {
        width: '100%',
        height: 'auto',
        padding: 10,
        backgroundColor: colorPalette.color14,
        borderRadius: 20,
        overflow: 'hidden',
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Adjust as needed
        width: '100%',
        height: 60,
        padding: 10,
        borderRadius: 20,
        backgroundColor: colorPalette.color14,
    },
    leftRowContainer: {
        width: '20%',
        marginLeft: 0,
        justifyContent: 'center'
    },
    rightRowContainer: {
        width: '80%',
        marginRight: 0,
        alignContent: 'left',
        justifyContent: 'center',
    },
    statusBar: {
      animated: true,
      backgroundColor: colorPalette.color13,
      barStyle: 'light-content',
      showHideTransition: 'slide'
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 50,
    },
    icon: {
        width: 30,
        height: 30,
    },
    subTitleContainer: {
        width: '100%',
        height: 'auto',
        padding: 0,
        margin: 0,
        marginVertical: 15,
    },
    subTitle: {
        color: colorPalette.color4,
        fontSize: 16,
        fontWeight: "400",
    },
    nameText: {
        color: colorPalette.color4,
        fontSize: 20,
        fontWeight: '400',
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
    },
    logOutButton: {
        width: '100%',
        height: 40,
        backgroundColor: colorPalette.color14,
        borderRadius: 20, 
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    }
})