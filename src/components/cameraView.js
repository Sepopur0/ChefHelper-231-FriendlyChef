import { useState, useRef, useEffect } from "react";
import React from "react";
import { View, StyleSheet, Text,useWindowDimensions } from "react-native";
import * as Camera from "expo-camera";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { colorPalette } from "../utils/systemDesign";
import CommonButton from "./button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
//suggestion: wrap this component in a Modal
export default function CameraView({
    width = "100%", // width
    height = "100%", // height
    containerStyle=null, // style
    mediaOutput,
    setMediaOutput = () => { }, //method to set array of URI of chosen images/videoURI, param: result, which is the uri of new media. Suggest combine with useState
    postCaptureAction=()=>{}, //method after capture image/video
    closeAction=()=>{}, //method when pressing close button
    ratio="1:1",
    ...props
}) {
    const cameraRef = useRef();
    const [type, setType] = useState(Camera.CameraType.back);
    useEffect(() => {
        requestPermissions();
    }, []);

    const aspect = ()=>{
        const [width,height]=ratio.split(':')
        const widthLength=useWindowDimensions().width
        return {width:widthLength,height:widthLength*Number(height)/Number(width)}
    }

    const requestPermissions = async () => {
        await Camera.requestCameraPermissionsAsync();
    };
    const getPermissions = async () => {
        const cameraPermission = await Camera.getCameraPermissionsAsync();

        return cameraPermission.granted;
    };
    const flipCamera = () => {
        setType(current => (current === Camera.CameraType.back ? Camera.CameraType.front : Camera.CameraType.back));
    }
    const takeImage = async () => {
        const { uri, width, height } = await cameraRef?.current.takePictureAsync();
        setMediaOutput(uri);
        postCaptureAction();
    }
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
            allowsEditing:true,
            aspect:[1,1]
        });
        if (result.canceled) return;
        else {
            // const url=await FileSystem.readAsStringAsync(result.assets[0].uri,{encoding:FileSystem.EncodingType.Base64})
            setMediaOutput(result.assets[0].uri);
            closeAction();
            // postCaptureAction();
        }
    }

    return (
        <View style={[containerStyle ? containerStyle : modalStyle.containerStyle, { width: width, height: height }]}>
            {(getPermissions()) ?
                <View style={modalStyle.cameraContainer}>
                    <View style={modalStyle.cameraBanner}>
                        <CommonButton action={closeAction} containerStyle={{}} style={{}} width="10%">
                            <MaterialCommunityIcons name="close" size={32} color={colorPalette.color4} />
                        </CommonButton>
                        <CommonButton action={flipCamera} containerStyle={{}} style={{}} width="10%">
                            <MaterialCommunityIcons name="camera-flip" size={32} color={colorPalette.color4} />
                        </CommonButton>
                    </View>
                <Camera.Camera style={aspect()} type={type} ref={cameraRef} ratio={ratio}/>
                <View style={modalStyle.cameraBanner}>
                        <CommonButton action={pickImage} containerStyle={modalStyle.containerStyle} style={modalStyle.buttonStyle} width="15%" >
                            <MaterialCommunityIcons name="folder-multiple-image" size={32} color={colorPalette.color4} />
                            <Text style={modalStyle.smallText}>Album</Text>
                        </CommonButton>
                        <CommonButton action={takeImage} containerStyle={modalStyle.cameraButtonContainer} style={modalStyle.cameraButton} width={90}>
                            <MaterialCommunityIcons name="camera" size={28} color={colorPalette.color10} />
                        </CommonButton>
                    </View>
                </View> :
                <View style={modalStyle.permissionRequestContainer}>
                    <Text style={modalStyle.text}>Permission for camera accessing not granted</Text>
                    <CommonButton action={requestPermissions} style={{}} containerStyle={{}}>
                        <Text style={modalStyle.textButton}> Click here to grant permission</Text>
                    </CommonButton>
                </View>}
        </View>
    )
}
const modalStyle = StyleSheet.create({
    containerStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    textButton: {
        color: '#4461F2',
        textAlign: 'center',
        marginTop: '2%',
        marginBottom: '1%',
        width: '90%',
        fontSize: 20
    },
    text: {
        color: colorPalette.color10,
        fontSize: 20,
        textAlign: 'center'
    },
    permissionRequestContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    cameraContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        backgroundColor:colorPalette.color13
    },
    smallText: {
        fontSize: 12,
        color: colorPalette.color4,
        marginTop: '2%',
        marginBottom: '1%',
        width: '90%',
    },
    buttonStyle: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 18
    },
    cameraButtonContainer: {
        backgroundColor: 'rgba(128,128,128,0.7)',
        borderRadius: 100,
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '37%',
        height: 90
    },
    cameraButton: {
        backgroundColor: colorPalette.color8,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    },
    cameraBanner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        height: '15%',
        paddingHorizontal: '8%',
        paddingVertical: 5,
        marginVertical: '5%'
    }
})