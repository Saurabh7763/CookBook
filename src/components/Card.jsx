import React, { useContext } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import tailwind from "twrnc";
import { HeartIcon } from "react-native-heroicons/solid";
import { HeartIcon as HeartOutline } from "react-native-heroicons/outline";
import { RecipeContext } from "../context/RecipeContext";

const Card = ({ meal, index, onPress }) => {
  const isEven = index % 2 === 0;
  const { isFavourite, addToFavourites, removeFromFavourites } = useContext(RecipeContext);
  
  const favourited = isFavourite(meal.idMeal);

  const toggleFavourite = (e) => {
    // Prevent trigger parent onPress
    if (favourited) {
      removeFromFavourites(meal.idMeal);
    } else {
      addToFavourites(meal);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={tailwind`mb-4 px-2`}
      onPress={onPress}
    >
      <View style={tailwind`bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden`}>
        <View style={tailwind`relative`}>
          <Image
            source={{ uri: meal.strMealThumb }}
            style={[tailwind`w-full`, { height: index % 3 === 0 ? 240 : 180 }]}
            resizeMode="cover"
          />
          
          <TouchableOpacity
            onPress={toggleFavourite}
            style={tailwind`absolute top-3 right-3 bg-white/80 p-1.5 rounded-full`}
          >
            {favourited ? (
              <HeartIcon size={20} color="#f59e0b" />
            ) : (
              <HeartOutline size={20} color="#374151" />
            )}
          </TouchableOpacity>
        </View>

        <View style={tailwind`p-3 pb-4`}>
          <Text style={tailwind`text-sm font-black text-gray-800 leading-4 mb-1`}>
            {meal.strMeal}
          </Text>
          <View style={tailwind`flex-row items-center`}>
              <Text style={tailwind`text-[10px] text-amber-600 font-bold uppercase tracking-wider`}>
                 Delicious Recipe
              </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

