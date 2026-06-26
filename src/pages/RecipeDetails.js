import { View, Text, Image, ScrollView, StatusBar, TouchableOpacity, Dimensions } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import tailwind from 'twrnc';
import { ChevronLeftIcon, ClockIcon, FireIcon, Square3Stack3DIcon } from "react-native-heroicons/outline";
import { HeartIcon, UserGroupIcon } from "react-native-heroicons/solid";
import { useNavigation } from '@react-navigation/native';
import YoutubeIframe from 'react-native-youtube-iframe';
import { RecipeContext } from "../context/RecipeContext";
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming, Easing, interpolate, useAnimatedScrollHandler } from 'react-native-reanimated';
import Loader from '../components/Loader';

const { width } = Dimensions.get('window');

const RecipeDetails = ({ route }) => {
  const { meal } = route.params;
  const [loading, setLoading] = useState(false)
  const [details, setDetails] = useState(null)
  const navigation = useNavigation()

  const opacity = useSharedValue(0);
  const scrollY = useSharedValue(0);

  const { addToFavourites, removeFromFavourites, isFavourite } = useContext(RecipeContext)
  const [fav, setFav] = useState(isFavourite(meal.idMeal));

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 500 });
    getRecipeDetails();
  }, []);

  const toggleFavourite = () => {
    if (fav) {
      removeFromFavourites(meal.idMeal)
    } else {
      addToFavourites(meal)
    }
    setFav(!fav)
  }

  const getIngredients = (details) => {
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = details[`strIngredient${i}`]
      const measure = details[`strMeasure${i}`]
      if (ingredient && ingredient.trim() !== "") {
        ingredients.push({ ingredient, measure });
      }
    }
    return ingredients;
  }

  const getRecipeDetails = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`)
      setDetails(response.data.meals[0])
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const getYoutubeVideoId = url => {
    const regex = /[?&]v=([^&]+)/;
    const match = url.match(regex);
    return match && match[1] ? match[1] : null;
  }

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const imageAnimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollY.value,
      [-100, 0, 100],
      [1.2, 1, 1],
      'clamp'
    );
    return {
      transform: [{ scale }]
    };
  });

  if (loading || !details) {
    return <Loader message="Preparing your secret recipe..." />;
  }

  return (
    <View style={tailwind`flex-1 bg-white`}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      <Animated.ScrollView 
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        style={tailwind`flex-1`}
      >
        {/* Header Image */}
        <View style={tailwind`relative`}>
          <Animated.View style={[tailwind`w-full h-100`, imageAnimatedStyle]}>
            <Image
              source={{ uri: details.strMealThumb }}
              style={tailwind`w-full h-full`}
              resizeMode="cover"
            />
          </Animated.View>
        </View>

        {/* Content Card */}
        <View style={[tailwind`bg-white -mt-10 rounded-t-[40px] px-6 pt-8 pb-10 shadow-2xl`]}>
          {/* Title & Area */}
          <View style={tailwind`flex-row justify-between items-start mb-6`}>
            <View style={tailwind`flex-1 mr-4`}>
              <Text style={tailwind`text-3xl font-black text-gray-900 leading-tight`}>
                {details.strMeal}
              </Text>
              <Text style={tailwind`text-amber-600 font-bold text-sm uppercase tracking-widest mt-1`}>
                {details.strArea} Cuisine
              </Text>
            </View>
          </View>

          {/* Quick Info Cards */}
          <View style={tailwind`flex-row justify-between mb-8`}>
            <InfoCard icon={<ClockIcon size={24} color="#f59e0b" />} value="35" label="Min" />
            <InfoCard icon={<UserGroupIcon size={24} color="#f59e0b" />} value="03" label="Serves" />
            <InfoCard icon={<FireIcon size={24} color="#f59e0b" />} value="105" label="Cal" />
            <InfoCard icon={<Square3Stack3DIcon size={24} color="#f59e0b" />} value="Easy" label="Level" />
          </View>

          {/* Ingredients */}
          <View style={tailwind`mb-8`}>
            <Text style={tailwind`text-2xl font-black text-gray-800 mb-4`}>Ingredients</Text>
            <View style={tailwind`bg-amber-50/50 rounded-3xl p-4`}>
               {getIngredients(details).map((item, index) => (
                <View key={index} style={tailwind`flex-row items-center border-b border-amber-100/50 py-3 last:border-0`}>
                  <View style={tailwind`w-2 h-2 rounded-full bg-amber-400 mr-3`} />
                  <Text style={tailwind`text-gray-700 font-bold text-base flex-1`}>{item.ingredient}</Text>
                  <Text style={tailwind`text-amber-700 font-black text-sm`}>{item.measure}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Instructions */}
          <View style={tailwind`mb-8`}>
            <Text style={tailwind`text-2xl font-black text-gray-800 mb-4`}>Instructions</Text>
            <View style={tailwind`bg-gray-50 rounded-3xl p-6`}>
              <Text style={tailwind`text-gray-600 leading-7 text-base italic`}>
                {details.strInstructions}
              </Text>
            </View>
          </View>

          {/* Video Section */}
          {details.strYoutube && (
            <View style={tailwind`mt-4 mb-10`}>
              <Text style={tailwind`text-2xl font-black text-gray-800 mb-4`}>Recipe Video</Text>
              <View style={tailwind`rounded-[32px] overflow-hidden shadow-lg bg-black`}>
                <YoutubeIframe
                  videoId={getYoutubeVideoId(details.strYoutube)}
                  height={220}
                />
              </View>
            </View>
          )}
        </View>
      </Animated.ScrollView>

      {/* Floating Buttons Holder - Logic to keep them fixed but separate */}
      <View style={tailwind`absolute top-12 left-0 right-0 px-6 flex-row justify-between items-center z-50`}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={tailwind`bg-white/90 p-3 rounded-2xl shadow-lg border border-white`}
        >
          <ChevronLeftIcon size={24} color="#1f2937" strokeWidth={3} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={toggleFavourite}
          style={tailwind`bg-white/90 p-3 rounded-2xl shadow-lg border border-white`}
        >
          <HeartIcon size={24} color={fav ? "#ef4444" : "#9ca3af"} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const InfoCard = ({ icon, value, label }) => (
  <View style={tailwind`bg-amber-100/50 items-center justify-center rounded-[28px] w-[21%] py-4 border border-amber-200/30`}>
    <View style={tailwind`bg-white p-2 rounded-2xl mb-2 shadow-sm`}>
      {icon}
    </View>
    <Text style={tailwind`text-gray-900 font-black text-base`}>{value}</Text>
    <Text style={tailwind`text-gray-500 font-bold text-[10px] uppercase`}>{label}</Text>
  </View>
);

export default RecipeDetails;