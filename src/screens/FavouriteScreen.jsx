import React, { useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import { FlashList } from "@shopify/flash-list";
import tailwind from "twrnc";
import { RecipeContext } from "../context/RecipeContext";
import { useTheme } from "../context/ThemeContext";
import Card from "../components/Card";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";

const FavouriteScreen = ({ navigation }) => {
  const { favourites } = useContext(RecipeContext);
  const { theme, themeStyles } = useTheme();
  const translateY = useSharedValue(50)
  const opacity = useSharedValue(0)

  useEffect(() => {
    translateY.value = withSpring(0, {
      damping: 12,
      stiffness: 100
    })
    opacity.value = withTiming(1, {
      duration: 800,
      easing: Easing.out(Easing.exp)
    })
  }, [])

  const favouriteAnimatedScreen = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value
  }))

  return (
    <View style={tailwind`flex-1 ${themeStyles.background} pt-12 px-4`}>
      <StatusBar barStyle={themeStyles.statusBar} />
      <View style={tailwind`flex-row items-center mb-6`}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tailwind`${theme === 'light' ? 'bg-gray-100' : 'bg-slate-800'} p-2 rounded-2xl mr-4`}
        >
          <ChevronLeftIcon size={24} color={theme === 'light' ? "#374151" : "#f3f4f6"} strokeWidth={3} />
        </TouchableOpacity>
        <Text style={tailwind`text-2xl ${themeStyles.text} font-black`}>
          Your Favourites
        </Text>
      </View>

      {favourites.length === 0 ? (
        <View style={tailwind`flex-1 justify-center items-center pb-20`}>
           <Text
            style={tailwind`text-xl font-bold ${themeStyles.subText} text-center`}
          >
            No favourites yet ❤️
          </Text>
          <Text style={tailwind`text-sm ${themeStyles.subText} text-center mt-2 px-10`}>
            Explore recipes and tap the heart icon to save them here!
          </Text>
        </View>
      ) : (
        <Animated.View style={[tailwind`mt-2 flex-1`, favouriteAnimatedScreen]}>
          <FlashList
            masonry
            data={favourites}
            keyExtractor={(item) => item.idMeal}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <Card
                meal={item}
                index={index}
                onPress={() =>
                  navigation.navigate("RecipeDetails", { meal: item })
                }
              />
            )}
            contentContainerStyle={tailwind`pb-20`}
            estimatedItemSize={250}
          />
        </Animated.View>
      )
      }

    </View>
  );
};

export default FavouriteScreen;
