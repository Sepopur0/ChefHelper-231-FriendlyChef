// import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Authencitation, Setting, ScanIngredient, HelpNavigator, Detail,Onboard,Profile } from './StackNavigator';
import RecipeByCategoryPage from './src/pages/recipeByCategory';
import HomePage from './src/pages/home';
import { useState, useEffect } from 'react';
import RecipeDetail from "./src/pages/detailRecipe";
import HelpPage from "./src/pages/help";
import AsyncStorage from "@react-native-async-storage/async-storage"; 

const queryClient = new QueryClient();
const Stack = createStackNavigator();

export default function App() {
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);
  useEffect(() => {
    // Check if onboarding has been completed
    async function checkOnboarding() {
      try {
        const value = await AsyncStorage.getItem('onboarding_completed');
        if (value !== null) {
          setIsOnboardingCompleted(true);
        }
      } catch (error) {
        console.error('Error reading onboarding status:', error);
      }
    }

    checkOnboarding();
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator>
          {/*  */}
          <Stack.Screen name="Onboarding" component={Onboard} options={{ headerShown: false }} />
          {isOnboardingCompleted ? (
            <>
              <Stack.Screen name="Authencitation" component={Authencitation} options={{ headerShown: false }} />
              <Stack.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
              <Stack.Screen name="ScanIngredient" component={ScanIngredient} options={{ headerShown: false }} />
              <Stack.Screen name="Help" component={HelpPage} options={{ headerShown: false }} />
              <Stack.Screen name="Setting" component={Setting} options={{ headerShown: false }} />
              <Stack.Screen name="RecipeByCategory" component={RecipeByCategoryPage} options={{headerShown:false}}/>
              <Stack.Screen name="RecipeDetail" component={RecipeDetail} options={{ headerShown: false }} />
              <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
            </>
          ) : (
            <>      
              <Stack.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
              <Stack.Screen name="ScanIngredient" component={ScanIngredient} options={{ headerShown: false }} />
              <Stack.Screen name="Help" component={HelpPage} options={{ headerShown: false }} />
              <Stack.Screen name="Setting" component={Setting} options={{ headerShown: false }} />
              <Stack.Screen name="RecipeByCategory" component={RecipeByCategoryPage} options={{headerShown:false}}/>
              <Stack.Screen name="RecipeDetail" component={RecipeDetail} options={{ headerShown: false }} />
            </>
          )}
          
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

