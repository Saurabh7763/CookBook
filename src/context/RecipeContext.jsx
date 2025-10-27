import React, { useState, useEffect, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [recipe, setRecipe] = useState([]);
  const [recipeLoading, setRecipeLoading] = useState(false);
  const [favourites, setFavourites] = useState([]);

  const fetchRecipe = async (category = "Beef") => {
    try {
      setRecipeLoading(true);
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      setRecipe(response.data.meals || []);
    } catch (error) {
      console.log("Error fetching recipe:", error);
      setRecipe([]);
    } finally {
      setRecipeLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  
  const addToFavourites = async (meal) => {
    setFavourites((prev) => {
      if (!prev.some((fav) => fav.idMeal === meal.idMeal)) {
        const updated = [...prev, meal];
        AsyncStorage.setItem("favourites", JSON.stringify(updated)); 
        return updated;
      }
      return prev;
    });
  };

  
  const removeFromFavourites = async (mealId) => {
    setFavourites((prev) => {
      const updated = prev.filter((fav) => fav.idMeal !== mealId);
      AsyncStorage.setItem("favourites", JSON.stringify(updated)); 
      return updated;
    });
  };

  
  const isFavourite = (mealId) => {
    return favourites.some((fav) => fav.idMeal === mealId);
  };

  
  useEffect(() => {
    const loadFavourites = async () => {
      try {
        const storedFavourites = await AsyncStorage.getItem("favourites");
        if (storedFavourites) {
          setFavourites(JSON.parse(storedFavourites));
        }
      } catch (error) {
        console.log("Error loading favourites:", error);
      }
    };
    loadFavourites();
  }, []);


  useEffect(() => {
    if (favourites && Array.isArray(favourites)) {
      AsyncStorage.setItem("favourites", JSON.stringify(favourites)).catch((error) =>
        console.log("Error saving favourites:", error)
      );
    }
  }, [favourites]);

  return (
    <RecipeContext.Provider
      value={{
        recipe,
        recipeLoading,
        fetchRecipe,
        addToFavourites,
        removeFromFavourites,
        isFavourite,
        favourites,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};
