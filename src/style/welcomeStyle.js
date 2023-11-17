import { StyleSheet } from "react-native";
import { colorPalette } from "../utils/systemDesign";
export const welcomeStyle = StyleSheet.create({
    common: {
        padding: 8,
        paddingTop: '10%',
        alignItems: 'center',
    },
    bgimg: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },
    recoveryContainer: {
        width: '100%',
        marginHorizontal: '5%',
        marginLeft: '12%',
        marginBottom: '3%',
        flexDirection: 'row-reverse',
    },
    smallText: {
        fontSize: 14,
        color: colorPalette.color10,
        marginTop: '2%',
        marginBottom: '1%',
        width: '90%',
    },
    text: {
        fontSize: 20,
        textAlign: 'center'
    },
    titletext: {
        fontSize: 32,
    },
    submmitContainer: {
        overflow: 'hidden',
        paddingBottom: 8,
        paddingHorizontal: 2,
        borderRadius: 20,
    },
    submit: {
        backgroundColor: colorPalette.color11,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    navigate:{
        backgroundColor: colorPalette.color11,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 40,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        fontSize:18,
    },
    navigateContainer:{
        overflow: 'hidden',
        paddingBottom: 8,
        paddingHorizontal: 2,
        borderRadius: 40,
        marginHorizontal:'5%'
    }
})