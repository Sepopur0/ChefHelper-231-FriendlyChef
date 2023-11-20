// import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Authencitation } from './StackNavigator';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Onboard } from './StackNavigator';
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Onboarding" component={Onboard} options={{ headerShown: false }} />
        <Stack.Screen name="Authencitation" component={Authencitation} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

