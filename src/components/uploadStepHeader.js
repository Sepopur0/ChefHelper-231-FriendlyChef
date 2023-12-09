import React from "react"
import { View } from "react-native"
import CommonButton from "./button"
import { stepStyle } from "../style/uploadStyle"
import { colorPalette } from "../utils/systemDesign"
import { MaterialCommunityIcons,Entypo } from "@expo/vector-icons"
export default function uploadStepHeader({
    addStep=false,
    setNewStep,
    setCollapse,
    deleteAction,
}){
    return (
        <View style={stepStyle.header}>
            <View>
                <Entypo name="circle" size={24} color={colorPalette.color8} backgroundColor={colorPalette.color4} borderRadius={3} />
                <Text style={stepStyle.headerText}>{addStep ? ("New step") : ("Step" + (idx + 1).toString())}</Text>
            </View>
            {
                addStep ?
                    (<CommonButton action={setNewStep} containerStyle={{}} style={{}} width="10%">
                        <MaterialCommunityIcons name="plus" size={28} color={colorPalette.color4} />
                    </CommonButton>) :
                    (<View style={{ width: '30%' }}>
                        <CommonButton action={setCollapse} containerStyle={{}} style={{}} width="50%">
                            {collapsed ? <MaterialCommunityIcons name="chevron-right" size={28} color={colorPalette.color4} /> :
                                <MaterialCommunityIcons name="chevron-down" size={28} color={colorPalette.color4} />}
                        </CommonButton>
                        <CommonButton action={()=>{deleteAction(idx)}} containerStyle={{}} style={{}} width="50%">
                            <Entypo name="minus" size={28} color={colorPalette.color4} />
                        </CommonButton>

                    </View>)
            }
        </View>
    )
}