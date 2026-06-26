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

  const headerTranslateStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [0, HEADER_TOTAL_HEIGHT],
      [0, -HEADER_TOTAL_HEIGHT],
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
      [0, HEADER_TOTAL_HEIGHT],
      [0, -(HEADER_TOTAL_HEIGHT - STATUS_BAR_HEIGHT - 10)], // Adjust by 10 to give breathing room
      Extrapolate.CLAMP
    );
    return {
      transform: [{ translateY }],
      backgroundColor: 'white',
      paddingTop: scrollY.value > HEADER_TOTAL_HEIGHT ? 6 : 0, 
      paddingBottom: scrollY.value > HEADER_TOTAL_HEIGHT ? 10 : 0,
      borderBottomWidth: scrollY.value > HEADER_TOTAL_HEIGHT ? 1 : 0,
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
      <StatusBar barStyle="dark-content" backgroundColor="white" translucent={true} />

      {(loading || recipeLoading) && (
        <View style={[StyleSheet.absoluteFillObject, { zIndex: 10 }]}>
           <Loader message="Cooking something delicious..." />
        </View>
      )}

      {/* Persistent White background for Status Bar area */}
      <View style={[
          tailwind`absolute top-0 left-0 right-0 z-30 bg-white`,
          { height: STATUS_BAR_HEIGHT }
      ]} />

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

      <Recipe 
          onScroll={scrollHandler} 
          contentContainerStyle={{ paddingTop: 340 }} // Space for Header + Search + Categories
      />
    </View>
  );
};

export default HomeScreen;


