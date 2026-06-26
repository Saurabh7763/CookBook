import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withRepeat, 
  withTiming, 
  withSequence,
  Easing
} from 'react-native-reanimated';
import { HeartIcon } from 'react-native-heroicons/solid';
import tailwind from 'twrnc';

const Loader = ({ message = "Cooking something delicious..." }) => {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);

  React.useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 1500, easing: Easing.linear }),
      -1,
      false
    );
    scale.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 800 }),
        withTiming(1, { duration: 800 })
      ),
      -1,
      true
    );
  }, []);

  const animatedIconStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${rotation.value}deg` },
        { scale: scale.value }
      ],
    };
  });

  return (
    <View style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(255, 255, 255, 0.7)' }, tailwind`justify-center items-center`]}>
      <View style={tailwind`bg-white p-8 rounded-3xl items-center shadow-2xl border border-gray-100`}>
        <Animated.View style={animatedIconStyle}>
          <View style={tailwind`bg-amber-100 p-4 rounded-full`}>
            <HeartIcon size={50} color="#f59e0b" />
          </View>
        </Animated.View>
        <Text style={tailwind`mt-4 text-amber-900 font-bold text-lg text-center`}>
          {message}
        </Text>
        <View style={tailwind`flex-row mt-4 space-x-1`}>
            {[0, 1, 2].map((i) => (
                <Dot key={i} delay={i * 200} />
            ))}
        </View>
      </View>
    </View>
  );
};

const Dot = ({ delay }) => {
    const opacity = useSharedValue(0.3);
    
    React.useEffect(() => {
        opacity.value = withRepeat(
            withSequence(
                withTiming(1, { duration: 600 }),
                withTiming(0.3, { duration: 600 })
            ),
            -1,
            true
        );
    }, []);

    const style = useAnimatedStyle(() => ({
        opacity: opacity.value
    }));

    return (
        <Animated.View style={[tailwind`w-2 h-2 rounded-full bg-amber-500 mx-1`, style]} />
    );
};

export default Loader;
