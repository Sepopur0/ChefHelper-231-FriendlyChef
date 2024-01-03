import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Text, ScrollView, Switch } from "react-native";

import UploadSteps from "../components/uploadSteps";
import UploadStepHeader from "../components/uploadStepHeader";
import CommonButton from "../components/button";

import useCategories from "../services/recipe/fetchAllCategories";
import useIngredients from "../services/ingredient/fetchAllIngredients";
import { fetchUploadImage } from "../services/file/uploadImage";
import { fetchRecipe } from "../services/recipe/fetchRecipes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useProfile from "../services/auth/profile";

import { colorPalette } from "../utils/systemDesign";
import { useNavigation } from "@react-navigation/native";
import { MultiSelect } from 'react-native-element-dropdown';
import { stepStyle } from "../style/uploadStyle";
import CommonTextInput from "../components/textInput";
import { MaterialCommunityIcons } from "@expo/vector-icons";
function UploadPage() {
    //get access token
    const [accessToken,setAccessToken]=useState(null);
    useEffect(() => {
        const fetchAccessToken = async () => {
          try {
            const token = await AsyncStorage.getItem('accessToken');
            if (token != null) {
              setAccessToken(token);
            }
          } catch (error) {
            console.error('Error fetching access token:', error);
          }
        };
        fetchAccessToken();
      }, []);
    const { data: profileData, isError, isLoading, error: profileError } = useProfile(accessToken);
    const [updateFlag, setUpdateFlag] = useState(false);
    //data state
    const [time, setTime] = useState('0');
    const [name, setName] = useState("");
    const [calories, setCalories] = useState("0");
    const [category, setCategory] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    ////guide data from steps: desc, imageURI
    ////uploader:profileData.data.id
    const [isDraft, setIsDratf] = useState(true);
    const [recipeData,setFinalData]=useState({})
    //end data state

    const [cameraVisibility, setCameraVisibility] = useState(false)
    const [error, setError] = useState("");
    const navigation = useNavigation();
    const generalRef = useRef();
    const stepRefList = useRef([]);
    const [stepList, setStepList] = useState([{ idx: 0, desc: "", imageURI: [], state: false }, { idx: -1 }])
    const back = () => {
        navigation.goBack()
    }
    let categoriesData = []
    let ingredientsData = []
    const { data: data, error: error1, isLoading: categoriesIsLoading, ...res } = useCategories();
    const { data: data2, error: error2, isLoading: ingredientsIsLoading, ...res2 } = useIngredients();
    if(!ingredientsIsLoading&&!categoriesIsLoading){
        categoriesData = data.data.map((e) => ({ value: e.id, label: e.name }))
        ingredientsData = data2.data.map((e) => ({ value: e.id, label: e.name }))
    }

    const toggleDraft = () => {
        setIsDratf(!isDraft)
    }

    const storeStepState = () => {
        if (stepList.length == 0) return [];
        let stepData = stepList.slice(0, -1).map((item, index) => {
            return stepRefList.current[index].getData();
        })
        return stepData
    }

    async function postImage(link) {   
        let result=[]
        for (item of link){
            const res = await fetchUploadImage(item,item.substring(item.lastIndexOf('.') + 1));
            result.push(res.data)
        }
        if (result.length==1) return result[0]
        else if (result.length==0) return []
        else return result
    }

    const uploadButton = async () => {
        //dosth
        let tmpStepData = storeStepState();
        let stepData=[];
        for (item of tmpStepData){
            const{image,description,...res}=item;
            let finalImage=await postImage(image)
            stepData.push({image:Array.isArray(finalImage)?"":finalImage,description:description})
        }
        const { idx, image, description, state } = generalRef.current.getData()
        const finalImage= await postImage(image)
        let finalData = {
            name: name,
            time: Number(time),
            calorie: Number(calories),
            description: description,
            images: Array.isArray(finalImage)?finalImage:[finalImage],
            guide: stepData,
            category: category,//enum type
            uploader:profileData.data.id,
            ingredients: ingredients,
            isDraft: isDraft
        }
        setFinalData(finalData)
        // console.log(finalData)
        const finalResult=await fetchRecipe(recipeData)
        
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
            <ScrollView contentContainerStyle={{}}>
                <View style={uploadStyle.generalStep}>
                    {/* categories*/}
                    <Text style={stepStyle.smallText}>Category</Text>
                    <MultiSelect
                        style={uploadStyle.picker}
                        data={categoriesData}
                        labelField="label"
                        valueField="value"
                        value={category}
                        placeholder="Select categories..."
                        onChange={item => {
                            setCategory(item);
                        }}
                        selectedTextStyle={{ color: colorPalette.color4, paddingLeft: 8 }}
                    />
                </View>
                <View style={uploadStyle.generalStep}>
                    {/* ingredients*/}
                    <Text style={stepStyle.smallText}>Ingredients</Text>
                    <MultiSelect
                        style={uploadStyle.picker}
                        data={ingredientsData}
                        labelField="label"
                        valueField="value"
                        value={ingredients}
                        onChange={item => {
                            setIngredients(item);
                        }}
                        selectedTextStyle={{ color: colorPalette.color4, paddingLeft: 8 }}
                    />
                </View>
                <View style={[uploadStyle.header, uploadStyle.generalStep]}>
                    {/* time, calories */}
                    <View style={{ marginLeft: '5%', width: '50%' }}>
                        <Text style={stepStyle.smallText}>Time</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <CommonTextInput value={time} onChangeText={(e) => { setTime(e); }} containerStyle={{ marginRight: '3%' }} style={[stepStyle.singleLineInputText, { minHeight: 35 }]} inputMode='numeric' width="30%" primarycolor={colorPalette.color4} />
                            <Text style={[stepStyle.smallText, { width: '60%' }]}>minutes</Text>
                        </View>
                    </View>
                    <View style={{ marginLeft: '5%', width: '50%' }}>
                        <Text style={stepStyle.smallText}>Calories</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <CommonTextInput value={calories} onChangeText={(e) => { setCalories(e); }} containerStyle={{ marginRight: '3%' }} style={[stepStyle.singleLineInputText, { minHeight: 35 }]} inputMode='numeric' width="30%" primarycolor={colorPalette.color4} />
                            <Text style={[stepStyle.smallText, { width: '60%' }]}>kCal</Text>
                        </View>
                    </View>
                </View>
                <UploadSteps recipe={true} header={false} ref={generalRef} />
                {stepList.map((item, index) => {
                    return item.idx != -1 ?
                        <UploadSteps idx={index} ref={(el) => { stepRefList.current[index] = el }} key={item.idx} initState={item.state} initDesc={item.desc} initImageURI={item.imageURI} deleteStep={() => { deleteStep(index) }} />
                        : <UploadStepHeader setNewStep={addStep} addStep={true} key={item.idx} />
                })}
                <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                    <CommonButton width="70%" action={uploadButton} containerStyle={{ marginLeft: '3%' }} style={uploadStyle.button} >
                        <Text style={uploadStyle.buttonText}>Upload</Text>
                    </CommonButton>
                    <View style={{ width: '30%', alignItems: 'center' }}>
                        <Text style={[stepStyle.smallText]}>Save as draft</Text>
                        <Switch
                            onValueChange={toggleDraft}
                            value={isDraft}
                            thumbColor={isDraft ? '#fff' : colorPalette.color2}
                            trackColor={{ true: colorPalette.color11, false: '#fff' }}
                            ios_backgroundColor={'#fff'}
                        />
                    </View>
                </View>
            </ScrollView>

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
        paddingLeft: 8,
        width: '100%'
    },
    button: {
        flexDirection: 'row',
        backgroundColor: colorPalette.color11,
        height: 40,
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
        color: colorPalette.color4,
        width: '90%'
    }
})

// const mapStateToProps = (state) => ({
//     curState: state.Recipe
// });

// export default connect(mapStateToProps)(UploadPage);
export default UploadPage;