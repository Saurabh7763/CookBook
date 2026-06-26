import React from 'react';
import { View, Text, TouchableOpacity, Image, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';
import tailwind from 'twrnc';
import { useTheme } from '../context/ThemeContext';

const NotificationSettingScreen = () => {
  const navigation = useNavigation();
  const { theme, themeStyles } = useTheme();

  return (
    <View style={tailwind`flex-1 ${themeStyles.background} pt-12 px-6`}>
      <StatusBar barStyle={themeStyles.statusBar} />
      <View style={tailwind`flex-row items-center mb-10`}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tailwind`${theme === 'light' ? 'bg-gray-100' : 'bg-slate-800'} p-2 rounded-2xl mr-4`}
        >
          <ArrowLeftIcon size={24} color={theme === 'light' ? "#374151" : "#f3f4f6"} strokeWidth={3} />
        </TouchableOpacity>
        <Text style={tailwind`text-2xl ${themeStyles.text} font-black`}>
          Notification Settings
        </Text>
      </View>

      <View style={tailwind`flex-1 items-center justify-center pb-20`}>
        <Image
          source={require('../../assets/namaste.png')}
          style={tailwind`w-64 h-64`}
          resizeMode="contain"
        />
        <Text style={tailwind`text-2xl ${themeStyles.text} font-black mt-6`}>
          Settings Coming Soon
        </Text>
        <Text style={tailwind`${themeStyles.subText} text-sm text-center px-10 mt-3 opacity-60 font-medium`}>
          You'll soon be able to customize how we notify you about new recipes and special offers.
        </Text>
      </View>
    </View>
  );
};

export default NotificationSettingScreen;