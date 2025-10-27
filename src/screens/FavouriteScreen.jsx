import React, { useContext, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import tailwind from "twrnc";
import { RecipeContext } from "../context/RecipeContext";
import Card from "../components/Card";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";

const FavouriteScreen = ({ navigation }) => {
  const { favourites } = useContext(RecipeContext);
  const translateY = useSharedValue(50)
  const opacity = useSharedValue(0)

  useEffect(()=>{
    translateY.value = withSpring(0,{
      damping : 12,
      stiffness:100
    })
    opacity.value = withTiming(1, {
      duration : 800,
      easing : Easing.out(Easing.exp)
    })
  },[])

  const favouriteAnimatedScreen =  useAnimatedStyle(()=>({
          transform: [{translateY: translateY.value}],
          opacity: opacity.value
      }))

  return (
    <View style={tailwind`flex-1 bg-white pt-10 px-4`}>
      <View style={tailwind`flex-row items-center mb-3`}>
        <ChevronLeftIcon
          style={tailwind`mr-2`}
          size={30}
          strokeWidth={2.5}
          onPress={() => navigation.goBack()}
        />
        <Text style={tailwind`text-2xl text-neutral-600 font-bold`}>
          Favourite Recipes
        </Text>
      </View>

      {favourites.length === 0 ? (
        <Text
          style={tailwind`text-lg font-semibold text-neutral-500 text-center pt-16`}
        >
          No favourites yet ❤️
        </Text>
      ) : (
        <Animated.View style={[tailwind`mt-3`, favouriteAnimatedScreen]}>
        <FlatList
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
        />
        </Animated.View>
      )
      }
      
    </View>
  );
};

export default FavouriteScreen;
