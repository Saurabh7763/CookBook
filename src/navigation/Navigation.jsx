import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';

import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import RecipeDetails from '../pages/RecipeDetails';
import FavouriteScreen from '../screens/FavouriteScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Login from '../pages/Login';
import SignupScreen from '../pages/SignupScreen';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const { user, loading } = useAuth();

  if (loading) return null; 

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="RecipeDetails" component={RecipeDetails} />
          <Stack.Screen name="Favourite" component={FavouriteScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Login" component={Login} />
        </>
      )}
    </Stack.Navigator>
  );
}
