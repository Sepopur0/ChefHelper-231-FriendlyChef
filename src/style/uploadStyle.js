import { StyleSheet } from "react-native";
import { colorPalette } from "../utils/systemDesign";
const stepStyle = StyleSheet.create({
    container: {
        flexDirection:'row',
        padding:5,
    },
    stepContainer:{

    },
    sideBar:{
        padding:8,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center'
    },
    header: {
        paddingHorizontal: 8,
        paddingVertical: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
    },
    headerText:{
        fontSize:20,
        color:colorPalette.color11,
        marginLeft:'8%'
    },
    uploadImageButton: {
        borderColor:colorPalette.color4,
        borderWidth: 1,
        borderRadius: 15,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    smallText: {
        color: colorPalette.color10,
        fontSize:14,
        marginTop: '2%',
        marginBottom: '1%',
        width: '90%',
    },
    inputText: {
        borderColor:colorPalette.color4,
        borderWidth: 1,
        borderRadius: 15,
        textAlignVertical: 'top',
        minHeight: 100,
        maxHeight: 150,
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
        width: '100%',
        height: '100%'
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