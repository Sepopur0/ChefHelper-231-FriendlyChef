import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginPage from "./src/pages/login";
import RegisterPage from "./src/pages/register";
import Welcome from "./src/pages/welcome";
const Stack=createStackNavigator()

const Authencitation= ()=>{
    return(
        <Stack.Navigator>
            <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown:false }} />
            <Stack.Screen name="Login" component={LoginPage} options={{ headerShown:false }} />
            <Stack.Screen name="Register" component={RegisterPage} options={{ headerShown:false }} />
        </Stack.Navigator>
    )
}

export {
    Authencitation
}