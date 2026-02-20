import React, { useState, useEffect, useContext } from "react";
import {
  View,
  TextInput,
  ActivityIndicator,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import tailwind from "twrnc";
import Header from "../components/Header";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import Recipe from "../components/Recipe";
import axios from "axios";
import { RecipeContext } from "../context/RecipeContext";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  withSpring,
} from "react-native-reanimated";

const HomeScreen = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("pasta");
  const [searchQuery, setSearchQuery] = useState("");
  const { fetchRecipe } = useContext(RecipeContext);
  const categoryTranslateY = useSharedValue(50);
  const categoryOpacity = useSharedValue(0);
  const recipeTranslateY = useSharedValue(50);
  const recipeOpacity = useSharedValue(0);

  
  const animateCategories = () => {
    categoryTranslateY.value = withSpring(0, { damping: 12, stiffness: 100 });
    categoryOpacity.value = withTiming(1, {
      duration: 800,
      easing: Easing.out(Easing.exp),
    });
  };

  
  const animateRecipes = () => {
    recipeTranslateY.value = 50;
    recipeOpacity.value = 0;
    recipeTranslateY.value = withSpring(0, { damping: 12, stiffness: 100 });
    recipeOpacity.value = withTiming(1, {
      duration: 600,
      easing: Easing.out(Easing.exp),
    });
  };

 
  const categoriesAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: categoryTranslateY.value }],
    opacity: categoryOpacity.value,
  }));

  const recipeAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: recipeTranslateY.value }],
    opacity: recipeOpacity.value,
  }));


  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      setCategories(response.data.categories);
    } catch (error) {
      console.log("Error fetching categories:", error);
    } finally {
      setLoading(false);
      animateCategories(); 
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`
      );
      if (response.data.meals) {
        fetchRecipe(null, response.data.meals);
      } else {
        fetchRecipe(null, []);
      }
      animateRecipes(); 
    } catch (error) {
      console.log("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    fetchCategories();
    fetchRecipe(activeCategory);
    animateRecipes();
  }, []);

  
  useEffect(() => {
    if (searchQuery.trim() === "") {
      fetchRecipe(activeCategory);
      animateRecipes(); 
    }
  }, [activeCategory]);

  return (
    <View style={tailwind`flex-1 bg-white`}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

    
      <Header />

     
      <View style={tailwind`mx-3 my-2`}>
        <View
          style={tailwind`relative flex-row items-center bg-black/5 rounded-full`}
        >
          <TextInput
            style={tailwind`px-4 flex-1`}
            placeholder="Find your next meal…"
            placeholderTextColor="gray"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          <TouchableOpacity
            style={tailwind`absolute right-1 bg-white p-2 mr-2 rounded-full`}
            onPress={handleSearch}
          >
            <MagnifyingGlassIcon size={20} color="gray" />
          </TouchableOpacity>
        </View>
      </View>

     
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#ffa62a"
          style={tailwind`mt-10`}
        />
      ) : (
        <>
          
          <Animated.View style={[categoriesAnimatedStyle]}>
            <Categories
              itemData={categories}
              isActive={activeCategory}
              setIsActive={setActiveCategory}
            />
          </Animated.View>

          <Animated.View style={[tailwind`flex-1 pb-16`, recipeAnimatedStyle]}>
            <Recipe />
          </Animated.View>
        </>
      )}
    </View>
  );
};

export default HomeScreen;
