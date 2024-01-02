import React,{useState} from "react"
import { View,Text } from "react-native"
import CommonButton from "./button"
import { stepStyle } from "../style/uploadStyle"
import { colorPalette } from "../utils/systemDesign"
import { MaterialCommunityIcons,Entypo } from "@expo/vector-icons"
export default function UploadStepHeader({
    addStep=false,
    idx,
    setNewStep,
    deleteStep,
    collapsed,
    setCollapsed,
}){
    return (
        <View style={stepStyle.header}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <View style={{borderRadius:10,height:20,width:20,backgroundColor:colorPalette.color2,justifyContent:'center',alignItems:'center'}}>
                <View style={{borderRadius:6,height:12,width:12,borderColor:'red',backgroundColor:colorPalette.color4}}>
                </View>
                </View>
                <Text style={stepStyle.headerText}>{addStep ? ("New step") : ("Step " + (idx + 1).toString())}</Text>
            </View>
            {
                addStep ?
                    (<CommonButton action={setNewStep} containerStyle={{}} style={{}} width="10%">
                        <MaterialCommunityIcons name="plus" size={28} color={colorPalette.color4} />
                    </CommonButton>) :
                    (<View style={{ width: '15%',flexDirection:'row' }}>
                        <CommonButton action={setCollapsed} containerStyle={{}} style={{}} width="50%">
                            {collapsed ? <MaterialCommunityIcons name="chevron-right" size={28} color={colorPalette.color4} /> :
                                <MaterialCommunityIcons name="chevron-down" size={28} color={colorPalette.color4} />}
                        </CommonButton>
                        <CommonButton action={()=>{deleteStep(idx)}} containerStyle={{}} style={{}} width="50%">
                            <Entypo name="minus" size={28} color={colorPalette.color4} />
                        </CommonButton>
                    </View>)
            }
        </View>
    )
}