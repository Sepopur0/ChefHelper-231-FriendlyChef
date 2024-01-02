import React, { useState, useRef } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import UploadSteps from "../components/uploadSteps";
import UploadStepHeader from "../components/uploadStepHeader";
import CommonButton from "../components/button";
import { colorPalette } from "../utils/systemDesign";
import { useNavigation } from "@react-navigation/native";
import { Dropdown } from 'react-native-element-dropdown';
import { stepStyle } from "../style/uploadStyle";
import CommonTextInput from "../components/textInput";
import { MaterialCommunityIcons } from "@expo/vector-icons";
function UploadPage() {
    const [updateFlag, setUpdateFlag] = useState(false);
    const [category, setCategory] = useState(0);
    const [time, setTime] = useState('0');
    const [name, setName] = useState("");
    const navigation = useNavigation();
    const generalRef = useRef();
    const stepRefList = useRef([]);
    const [stepList, setStepList] = useState([{ idx: 0, desc: "", imageURI: [], state: false }, { idx: -1 }])
    let stepData = []
    const back = () => {
        navigation.goBack()
    }
    const categoryData = [
        { value: 0, label: 'Soup' },
        { value: 1, label: 'Salad' },
        { value: 2, label: 'Main course' },
        { value: 3, label: 'Pasta' },
        { value: 4, label: 'Noodles' },
        { value: 5, label: 'Others' }
    ]

    const storeStepState = () => {
        if (stepList.length == 0) return [];
        stepData = stepList.slice(0, -1).map((item, index) => {
            return stepRefList.current[index].getData();
        })
        return stepData
    }
    const uploadButton = () => {
        //dosth
        let stepData = storeStepState().map((item) => {
            const { state, ...res } = item
            return res
        })
        const { idx, imageURI, desc, state } = generalRef.current.getData()
        let finalData = {
            name: name,
            time: time,
            category: category,//enum type
            image: imageURI,
            desc: desc,
            stepData: stepData
        }
        console.log(finalData)
    }
    const deleteStep = (idx) => {
        if (stepList.length <= 2) return;
        let tmp = storeStepState();
        tmp.splice(idx, 1)
        tmp.push({ idx: -1 })
        setStepList(tmp)
        setUpdateFlag(!updateFlag)
    }
    const addStep = () => {
        let tmp = storeStepState();
        tmp.push({ idx: stepList.length - 1, desc: "", imageURI: [], state: false })
        tmp.push({ idx: -1 })
        setStepList(tmp)
        setUpdateFlag(!updateFlag)
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'black', paddingBottom: '5%' }}>
            <View style={[uploadStyle.header, { width: '100%', marginTop: '18%' }]}>
                <CommonButton width="10%" containerStyle={{ marginLeft: '2%', marginRight: '2%' }} style={{ flex: 1, justifyContent: 'center' }} action={back}>
                    <MaterialCommunityIcons name="chevron-left" size={30} color={colorPalette.color10} />
                </CommonButton>
                <CommonTextInput width="70%" value={name} onChangeText={(e) => { setName(e) }} containerStyle={{}} style={stepStyle.singleLineInputText} placeholder={"Add recipe name here"} primarycolor={colorPalette.color4} placeholderTextColor={colorPalette.color10} textAlignVertical='center' textAlign='center' textStyle={{ width: '100%', fontSize: 18 }} />
            </View>
            <View style={[uploadStyle.header, uploadStyle.generalStep]}>
                {/* <View style={uploadStyle.picker}>
                <Picker style={stepStyle.inputText} selectedValue={category} onValueChange={(e, idx) => { setCategory(e); }} mode="dropdown" dropdownIconColor={colorPalette.color4}>
                    {categoryData.map((e, idx) => <Picker.Item label={e} value={idx} key={idx} />)}
                </Picker>
                </View> */}
                <View style={{ width: '60%' }}>
                    <Text style={stepStyle.smallText}>Category</Text>
                    <Dropdown
                        style={uploadStyle.picker}
                        data={categoryData}
                        labelField="label"
                        valueField="value"
                        value={category}
                        onChange={item => {
                            setCategory(item.value);
                        }}
                        selectedTextStyle={{ color: colorPalette.color4, paddingLeft: 8 }}
                    />
                </View>
                <View style={{ marginLeft: '5%' }}>
                    <Text style={stepStyle.smallText}>Time</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <CommonTextInput value={time} onChangeText={(e) => { setTime(e); }} containerStyle={{ marginRight: '3%' }} style={[stepStyle.singleLineInputText, { minHeight: 35 }]} inputMode='numeric' width="12%" primarycolor={colorPalette.color4} />
                        <Text style={stepStyle.smallText}>minutes</Text>
                    </View>
                </View>

            </View>
            <UploadSteps recipe={true} header={false} ref={generalRef} />
            <ScrollView contentContainerStyle={{}}>
                {stepList.map((item, index) => {
                    return item.idx != -1 ?
                        <UploadSteps idx={index} ref={(el) => { stepRefList.current[index] = el }} key={item.idx} initState={item.state} initDesc={item.desc} initImageURI={item.imageURI} deleteStep={() => { deleteStep(index) }} />
                        : <UploadStepHeader setNewStep={addStep} addStep={true} key={item.idx} />
                })}
            </ScrollView>
            <View style={{alignItems:'center'}}>
                <CommonButton width="90%" action={uploadButton} containerStyle={{}} style={uploadStyle.button} >
                    <Text style={uploadStyle.buttonText}>Upload</Text>
                </CommonButton>
            </View>

        </View>
    );
}

const uploadStyle = StyleSheet.create({
    header: {
        flexDirection: 'row'
    },
    generalStep: {
        marginTop: '4%',
        alignItems: 'center',
        paddingLeft: 8
    },
    button: {
        flexDirection: 'row',
        backgroundColor: '#33393A',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        opacity: 0.9,
        borderRadius: 20,
        width: '100%'
    },
    buttonText: {
        color: colorPalette.color4,
        fontSize: 18
    },
    picker: {
        borderWidth: 1,
        borderColor: colorPalette.color4,
        borderRadius: 20,
        color: colorPalette.color4
    }
})

// const mapStateToProps = (state) => ({
//     curState: state.Recipe
// });

// export default connect(mapStateToProps)(UploadPage);
export default UploadPage;