// import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Authencitation, Home, HelpNavigator, Detail } from './StackNavigator';
import { Onboard } from './StackNavigator';
import RecipeByCategoryPage from './src/pages/recipeByCategory';
import HomePage from './src/pages/home';
const queryClient = new QueryClient();
const Stack = createStackNavigator();
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Onboarding" component={Onboard} options={{ headerShown: false }} />
          <Stack.Screen name="Authencitation" component={Authencitation} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="DetailRecipe" component={Detail} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

