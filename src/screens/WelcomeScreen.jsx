import React, { useEffect } from "react";
import { View, Text, Image } from "react-native";
import tailwind from "twrnc";
import { useNavigation } from "@react-navigation/native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "../context/ThemeContext";

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const { theme, themeStyles } = useTheme();


  const ring1padding = useSharedValue(0);
  const ring2padding = useSharedValue(0);
  const text1TranslateY = useSharedValue(30);
  const text2TranslateY = useSharedValue(30);
  const text1Opacity = useSharedValue(0);
  const text2Opacity = useSharedValue(0);


  useEffect(() => {
    text1TranslateY.value = withSpring(0, { damping: 12, stiffness: 100 });
    text1Opacity.value = withTiming(1, {
      duration: 800,
      easing: Easing.out(Easing.exp),
    });

    setTimeout(() => {
      text2TranslateY.value = withSpring(0, { damping: 12, stiffness: 100 });
      text2Opacity.value = withTiming(1, {
        duration: 800,
        easing: Easing.out(Easing.exp),
      });
    }, 200);
  }, []);


  const text1AnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: text1TranslateY.value }],
    opacity: text1Opacity.value,
  }));

  const text2AnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: text2TranslateY.value }],
    opacity: text2Opacity.value,
  }));


  useEffect(() => {
    ring1padding.value = 0;
    ring2padding.value = 0;

    setTimeout(() => {
      ring1padding.value = withSpring(40);
    }, 100);
    setTimeout(() => {
      ring2padding.value = withSpring(40);
    }, 300);

    const timer = setTimeout(() => navigation.navigate("Signup"), 2500);
    return () => clearTimeout(timer);
  }, []);

  const ring1Style = useAnimatedStyle(() => ({
    padding: ring1padding.value,
  }));

  const ring2Style = useAnimatedStyle(() => ({
    padding: ring2padding.value,
  }));

  return (
    <View style={tailwind`flex-1 justify-center items-center ${theme === 'light' ? 'bg-amber-500' : 'bg-slate-950'}`}>
      <Animated.View
        style={[tailwind`${theme === 'light' ? 'bg-white/20' : 'bg-slate-800/40'} rounded-full my-5`, ring2Style]}
      >
        <Animated.View style={[tailwind`rounded-full ${theme === 'light' ? 'bg-white/20' : 'bg-slate-700/40'}`, ring1Style]}>
          <Image
            source={require("../../assets/avtar.png")}
            style={tailwind`h-48 w-48 rounded-full ${theme === 'light' ? 'bg-white' : 'bg-slate-900'}`}
            resizeMode="cover"
          />
        </Animated.View>
      </Animated.View>

      <Animated.Text
        style={[
          tailwind`text-white text-6xl font-bold mb-3 tracking-widest`,
          text1AnimatedStyle,
        ]}
      >
        CookBook
      </Animated.Text>

      <Animated.Text
        style={[
          tailwind`text-amber-100/80 text-lg tracking-widest font-medium`,
          text2AnimatedStyle,
        ]}
      >
        From our kitchen to yours 🍽️
      </Animated.Text>
    </View>
  );
};

export default WelcomeScreen;
