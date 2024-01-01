import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginPage from "./src/pages/login";
import RegisterPage from "./src/pages/register";
import Welcome from "./src/pages/welcome";
import Onboarding from "./src/pages/onboarding";
import ManageAccountPage from './src/pages/manageAccount';
import SettingPage from './src/pages/setting';
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
export {
    Authencitation,
    Onboard,
    Setting,
}