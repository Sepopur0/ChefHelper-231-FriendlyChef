import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginPage from "./src/pages/login";
import RegisterPage from "./src/pages/register";
import Welcome from "./src/pages/welcome";
import Onboarding from "./src/pages/onboarding";
import ManageAccountPage from './src/pages/manageAccount';
import SettingPage from './src/pages/setting';
import ScanPage from './src/pages/scan';
import SelectIngredientPage from './src/pages/selectIngredientPage';
import RecipeByCategoryPage from './src/pages/recipeByScan';
import recipeByScan from "./src/pages/recipeByScan";
const Stack = createStackNavigator()

const Authencitation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterPage} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}
const Onboard = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Onboard" component={Onboarding} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

const Setting = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="SettingPage" component={SettingPage} options={{ headerShown: false }} />
            <Stack.Screen name="ManageAccount" component={ManageAccountPage} options={{ headerShown: false}} />
        </Stack.Navigator>
    )
}

const ScanIngredient = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="ScanPage" component={ScanPage} options={{headerShown: false}} />
            <Stack.Screen name="SelectIngredient" component={SelectIngredientPage} options={{headerShown: false}} />
            <Stack.Screen name="RecipeByScan" component={recipeByScan} options={{headerShown: false}} />
        </Stack.Navigator>
    )
}
export {
    Authencitation,
    Onboard,
    Setting,
    ScanIngredient,
}