import React, { useState, useEffect, useContext } from "react";
import {
  View,
  TextInput,
  ActivityIndicator,
  StatusBar,
  TouchableOpacity,
  Text,
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
  useAnimatedScrollHandler,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";

const HomeScreen = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Dessert");
  const [searchQuery, setSearchQuery] = useState("");
  const { fetchRecipe } = useContext(RecipeContext);

  const scrollY = useSharedValue(0);

  // Animations from existing code for original entrance
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

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerTranslateStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [0, 240], // Threshold for header + search
      [0, -240],
      Extrapolate.CLAMP
    );
    return {
      transform: [{ translateY }],
      opacity: interpolate(scrollY.value, [0, 150], [1, 0], Extrapolate.CLAMP),
    };
  });

  const stickyCategoryStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [0, 240],
      [0, -240],
      Extrapolate.CLAMP
    );
    return {
      transform: [{ translateY }],
      backgroundColor: scrollY.value > 240 ? 'white' : 'transparent',
      paddingBottom: scrollY.value > 240 ? 10 : 0,
      borderBottomWidth: scrollY.value > 240 ? 1 : 0,
      borderBottomColor: '#f3f4f6',
    };
  });

  const categoriesAnimatedEntrance = useAnimatedStyle(() => ({
    opacity: categoryOpacity.value,
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
    setActiveCategory(null);
    setLoading(true);
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(searchQuery)}`
      );
      fetchRecipe(null, response.data.meals || []);
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
  }, [activeCategory, searchQuery]);

  return (
    <View style={tailwind`flex-1 bg-white`}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* This container holds the scrollable header parts */}
      <View style={tailwind`absolute top-0 left-0 right-0 z-20`}>
        <Animated.View style={headerTranslateStyle}>
            <Header />
            <View style={tailwind`mx-4 my-2`}>
                <View style={tailwind`relative flex-row items-center bg-gray-100 rounded-2xl border border-gray-200 px-4 py-1`}>
                    <MagnifyingGlassIcon size={20} color="gray" />
                    <TextInput
                        style={tailwind`flex-1 ml-2 py-2 text-gray-700`}
                        placeholder="Search for any recipe..."
                        placeholderTextColor="gray"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        onSubmitEditing={handleSearch}
                        returnKeyType="search"
                    />
                </View>
            </View>
        </Animated.View>

        {/* Sticky Categories Bar */}
        <Animated.View style={[stickyCategoryStyle, categoriesAnimatedEntrance]}>
          <Categories
            itemData={categories}
            isActive={activeCategory}
            setIsActive={(category) => {
              setActiveCategory(category);
              setSearchQuery("");
            }}
          />
        </Animated.View>
      </View>

      {loading ? (
        <View style={tailwind`flex-1 justify-center items-center`}>
           <ActivityIndicator size="large" color="#ffa62a" />
        </View>
      ) : (
        <Recipe 
            onScroll={scrollHandler} 
            contentContainerStyle={{ paddingTop: 340 }} // Space for Header (180) + Search (60) + Categories (100)
        />
      )}
    </View>
  );
};

export default HomeScreen;

