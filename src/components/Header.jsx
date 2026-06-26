import React from 'react';
import { View, Text, Image, Platform, StatusBar, TouchableOpacity } from 'react-native';
import tailwind from 'twrnc';
import { BellIcon, UserCircleIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import Typewriter from './Typewriter';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const navigation = useNavigation();
  const { user } = useAuth();

  return (
    <View
      style={[
        tailwind`bg-white px-4 pb-2`,
        {
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 50,
        },
      ]}
    >
      <View style={tailwind`flex-row items-center justify-between`}>
        <View>
          <Text style={tailwind`text-gray-500 text-sm font-medium uppercase tracking-widest`}>
            Good Morning
          </Text>
          <Text style={tailwind`text-2xl font-black text-gray-800`}>
            {user?.displayName || 'Chief Foodie'}! 🍳
          </Text>
        </View>
        <View style={tailwind`flex-row gap-3`}>
          <TouchableOpacity
            style={tailwind`bg-gray-100 p-2 rounded-full border border-gray-200`}
            onPress={() => navigation.navigate('Notification')}
          >
            <BellIcon size={26} color="#374151" />
            <View style={tailwind`absolute right-2 top-2 w-2.5 h-2.5 bg-amber-500 rounded-full border-2 border-white`} />
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
              <View style={tailwind`bg-amber-100 p-0.5 rounded-full border-2 border-amber-500`}>
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
          style={tailwind`text-lg text-gray-600 font-semibold leading-6`}
        />
      </View>
    </View>
  );
};

export default Header;

