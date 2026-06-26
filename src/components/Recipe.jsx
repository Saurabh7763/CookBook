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

  return (
    <View style={tailwind`mx-4 mt-1 flex-1`}>
      <View style={tailwind`flex-1 mt-2`}>
        {recipeLoading ? (
          <ActivityIndicator
            size="large"
            color="#ffa62a"
            style={tailwind`mt-10`}
          />
        ) : recipe.length === 0 ? (
          <View style={tailwind`flex justify-center items-center mt-5`}>
            <Text style={tailwind`text-2xl text-neutral-600 font-semibold`}>
              No recipe found
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
                <Text style={tailwind`text-2xl font-black text-gray-800 mt-2 mb-4`}>
                    Special Recipes
                </Text>
            )}
          />
        )}
      </View>
    </View>
  );
};

export default Recipe;

