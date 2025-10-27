import React from "react";
import { View, Text, Image, Pressable, TouchableOpacity } from "react-native";
import tailwind from "twrnc";

const Card = ({ meal, index, onPress }) => {
  return (
    <TouchableOpacity
      style={tailwind`bg-white w-[48%] overflow-hidden mr-3  mb-3`}
      onPress={onPress}
    >
      <Image
        source={{ uri: meal.strMealThumb }}
        style={tailwind`w-full h-50 shadow-md  rounded-xl`} 
        resizeMode="cover"
      />
      <View style={tailwind`px-2`}>
        <Text style={tailwind`text-sm text-neutral-500`}>
          {meal.strMeal.length>20? meal.strMeal.slice(0,20)+'...':meal.strMeal}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Card;
