import React, { useState, memo, useImperativeHandle, forwardRef } from "react";
import { View, Image, Text, Modal } from "react-native";
import { colorPalette } from "../utils/systemDesign";
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import CameraView from "./cameraView";
import CommonButton from "./button";
import CommonTextInput from "./textInput";
import { stepStyle } from "../style/uploadStyle";
import { checkUploadImage } from "../utils/helperFunction";
import UploadStepHeader from "./uploadStepHeader";
///////////////////////
///NOTES: consider to animate collapse?
///////////////////////
//maximum image size in MB

const UploadSteps = forwardRef(function uploadStep({
    recipe = false,
    idx = 0,
    initState = false,
    initDesc = "",
    initImageURI = [],
    deleteStep,
    setNewStep,
    header = true,
    // uploadFlag,
    ...props
}, ref) {
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
    const [collapsed, setCollasped] = useState(initState);
    const [imageURI, setImageURI] = useState(initImageURI);
    const [descriptionValue, setDescriptionValue] = useState(initDesc);
    const [error, setError] = useState("");
    const [updateFlag, setUpdateFlag] = useState(false);
    const maxMedia = recipe ? 3 : 1;
    useImperativeHandle(ref, () => ({
        // getImage:()=>imageURI,
        // getDesc:()=>descriptionValue,
        getData() {
            return {
                idx: idx,
                image: imageURI,
                description: descriptionValue,
                state: collapsed
            }
        },
    }))
    const setMediaOutput = (e) => {
        setImageURI([...imageURI, e])
    }
    const turnOffCamera = async () => {
        let tmpError = await checkUploadImage(imageURI);
        setError(tmpError)
        setCameraVisibility(false);
    }
    const removeImage = (i) => {
        let tmp = imageURI
        tmp.splice(i, 1)
        setImageURI(tmp)
        setUpdateFlag(!updateFlag)
    }
    const uploadImage = () => {///open camera modal to take image
        setCameraVisibility(true);
    }

    return (
        <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
            {header ? <UploadStepHeader idx={idx} deleteStep={deleteStep} collapsed={collapsed} setCollapsed={() => { setCollasped(!collapsed) }} /> : null}
            <View style={stepStyle.container}>
                {!recipe && !collapsed && header ? <View style={stepStyle.sideBar}>
                    <View style={{ width: 1, minHeight: 160, borderRadius: 1, borderWidth: 1, borderColor: colorPalette.color4, borderStyle: 'dashed', marginHorizontal: 5 }} />
                </View> : null}
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Modal visible={cameraVisibility} onRequestClose={turnOffCamera}>
                        <CameraView mediaOutput={imageURI} setMediaOutput={setMediaOutput} closeAction={turnOffCamera} postCaptureAction={turnOffCamera} />
                    </Modal>
                    {!collapsed ?
                        <View style={stepStyle.stepContainer}>
                            {error != "" ? <Text style={stepStyle.errorMessage}>{error}</Text> : null}
                            <Text style={[stepStyle.smallText, { fontSize: !recipe ? 12 : 14 }]}>
                                {!recipe ? "Step description" : "Description"}
                            </Text>
                            <CommonTextInput width={recipe ? "90%" : "80%"} multiline={true} numberOfLines={3} textStyle={{ width: '90%', fontSize: !recipe ? 12 : 14 }} containerStyle={{}} style={stepStyle.inputText} placeholderTextColor={colorPalette.color10} value={descriptionValue} onChangeText={(e) => setDescriptionValue(e)} primarycolor={colorPalette.color4} placeholder="Add description here" />

                            <Text style={[stepStyle.smallText, { fontSize: !recipe ? 12 : 14 }]}>Add photo</Text>
                            <View style={{ flexDirection: 'row' }}>
                                {imageURI.length > 0 ? imageURI.map((e, idx) => {
                                    return <View style={stepStyle.imageView} key={idx}>
                                        <Image source={{ uri: imageURI[idx] }} resizeMode="center" style={stepStyle.image} />
                                        <CommonButton action={() => { removeImage(idx); }} containerStyle={stepStyle.imageButtonContainer} style={stepStyle.imageButton} width="10%">
                                            <MaterialCommunityIcons name="close" size={8} color={colorPalette.color4} />
                                        </CommonButton>
                                    </View>
                                }) : null}
                            </View>
                            <CommonButton action={uploadImage} containerStyle={{}} style={stepStyle.uploadImageButton} width={recipe ? "90%" : "80%"} disabled={imageURI.length < maxMedia ? false : true}>
                                <AntDesign name="upload" size={24} color={colorPalette.color10} />
                                <Text style={stepStyle.uploadImageText}>Maximum photo is {maxMedia} and maximum file size is 100MB</Text>
                            </CommonButton>
                        </View> :
                        null
                    }
                </View>
            </View>
        </View>
    )
})

// const UploadSteps = memo(uploadStep)

// const mapStateToProps = (state) => ({
//     curState: state.Recipe
// });

// export default connect(mapStateToProps)(UploadSteps);
export default UploadSteps
