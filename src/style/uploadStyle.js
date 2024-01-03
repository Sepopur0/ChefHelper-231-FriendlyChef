import { StyleSheet } from "react-native";
import { colorPalette } from "../utils/systemDesign";
const stepStyle = StyleSheet.create({
    container: {
        flexDirection:'row',
        padding:5,
        paddingLeft:7,
    },
    stepContainer:{
        width:'100%',
    },
    sideBar:{
        padding:8,
    },
    header: {
        paddingHorizontal: 12,
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
    },
    headerText:{
        fontSize:14,
        color:colorPalette.color11,
        marginLeft:'8%'
    },
    uploadImageButton: {
        borderColor:colorPalette.color4,
        borderWidth: 1,
        borderRadius: 15,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding:3
    },
    smallText: {
        color: colorPalette.color4,
        fontSize:14,
        marginTop: '2%',
        marginBottom: '1%',
        width: '90%',
    },
    inputText: {
        borderColor:colorPalette.color4,
        borderWidth: 1,
        borderRadius: 15,
        color:colorPalette.color4,
        paddingLeft:10,
    },
    singleLineInputText:{
        borderColor:colorPalette.color4,
        borderWidth: 1,
        borderRadius: 15,
        minHeight:40,
        paddingLeft:8
    },
    uploadImageText: {
        fontSize: 10,
        color: colorPalette.color10,
        margin: 3
    },
    errorMessage: {
        color: colorPalette.color9,
        fontSize: 14,
        marginTop: '2%',
        marginBottom: '1%',
        width: '90%',
    },
    image: {
        width: 40,
        height: 40
    },
    imageView: {
        padding: 10,
        width: '30%',
    },
    imageButtonContainer: {
        position: 'absolute',
        right: 0,
        top: 0,
    },
    imageButton: {
        backgroundColor: colorPalette.color10,
        borderRadius: 20,
        padding: 3
    }
})

export {stepStyle}