import { View, Text, TextInput, Image, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import tailwind from 'twrnc';
import { ChevronLeftIcon, EnvelopeIcon, LockClosedIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing
} from 'react-native-reanimated';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';


const Login = () => {
  const navigation = useNavigation();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();


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

  const handleSubmit = async () => {
    if (password === '' || email === '') {
      Alert.alert('Error', 'Please enter all required credentials.');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      console.log("login error:", error);
      Alert.alert('Login Failed', 'Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={tailwind`flex-1 bg-white`}
    >
      {loading && <Loader message="Authenticating..." />}

      <ScrollView contentContainerStyle={tailwind`flex-grow`} bounces={false}>
        <View style={tailwind`w-full flex-1 relative bg-white`}>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={tailwind`absolute left-4 top-12 z-20 bg-black/20 p-2 rounded-full`}
          >
            <ChevronLeftIcon size={30} color={'white'} strokeWidth={2.5} />
          </TouchableOpacity>

          {/* Top Banner Section */}
          <View style={tailwind`h-[35%] bg-amber-500 justify-center items-center rounded-b-[60px] shadow-lg`}>
            <Image
              source={require('../../assets/avtar.png')}
              style={tailwind`h-48 w-48 mb-4`}
              resizeMode="contain"
            />

          </View>

          {/* Form Card Section */}
          <Animated.View
            style={[
              tailwind`bg-white w-[90%] self-center -mt-10 p-8 rounded-[40px] shadow-2xl border border-gray-100`,
              cardStyle,
            ]}
          >
            <Text style={tailwind`text-2xl font-bold text-gray-800 mb-6 text-center`}>Login to your Account</Text>

            <View style={tailwind`flex-row items-center bg-gray-50 rounded-2xl mb-4 px-4 border border-gray-200`}>
              <EnvelopeIcon size={20} color="gray" />
              <TextInput
                style={tailwind`flex-1 py-4 ml-3 text-gray-700`}
                placeholder="Email Address"
                placeholderTextColor={'gray'}
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
            </View>

            <View style={tailwind`flex-row items-center bg-gray-50 rounded-2xl mb-6 px-4 border border-gray-200`}>
              <LockClosedIcon size={20} color="gray" />
              <TextInput
                style={tailwind`flex-1 py-4 ml-3 text-gray-700`}
                placeholder="Password"
                placeholderTextColor={'gray'}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <TouchableOpacity
              style={tailwind`bg-amber-500 shadow-lg shadow-amber-400 py-4 rounded-2xl items-center mb-6`}
              onPress={handleSubmit}
              disabled={loading}
            >
              <Text style={tailwind`text-white text-xl font-bold`}>Login</Text>
            </TouchableOpacity>

            <View style={tailwind`flex-row justify-center items-center`}>
              <Text style={tailwind`text-gray-500`}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={tailwind`text-amber-500 font-bold underline`}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>

          {/* Bottom Branding Section */}
          <View style={tailwind`flex-1 justify-end items-center pb-8`}>
            <Animated.View style={[tailwind`items-center`, textStyle]}>
              <Text style={tailwind`text-amber-500 text-4xl font-black italic`}>
                CookBook
              </Text>
              <Text style={tailwind`text-gray-400 text-sm tracking-widest mt-1`}>
                BEST RECIPES WORLDWIDE
              </Text>
            </Animated.View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;

