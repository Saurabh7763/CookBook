import React from 'react';
import { View, Text, Image, Platform, StatusBar, TouchableOpacity } from 'react-native';
import tailwind from 'twrnc';
import { BellIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import Typewriter from './Typewriter';

const Header = () => {
  const navigation= useNavigation()
  return (
    <View
      style={[
        tailwind`bg-amber-500 rounded-b-7 pb-1`,
        {
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        },
      ]}
    >
      <View style={tailwind`flex-row items-center justify-between mx-4`}>
        <TouchableOpacity
          style={tailwind`bg-white rounded-full`}
          onPress={()=>navigation.navigate('Profile')}
        >
          <Image
          source={require('../../assets/avtar.png')}
          style={{ height: 50, width: 50, borderRadius: 25 }}
          resizeMode='cover'
        />
        </TouchableOpacity>
        <TouchableOpacity
          style={tailwind`bg-white p-1 rounded-full`}
          onPress={()=>navigation.navigate('Notification')}
        >
          <BellIcon size={30} color="orange" />
        </TouchableOpacity>
      </View>

      <View style={tailwind`mx-3 my-2`}>
        <Text style={tailwind`text-base text-white`}>Hello Admin!</Text>
        <Typewriter
          text="The art of fine cooking, perfected."
          highlightWord="Perfected."
          highlightStyle={{ color: 'red', fontWeight: 'bold' }}
          speed={80}
          delay={500}
          style={tailwind`text-xl text-white font-bold`}
        />

      </View>
    </View>
  );
};

export default Header;
