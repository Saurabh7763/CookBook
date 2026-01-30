import { View, Text, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import tailwind from 'twrnc';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing
} from 'react-native-reanimated';
import {useAuth} from '../context/AuthContext'


const Login = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const {signup} = useAuth()


  const textTranslateY = useSharedValue(50);
  const textOpacity = useSharedValue(0);

  const cardTranslateY = useSharedValue(100);
  const cardOpacity = useSharedValue(0);

  useEffect(() => {
  textTranslateY.value = withSpring(0, { damping: 12, stiffness: 100 });
  textOpacity.value = withTiming(1, {
    duration: 800,
    easing: Easing.out(Easing.exp), 
  });

  setTimeout(() => {
    cardTranslateY.value = withTiming(0, {
      duration: 900,
      easing: Easing.out(Easing.exp),
    });
    cardOpacity.value = withTiming(1, { duration: 900 });
  }, 300);
}, []);

  const textStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: textTranslateY.value }],
    opacity: textOpacity.value,
  }));

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: cardTranslateY.value }],
    opacity: cardOpacity.value,
  }));

  const handleSubmit = async() => {
    if (name === '' || password === '' || email === '') {
      Alert.alert('Please enter all required credentials.');
    } else {
      try {
        await signup(email,password)
      } catch (error) {
        console.log("login error:",error)
      }
    }
  };

  return (
    <View style={tailwind`w-full flex-1 relative bg-white`}>
      
      <ChevronLeftIcon
        style={tailwind`absolute ml-2 z-10 mt-10`}
        size={40}
        color={'white'}
        strokeWidth={2}
        onPress={() => navigation.goBack()}
      />

      
      <View style={tailwind`h-[40%] bg-amber-500 justify-center items-center rounded-b-full`}>
        <Image
          source={require('../../assets/avtar.png')}
          style={tailwind`h-40 w-40 mb-2`}
        />
      </View>

      
      <Text style={tailwind`absolute left-[40%] top-[29%] text-white text-2xl font-bold`}>
        Register
      </Text>

      
      <Animated.View
        style={[
          tailwind`bg-gray-100 w-[80%] self-center p-4 rounded-2xl shadow-2xl shadow-amber-600 relative`,
          cardStyle,
        ]}
      >
        <TextInput
          style={tailwind`bg-white rounded-2xl mb-3 px-3 py-2`}
          placeholder="Enter your name"
          placeholderTextColor={'gray'}
          autoCapitalize="none"
          autoCorrect={false}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={tailwind`bg-white rounded-2xl mb-3 px-3 py-2`}
          placeholder="Enter your email"
          placeholderTextColor={'gray'}
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={tailwind`bg-white rounded-2xl mb-3 px-3 py-2`}
          placeholder="Enter your password"
          placeholderTextColor={'gray'}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={tailwind`bg-amber-500 justify-center items-center w-28 py-2 rounded-2xl self-center mt-2`}
          onPress={handleSubmit}
        >
          <Text style={tailwind`text-white text-xl font-bold`}>Register</Text>
        </TouchableOpacity>

        <View style={tailwind` items-center`}>
          <Text style={tailwind`self-center text-neutral-600 mt-3`}>
          Already have an account?
        </Text>
        <TouchableOpacity
          onPress={()=>navigation.navigate('Login')}
        >
          <Text style={tailwind`text-amber-500 text-xl underline font-bold`}>Login</Text>
        </TouchableOpacity>
        </View>
      </Animated.View>

     
      <View style={tailwind`h-[40%] bg-amber-500 rounded-t-full justify-center items-center`}>
        <Animated.Text
          style={[tailwind`text-white text-5xl font-bold`, textStyle]}
        >
          CookBook
        </Animated.Text>
      </View>
    </View>
  );
};

export default Login;
