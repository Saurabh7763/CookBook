import React from 'react';
import { View, Text, Image, Platform, StatusBar, TouchableOpacity } from 'react-native';
import tailwind from 'twrnc';
import { BellIcon, UserCircleIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import Typewriter from './Typewriter';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const { theme, themeStyles } = useTheme();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    if (hour < 21) return 'Good Evening';
    return 'Good Night';
  };

  return (
    <View
      style={[
        tailwind`${themeStyles.background} px-4 pb-2`,
      ]}
    >
      <View style={tailwind`flex-row items-center justify-between`}>
        <View>
          <Text style={tailwind`text-sm font-medium uppercase tracking-widest ${themeStyles.subText}`}>
            {getGreeting()}
          </Text>
          <Text style={tailwind`text-2xl font-black ${themeStyles.text}`}>
            {user?.displayName || 'Chief Foodie'}! 🍳
          </Text>
        </View>
        <View style={tailwind`flex-row gap-3`}>
          <TouchableOpacity
            style={tailwind`${theme === 'light' ? 'bg-gray-100' : 'bg-slate-800'} p-2 rounded-full border ${theme === 'light' ? 'border-gray-200' : 'border-slate-700'}`}
            onPress={() => navigation.navigate('Notification')}
          >
            <BellIcon size={26} color={theme === 'light' ? "#374151" : "#f3f4f6"} />
            <View style={tailwind`absolute right-2 top-2 w-2.5 h-2.5 bg-amber-500 rounded-full border-2 ${theme === 'light' ? 'border-white' : 'border-slate-800'}`} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Profile')}
            style={tailwind`shadow-lg`}
          >
            {user?.photoURL ? (
              <Image
                source={{ uri: user.photoURL }}
                style={tailwind`h-11 w-11 rounded-full border-2 border-amber-500`}
              />
            ) : (
              <View style={tailwind`${theme === 'light' ? 'bg-amber-100' : 'bg-slate-800/50'} p-0.5 rounded-full border-2 border-amber-500`}>
                <Image
                  source={require('../../assets/avtar.png')}
                  style={tailwind`h-10 w-10 rounded-full`}
                  resizeMode='cover'
                />
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View style={tailwind`mt-4`}>
        <Typewriter
          text="Discover the secret ingredients for your next masterpiece."
          highlightWord="masterpiece."
          highlightStyle={tailwind`text-amber-500 font-extrabold`}
          speed={50}
          delay={1000}
          style={tailwind`text-lg ${themeStyles.subText} font-semibold leading-6`}
        />
      </View>
    </View>
  );
};

export default Header;

