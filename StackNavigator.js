import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginPage from "./src/pages/login";
import RegisterPage from "./src/pages/register";
import Welcome from "./src/pages/welcome";
import Onboarding from "./src/pages/onboarding";
import HomePage from "./src/pages/home";
import RecipeByCategoryPage from './src/pages/recipeByCategory'
import HelpPage from "./src/pages/help";
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

const HelpNavigator = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Help" component={HelpPage} options={{ headerShown: false }} />
      </Stack.Navigator>
    );
  };

export {
    Authencitation,
    Onboard,
    HelpNavigator,
}