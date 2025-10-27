import { Text, View } from 'react-native';
import tailwind from 'twrnc';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import { RecipeProvider } from './src/context/RecipeContext';
import RecipeDetails from './src/pages/RecipeDetails';
import FavouriteScreen from './src/screens/FavouriteScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import Login from './src/pages/Login';

const Stack= createNativeStackNavigator()
export default function App() {
  return (
    <RecipeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Welcome' screenOptions={{headerShown:false}}>
            <Stack.Screen name='Home' component={HomeScreen}/>
            <Stack.Screen name='Welcome' component={WelcomeScreen}/>
            <Stack.Screen name='RecipeDetails' component={RecipeDetails}/>
            <Stack.Screen name='Favourite' component={FavouriteScreen}/>
            <Stack.Screen name='Profile' component={ProfileScreen}/>
            <Stack.Screen name='Login' component={Login}/>
        </Stack.Navigator>
      </NavigationContainer>
    </RecipeProvider> 
  )
}


