import React, { useContext } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { FlashList } from "@shopify/flash-list";
import tailwind from "twrnc";
import Card from "./Card";
import { RecipeContext } from "../context/RecipeContext";
import { useNavigation } from "@react-navigation/native";
import Animated from 'react-native-reanimated';

const AnimatedFlashList = Animated.createAnimatedComponent(FlashList);

const Recipe = ({ onScroll, scrollEventThrottle = 16, contentContainerStyle }) => {
  const { recipe, recipeLoading } = useContext(RecipeContext);
  const navigation = useNavigation();

  if (recipeLoading) return null;

  return (
    <View style={tailwind`mx-2 flex-1`}>
      <View style={tailwind`flex-1`}>
        {recipe.length === 0 ? (
          <View style={tailwind`flex justify-center items-center mt-20`}>
            <Text style={tailwind`text-xl text-gray-400 font-medium`}>
              No recipes found yet...
            </Text>
          </View>
        ) : (
          <AnimatedFlashList
            masonry
            data={recipe}
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
            onEndReachedThreshold={0.1}
            estimatedItemSize={250}
            onScroll={onScroll}
            scrollEventThrottle={scrollEventThrottle}
            contentContainerStyle={contentContainerStyle}
            ListHeaderComponent={() => (
                <View style={tailwind`mb-4`}>
                    <Text style={tailwind`text-3xl font-black text-gray-800`}>
                        Special Recipes
                    </Text>
                    <Text style={tailwind`text-gray-500 font-medium text-sm mt-1 uppercase tracking-tighter`}>
                        {recipe.length} mouth-watering results
                    </Text>
                </View>
            )}
          />
        )}
      </View>
    </View>
  );
};

export default Recipe;

