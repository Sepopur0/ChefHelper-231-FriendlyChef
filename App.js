// import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Authencitation } from './StackNavigator';
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Authenciation" component={Authencitation} options={{ headerShown:false }} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

