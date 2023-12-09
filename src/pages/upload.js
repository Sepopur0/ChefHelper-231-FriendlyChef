import React, { useState } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import UploadSteps from "../components/uploadSteps";
import CommonButton from "../components/button";
import { colorPalette } from "../utils/systemDesign";
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from "@react-navigation/native";
import { stepStyle } from "../style/uploadStyle";
import CommonTextInput from "../components/textInput";
function UploadPage() {
    const [pointer, setPointer] = useState(0); // tell which step does the camera modal work for currently
    const [updateFlag, setUpdateFlag] = useState(false);
    const [category, setCategory] = useState(0);
    const [time, setTime] = useState(0);
    const [name, setName] = useState("");
    const navigation = useNavigation();
    const back=()=>{
        navigation.goBack()
    }
    const categoryData = [
        "Soup",
        "Salad",
        "Rice",
        "Pasta",
        "By meat"
    ]
    const uploadButton = () => {
        //dosth
        setUpdateFlag(!updateFlag)
    }
    const deleteStep = () => {

    }
    return (
        <View>
            <View style={uploadStyle.header}>
                <View style={{ width: '100%', marginTop: '12%' }}>
                    <CommonButton width="20%" containerStyle={{}} style={{ flexDirection: 'row' }} action={back}>
                        <MaterialCommunityIcons name="chevron-left" size={24} color={colorPalette.color12} />
                    </CommonButton>
                    <CommonTextInput value={name} onChangeText={(e)=>{setName(e)}} containerStyle={{}} style={[stepStyle.inputText, { textAlignVertical: 'center' }]} placeholder={"Add reccipe name here"}/>
                </View>
            </View>
            <View>
                <Picker style={stepStyle.inputText} selectedValue={category} onValueChange={(e,idx)=>{setCategory(e);}}>
                    {categoryData.map((e, idx) => { <Picker.Item label={e} value={idx} /> })}
                </Picker>
                <CommonTextInput value={time} onChangeText={(e) => { setTime(e); }} containerStyle={{}} style={[stepStyle.inputText, { textAlignVertical: 'center' }]} inputMode='numeric' />
                <Text style={stepStyle.smallText}>minutes</Text>
            </View>

            <UploadSteps recipe={true} uploadFlag={updateFlag} />
            <FlatList>

            </FlatList>
            <CommonButton action={uploadButton} containerStyle={{}}>
                <Text style={uploadStyle.buttonText}>Upload</Text>
            </CommonButton>
        </View>
    );
}

const uploadStyle = StyleSheet.create({
    header: {
        flexDirection: 'row'
    },
    generalStep: {

    },
    button: {
        flexDirection: 'row',
        backgroundColor: colorPalette.color4,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        borderRadius: 20,
        opacity: 0.1,
        width: '100%'
    },
    buttonText: {
        color: colorPalette.color4
    }
})

const mapStateToProps = (state) => ({
    curState: state.Recipe
});

export default connect(mapStateToProps)(UploadPage);