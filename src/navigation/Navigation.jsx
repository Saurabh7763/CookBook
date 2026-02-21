import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';

import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import RecipeDetails from '../pages/RecipeDetails';
import FavouriteScreen from '../screens/FavouriteScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Login from '../pages/Login';
import SignupScreen from '../pages/SignupScreen';
import NotificationScreen from '../screens/NotificationScreen';
import SupportScreen from '../screens/SupportScreen';
import NotificationSettingScreen from '../screens/NotificationSettingScreen';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const { user, loading } = useAuth();

  if (loading) return null; 

  return (
    <>
      {user ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="RecipeDetails" component={RecipeDetails} />
          <Stack.Screen name="Favourite" component={FavouriteScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name='Notification' component={NotificationScreen}/>
          <Stack.Screen name='Support' component={SupportScreen}/>
          <Stack.Screen name='NotiSetting' component={NotificationSettingScreen}/>
        </Stack.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Welcome'>
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
        </Stack.Navigator>
      )}
    </>
    
  );
  
}
