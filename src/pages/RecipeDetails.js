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
import { useTheme } from "../context/ThemeContext";

const { width } = Dimensions.get('window');

const RecipeDetails = ({ route }) => {
    const { meal } = route.params;
    const [loading, setLoading] = useState(false)
    const [details, setDetails] = useState(null)
    const navigation = useNavigation()
    const { theme, themeStyles } = useTheme();

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
        <View style={tailwind`flex-1 ${themeStyles.background}`}>
            <StatusBar barStyle={themeStyles.statusBar} translucent backgroundColor="transparent" />

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
                <View style={[tailwind`${themeStyles.background} -mt-10 rounded-t-[40px] px-6 pt-8 pb-10 shadow-2xl`]}>
                    {/* Title & Area */}
                    <View style={tailwind`flex-row justify-between items-start mb-6`}>
                        <View style={tailwind`flex-1 mr-4`}>
                            <Text style={tailwind`text-3xl font-black ${themeStyles.text} leading-tight`}>
                                {details.strMeal}
                            </Text>
                            <Text style={tailwind`text-amber-600 font-bold text-sm uppercase tracking-widest mt-1`}>
                                {details.strArea} Cuisine
                            </Text>
                        </View>
                    </View>

                    {/* Quick Info Cards */}
                    <View style={tailwind`flex-row justify-between mb-8`}>
                        <InfoCard icon={<ClockIcon size={24} color="#f59e0b" />} value="35" label="Min" themeStyles={themeStyles} theme={theme} />
                        <InfoCard icon={<UserGroupIcon size={24} color="#f59e0b" />} value="03" label="Serves" themeStyles={themeStyles} theme={theme} />
                        <InfoCard icon={<FireIcon size={24} color="#f59e0b" />} value="105" label="Cal" themeStyles={themeStyles} theme={theme} />
                        <InfoCard icon={<Square3Stack3DIcon size={24} color="#f59e0b" />} value="Easy" label="Level" themeStyles={themeStyles} theme={theme} />
                    </View>

                    {/* Ingredients */}
                    <View style={tailwind`mb-8`}>
                        <Text style={tailwind`text-2xl font-black ${themeStyles.text} mb-4`}>Ingredients</Text>
                        <View style={tailwind`${theme === 'light' ? 'bg-amber-50/50' : 'bg-slate-900'} rounded-3xl p-4`}>
                            {getIngredients(details).map((item, index) => (
                                <View key={index} style={tailwind`flex-row items-center ${theme === 'light' ? 'border-amber-100/50' : 'border-slate-800'} py-3 last:border-0`}>
                                    <View style={tailwind`w-2 h-2 rounded-full bg-amber-400 mr-3`} />
                                    <Text style={tailwind`${themeStyles.text} font-bold text-base flex-1`}>{item.ingredient}</Text>
                                    <Text style={tailwind`text-amber-600 font-black text-sm`}>{item.measure}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Instructions */}
                    <View style={tailwind`mb-8`}>
                        <Text style={tailwind`text-2xl font-black ${themeStyles.text} mb-4`}>Instructions</Text>
                        <View style={tailwind`${theme === 'light' ? 'bg-gray-50' : 'bg-slate-900'} rounded-3xl p-6`}>
                            <Text style={tailwind`${themeStyles.subText} leading-7 text-base italic`}>
                                {details.strInstructions}
                            </Text>
                        </View>
                    </View>

                    {/* Video Section */}
                    {details.strYoutube && (
                        <View style={tailwind`mt-4 mb-10`}>
                            <Text style={tailwind`text-2xl font-black ${themeStyles.text} mb-4`}>Recipe Video</Text>
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

            {/* Floating Buttons Holder */}
            <View style={tailwind`absolute top-12 left-0 right-0 px-6 flex-row justify-between items-center z-50`}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={tailwind`${theme === 'light' ? 'bg-white/90' : 'bg-slate-900/90'} p-3 rounded-2xl shadow-lg border ${theme === 'light' ? 'border-white' : 'border-slate-800'}`}
                >
                    <ChevronLeftIcon size={24} color={theme === 'light' ? "#1f2937" : "#f3f4f6"} strokeWidth={3} />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={toggleFavourite}
                    style={tailwind`${theme === 'light' ? 'bg-white/90' : 'bg-slate-900/90'} p-3 rounded-2xl shadow-lg border ${theme === 'light' ? 'border-white' : 'border-slate-800'}`}
                >
                    <HeartIcon size={24} color={fav ? "#ef4444" : "#9ca3af"} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const InfoCard = ({ icon, value, label, themeStyles, theme }) => (
    <View style={tailwind`${theme === 'light' ? 'bg-amber-100/50' : 'bg-slate-900'} items-center justify-center rounded-[28px] w-[21%] py-4 border ${theme === 'light' ? 'border-amber-200/30' : 'border-slate-800'}`}>
        <View style={tailwind`${theme === 'light' ? 'bg-white' : 'bg-slate-800'} p-2 rounded-2xl mb-2 shadow-sm`}>
            {icon}
        </View>
        <Text style={tailwind`${themeStyles.text} font-black text-base`}>{value}</Text>
        <Text style={tailwind`${themeStyles.subText} font-bold text-[10px] uppercase`}>{label}</Text>
    </View>
);

export default RecipeDetails;