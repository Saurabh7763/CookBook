import React, { useState, useEffect, useContext } from "react";
import {
  View,
  TextInput,
  ActivityIndicator,
  StatusBar,
  TouchableOpacity,
  Text,
  Platform,
  StyleSheet,
} from "react-native";

import tailwind from "twrnc";
import Header from "../components/Header";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import Recipe from "../components/Recipe";
import axios from "axios";
import { RecipeContext } from "../context/RecipeContext";
import { useTheme } from "../context/ThemeContext";
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
import Loader from "../components/Loader";

const STATUS_BAR_HEIGHT = Platform.OS === 'android' ? StatusBar.currentHeight : 44;
const HEADER_TOTAL_HEIGHT = 240; // Estimated height of Header + SearchBar

const HomeScreen = () => {
  const { theme, themeStyles } = useTheme();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Dessert");
  const [searchQuery, setSearchQuery] = useState("");
  const { fetchRecipe, recipeLoading } = useContext(RecipeContext);

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

  const headerOpacityStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [0, 100], [1, 0], Extrapolate.CLAMP),
    transform: [{ 
      scale: interpolate(scrollY.value, [0, 100], [1, 0.9], Extrapolate.CLAMP) 
    }],
  }));

  const stickyCategoryStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [0, HEADER_TOTAL_HEIGHT],
      [0, -HEADER_TOTAL_HEIGHT],
      Extrapolate.CLAMP
    );
    return {
      transform: [{ translateY }],
      backgroundColor: theme === 'light' ? 'white' : '#0f172a',
      borderBottomWidth: scrollY.value > HEADER_TOTAL_HEIGHT ? 1 : 0,
      borderBottomColor: theme === 'light' ? '#f3f4f6' : '#1e293b',
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
    <View style={tailwind`flex-1 ${themeStyles.background}`}>
      <StatusBar barStyle={themeStyles.statusBar} backgroundColor="transparent" translucent={true} />

      {(loading || recipeLoading) && (
        <View style={[StyleSheet.absoluteFillObject, { zIndex: 100 }]}>
          <Loader message="Preparing your kitchen..." />
        </View>
      )}

      {/* Persistent background for Status Bar area */}
      <View style={[
        tailwind`absolute top-0 left-0 right-0 z-30`,
        {
          height: STATUS_BAR_HEIGHT,
          backgroundColor: theme === 'light' ? 'white' : '#0f172a'
        }
      ]} />

      {/* Sticky Header Section */}
      <Animated.View style={[
          tailwind`absolute top-0 left-0 right-0 z-20`,
          stickyCategoryStyle,
          { height: HEADER_TOTAL_HEIGHT + STATUS_BAR_HEIGHT + 80 } // Fixed height for consistency
      ]}>
          <View style={{ paddingTop: STATUS_BAR_HEIGHT + 15 }}>
              <Animated.View style={headerOpacityStyle}>
                <Header />
              </Animated.View>
              
              {/* Search Bar */}
              <View style={tailwind`mx-4 my-2`}>
                <View style={tailwind`relative flex-row items-center ${theme === 'light' ? 'bg-gray-100' : 'bg-slate-800'} rounded-2xl border ${theme === 'light' ? 'border-gray-200' : 'border-slate-700'} px-4 py-1.5`}>
                  <MagnifyingGlassIcon size={20} color={theme === 'light' ? "gray" : "#94a3b8"} strokeWidth={2} />
                  <TextInput
                    placeholder="Search for any recipe..."
                    placeholderTextColor={theme === 'light' ? "gray" : "#64748b"}
                    style={tailwind`flex-1 ml-2 text-base font-medium ${themeStyles.text}`}
                    value={searchQuery}
                    onChangeText={(text) => {
                      setSearchQuery(text);
                      if (text === "") {
                        fetchRecipe(activeCategory);
                      }
                    }}
                    onSubmitEditing={handleSearch}
                    returnKeyType="search"
                  />
                </View>
              </View>

              <Categories
                itemData={categories}
                isActive={activeCategory}
                setIsActive={(category) => {
                  setActiveCategory(category);
                  setSearchQuery("");
                }}
              />
          </View>
      </Animated.View>

      <Recipe
        onScroll={scrollHandler}
        contentContainerStyle={{ 
            paddingTop: HEADER_TOTAL_HEIGHT + STATUS_BAR_HEIGHT + 80, // Enough space for sticky section
            paddingBottom: 20 
        }}
      />
    </View>
  );
};

export default HomeScreen;
