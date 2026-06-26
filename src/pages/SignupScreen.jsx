import { View, Text, TextInput, Image, TouchableOpacity, Alert, StatusBar, ActivityIndicator, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import tailwind from 'twrnc';
import { ChevronLeftIcon, EnvelopeIcon, LockClosedIcon, UserIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { updateProfile } from 'firebase/auth';

const Signup = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const { theme, themeStyles } = useTheme();

  const cardTranslateY = useSharedValue(50);
  const cardOpacity = useSharedValue(0);

  useEffect(() => {
    cardTranslateY.value = withSpring(0);
    cardOpacity.value = withTiming(1, { duration: 800 });
  }, []);

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: cardTranslateY.value }],
    opacity: cardOpacity.value,
  }));

  const handleSubmit = async () => {
    if (name === '' || password === '' || email === '') {
      Alert.alert('Error', 'Please enter all required credentials.');
      return;
    }

    setLoading(true);
    try {
      const userCredential = await signup(email, password);
      if (userCredential && userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: name,
        });
      }
    } catch (error) {
      console.log("signup error:", error);
      Alert.alert('Signup Failed', error.message || 'An error occurred during signup.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={tailwind`flex-1 ${themeStyles.background}`}>
      <StatusBar barStyle={themeStyles.statusBar} />
      <KeyboardAwareScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 48, paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={true}
        extraScrollHeight={Platform.OS === 'android' ? 80 : 20}
        enableAutomaticScroll={true}
        bounces={false}
      >


        {/* Top Illustration Box */}
        <View style={tailwind`items-center mb-8`}>
          <View style={tailwind`${theme === 'light' ? 'bg-amber-100' : 'bg-slate-800'} p-5 rounded-[40px] shadow-sm`}>
            <Image
              source={require('../../assets/avtar.png')}
              style={{ width: 120, height: 120 }}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Welcome Text Section */}
        <View style={tailwind`mb-8`}>
          <Text style={tailwind`text-4xl font-black ${themeStyles.text} leading-tight`}>
            Join the {"\n"}<Text style={tailwind`text-amber-500`}>Family</Text> today.
          </Text>
          <Text style={tailwind`${themeStyles.subText} mt-2 text-lg font-medium`}>
            Start sharing your secret recipes.
          </Text>
        </View>

        {/* Card Form */}
        <Animated.View style={cardStyle}>
          <View style={tailwind`relative mb-4`}>
            <View style={tailwind`absolute left-4 top-4.5 z-10`}>
              <UserIcon size={20} color={theme === 'light' ? "#6b7280" : "#94a3b8"} />
            </View>
            <TextInput
              placeholder="Full Name"
              placeholderTextColor={theme === 'light' ? "#9ca3af" : "#64748b"}
              value={name}
              onChangeText={setName}
              style={tailwind`${theme === 'light' ? 'bg-gray-50' : 'bg-slate-900'} ${themeStyles.text} pl-12 pr-4 py-4 rounded-2xl border ${theme === 'light' ? 'border-gray-100' : 'border-slate-800'} font-medium`}
              autoCapitalize="words"
            />
          </View>

          <View style={tailwind`relative mb-4`}>
            <View style={tailwind`absolute left-4 top-4.5 z-10`}>
              <EnvelopeIcon size={20} color={theme === 'light' ? "#6b7280" : "#94a3b8"} />
            </View>
            <TextInput
              placeholder="Email Address"
              placeholderTextColor={theme === 'light' ? "#9ca3af" : "#64748b"}
              value={email}
              onChangeText={setEmail}
              style={tailwind`${theme === 'light' ? 'bg-gray-50' : 'bg-slate-900'} ${themeStyles.text} pl-12 pr-4 py-4 rounded-2xl border ${theme === 'light' ? 'border-gray-100' : 'border-slate-800'} font-medium`}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={tailwind`relative mb-6`}>
            <View style={tailwind`absolute left-4 top-4.5 z-10`}>
              <LockClosedIcon size={20} color={theme === 'light' ? "#6b7280" : "#94a3b8"} />
            </View>
            <TextInput
              placeholder="Password"
              placeholderTextColor={theme === 'light' ? "#9ca3af" : "#64748b"}
              value={password}
              onChangeText={setPassword}
              style={tailwind`${theme === 'light' ? 'bg-gray-50' : 'bg-slate-900'} ${themeStyles.text} pl-12 pr-4 py-4 rounded-2xl border ${theme === 'light' ? 'border-gray-100' : 'border-slate-800'} font-medium`}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            onPress={handleSubmit}
            disabled={loading}
            style={tailwind`bg-amber-500 py-4 rounded-3xl flex-row justify-center items-center`}
          >
            {loading ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Text style={tailwind`text-white text-center text-lg font-black tracking-wide`}>
                Create My Account
              </Text>
            )}
          </TouchableOpacity>

          <View style={tailwind`flex-row justify-center mt-8 mb-4`}>
            <Text style={tailwind`${themeStyles.subText} font-medium`}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={tailwind`text-amber-600 font-black`}>Login Instead</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Signup;
