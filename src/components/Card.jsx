import React from "react";
import { View, Text, Image, Pressable, TouchableOpacity } from "react-native";
import tailwind from "twrnc";

const Card = ({ meal, index, onPress }) => {
  const isLarge = index % 4 === 0 || index % 4 === 3;
  return (
    <TouchableOpacity
      style={tailwind`bg-white w-full overflow-hidden mb-3 px-1`}
      onPress={onPress}
    >
      <View style={tailwind`bg-white rounded-xl shadow-sm border border-neutral-100 overflow-hidden`}>
        <Image
          source={{ uri: meal.strMealThumb }}
          style={tailwind`w-full h-${isLarge ? '80' : '52'}`}
          resizeMode="cover"
        />
        <View style={tailwind`px-2 py-2`}>
          <Text style={tailwind`text-sm text-neutral-600 font-bold`}>
            {meal.strMeal.length > 20 ? meal.strMeal.slice(0, 20) + '...' : meal.strMeal}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;
