import React, { useEffect, useState, memo } from "react";
import { View, Image, Text, Modal } from "react-native";
import { colorPalette } from "../utils/systemDesign";
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { connect } from "react-redux";
import CameraView from "./cameraView";
import CommonButton from "./button";
import CommonTextInput from "./textInput";
import { stepStyle } from "../style/uploadStyle";
import { checkUploadImage } from "../utils/helperFunction";
import { SET_RECIPE, SET_STEP } from "../reducers/actions/upload";
///////////////////////
///NOTES: consider to animate collapse?
///////////////////////
//maximum image size in MB

function uploadStep({
    addStep = false,
    recipe = false,
    // uploadFlag,
    idx=-1,
    ...props
}) {
    const submitCall=()=>{ //// this function is for parent to call using useRef
        return {
            imageURI:imageURI,
            description:descriptionValue,
        }
    }
    // useEffect(() => {
    //     //do actions to submit stored result
    //     if (idx != -1) {
    //         if (!recipe) {
    //             const step = {
    //                 id: idx,
    //                 imageURI: imageURI,
    //                 description: descriptionValue
    //             }
    //             dispatch({
    //                 type: SET_STEP,
    //                 payload: step
    //             })
    //         }
    //         else {
    //             const recipe = {
    //                 description: descriptionValue,
    //                 generalImage: imageURI
    //             }
    //             dispatch({
    //                 type: SET_RECIPE,
    //                 payload: recipe
    //             })
    //         }

    //     }

    // }, [uploadFlag])
    const [cameraVisibility, setCameraVisibility] = useState(false)
    const [collapsed, setCollasped] = useState(false);
    const [imageURI, setImageURI] = useState([]);
    const [descriptionValue, setDescriptionValue] = useState("");
    const [error, setError] = useState("");

    const maxMedia = recipe ? 3 : 2;

    const setMediaOutput = (e) => {
        setImageURI([...imageURI, e])
    }
    const turnOffCamera = () => {
        let tmpError = checkUploadImage(imageURI);
        if (tmpError != "") {
            setError(tmpError);
        }
        setCameraVisibility(false);
    }
    const removeImage = (i) => {
        setImageURI(imageURI.splice(i, 1))
    }
    const uploadImage = () => {///open camera modal to take image
        setCameraVisibility(true);
    }
    const showImage = (i) => {
        return (
            <View style={stepStyle.imageView}>
                <Image source={{ uri: imageURI[i] }} resizeMode="center" style={stepStyle.image} />
                <CommonButton action={() => { removeImage(i); }} containerStyle={stepStyle.imageButtonContainer} style={stepStyle.imageButton} width="10%">
                    <MaterialCommunityIcons name="close" size={8} color={colorPalette.color4} />
                </CommonButton>
            </View>

        )
    }
    return (
        <View style={stepStyle.container}>
            <View style={stepStyle.sideBar}>
                <View style={{ width: 1, height: '100%', borderRadius: 1, borderWidth: 1, borderColor: colorPalette.color4, borderStyle: 'dashed' }} />
            </View>
            <View>
                <Modal visible={cameraVisibility} onRequestClose={turnOffCamera}>
                    <CameraView mediaOutput={imageURI} setMediaOutput={setMediaOutput} closeAction={turnOffCamera} postCaptureAction={turnOffCamera} />
                </Modal> :
                {!collapsed ?
                    <View style={stepStyle.stepContainer}>

                        <Text style={stepStyle.errorMessage}>{error}</Text>
                        <Text style={[stepStyle.smallText, { fontSize: !recipe ? 14 : 20 }]}>{!recipe ? "Step description" : "Description"}</Text>
                        <CommonTextInput multiline={true} numberOfLines={3} containerStyle={{}} style={stepStyle.inputText} placeholder={""} value={descriptionValue} onChangeText={(e) => setDescriptionValue(e)} />

                        <Text style={[stepStyle.smallText, { fontSize: !recipe ? 14 : 20 }]}>Add photo</Text>
                        {imageURI.map((e, idx) => { showImage(idx) })}
                        <CommonButton action={uploadImage} containerStyle={{}} style={stepStyle.uploadImageButton} width="80%" disabled={imageURI.length < maxMedia ? false : true}>
                            <AntDesign name="upload" size={24} color={colorPalette.color8} />
                            <Text style={stepStyle.uploadImageText}>Maximum photo is {maxMedia} and maximum file size is 100MB</Text>
                        </CommonButton>

                    </View> :
                    null
                }
            </View>

        </View>
    )
}

const UploadSteps = memo(uploadStep)

const mapStateToProps = (state) => ({
    curState: state.Recipe
});

export default connect(mapStateToProps)(UploadSteps);
