import React, { useContext } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { FlashList } from "@shopify/flash-list";
import tailwind from "twrnc";
import Card from "./Card";
import { RecipeContext } from "../context/RecipeContext";
import { useNavigation } from "@react-navigation/native";

const Recipe = () => {
  const { recipe, recipeLoading } = useContext(RecipeContext);
  const navigation = useNavigation();

  return (
    <View style={tailwind`mx-4 mt-1 flex-1`}>
      <Text style={tailwind`text-xl font-bold text-neutral-500 mt-1 mb-1`}>
        Recipes
      </Text>

      <View style={tailwind` flex-1 mt-2`}>
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
          <FlashList
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
          />
        )}
      </View>
    </View>
  );
};

export default Recipe;
