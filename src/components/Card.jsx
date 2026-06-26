import React, { useContext } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import tailwind from "twrnc";
import { HeartIcon } from "react-native-heroicons/solid";
import { HeartIcon as HeartOutline } from "react-native-heroicons/outline";
import { RecipeContext } from "../context/RecipeContext";
import { useTheme } from "../context/ThemeContext";

const Card = ({ meal, index, onPress }) => {
  const isEven = index % 2 === 0;
  const { isFavourite, addToFavourites, removeFromFavourites } = useContext(RecipeContext);
  const { theme, themeStyles } = useTheme();
  
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
      <View style={tailwind`${themeStyles.card} rounded-[24px] shadow-sm border ${themeStyles.border} overflow-hidden`}>
        <View style={tailwind`relative`}>
          <Image
            source={{ uri: meal.strMealThumb }}
            style={[tailwind`w-full`, { height: index % 3 === 0 ? 240 : 180 }]}
            resizeMode="cover"
          />
          
          <TouchableOpacity
            onPress={toggleFavourite}
            style={tailwind`absolute top-3 right-3 ${theme === 'light' ? 'bg-white/80' : 'bg-slate-900/80'} p-1.5 rounded-full`}
          >
            {favourited ? (
              <HeartIcon size={20} color="#f59e0b" />
            ) : (
              <HeartOutline size={20} color={theme === 'light' ? "#374151" : "#94a3b8"} />
            )}
          </TouchableOpacity>
        </View>

        <View style={tailwind`p-3 pb-4`}>
          <Text style={tailwind`text-sm font-black ${themeStyles.text} leading-4 mb-1`}>
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

