import { View, Text, Image, ScrollView, StatusBar, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import tailwind from 'twrnc';
import { ActivityIndicator } from 'react-native';
import { ChevronLeftIcon, ClockIcon, FireIcon, Square3Stack3DIcon } from "react-native-heroicons/outline";
import { HeartIcon, UserGroupIcon } from "react-native-heroicons/solid";
import { useNavigation } from '@react-navigation/native';
import YoutubeIframe from 'react-native-youtube-iframe';
import { RecipeContext } from "../context/RecipeContext";
import Animated, {useSharedValue, useAnimatedStyle, withSpring, withTiming, Easing} from 'react-native-reanimated';


const RecipeDetails = ({route}) => {
    const {meal} = route.params;
    const [loading , setLoading] = useState(false)
    const [details, setDetails] = useState(null)
    const [isFav, setIsFav] = useState(false)
    const navigation = useNavigation()

    const imageTranslateY = useSharedValue(50)
    const imageOpacity = useSharedValue(0)
    const cardTranslateY = useSharedValue(50)
    const cardOpacity = useSharedValue(0)

    useEffect(()=>{
        imageTranslateY.value = withSpring(0,{
            damping:12,
            stiffness:100
        })
        imageOpacity.value = withTiming(1,{
            duration:800,
            easing: Easing.out(Easing.exp)
        })

        setTimeout(()=>{
            cardTranslateY.value = withSpring(0, {
                damping:12,
                stiffness:100
            })
            cardOpacity.value = withTiming(1, {
                duration:800,
                easing: Easing.out(Easing.exp)
            })
        },200)
    },[])

    const cardAnimatedStyle = useAnimatedStyle(()=>({
        transform: [{translateY: cardTranslateY.value}],
        opacity: cardOpacity.value
    }))
    
    const imageAnimatedStyle = useAnimatedStyle(()=>({
        transform: [{translateY:imageTranslateY.value}],
        opacity: imageOpacity.value
    }))

    const {addToFavourites,removeFromFavourites,isFavourite} = useContext(RecipeContext)
    const [fav, setFav] = useState(isFavourite(meal.idMeal));

    const toggleFavourite=()=>{
        if (fav) {
            removeFromFavourites(meal.idMeal)
        }else{
            addToFavourites(meal)
        }
            setFav(!fav)
    }

    const getIngredients = (details)=>{
        let ingredients = [];

        for(let i =1; i<=20; i++){
            const ingredient = details[`strIngredient${i}`]
            const measure = details[`strMeasure${i}`]

            if (ingredient) {
            ingredients.push(`${measure? measure+" ":''}${ingredient}`)
        }
        }
        return ingredients;
    }


  const getRecipeDetails=async () => {
    try {
        setLoading(true)
        const response = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`)
        setDetails(response.data.meals[0])
    } catch (error) {
        console.log(error)
    }finally{
        setLoading(false)
    }
  }

  useEffect(()=>{
    getRecipeDetails()
  },[])

  if (loading) {
    return (
      <View style={tailwind`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color="#ffa62a" />
      </View>
    );
  }

  const getYoutubeVideoId= url=>{
    const regex = /[?&]v=([^&]+)/;
    const match = url.match(regex);

    if(match && match[1]){
        return match[1];
    }
    return null;
  }

  if (!details) {
    return(
        <View style={tailwind`flex-1 justify-center items-center`}>
            <Text style={tailwind`text-2xl text-neutral-600 font-bold`}>No record found.</Text>
        </View>
    )
  }

  return(
    <ScrollView style={tailwind`flex-1 p-2 mb-3`}>
    <StatusBar barStyle="light" backgroundColor="#fff" />
        <View style={tailwind`relative`}>
            <Animated.View style={imageAnimatedStyle}>
                <Image 
                   source={{uri:details.strMealThumb}}
                   style={tailwind`w-[100%] h-90 rounded-7`}
            />
            </Animated.View>
            <View style={tailwind`absolute top-4 left-3 bg-white p-1 rounded-full items-center`}
             >
              <ChevronLeftIcon
                size={40}
                color={"#000"}
                onPress={()=>navigation.goBack()}
               />
             </View>
            <TouchableOpacity
              style={tailwind`absolute top-4 right-3 bg-white p-1 rounded-full items-center`}
              onPress={toggleFavourite}
            >
              <HeartIcon color={fav ? "red" : "gray"} size={40} />
            </TouchableOpacity>
        </View>


        <Text style={tailwind`text-2xl text-neutral-600 font-bold mt-2 px-1`}>{details.strMeal}</Text>        
        <Text style={tailwind`text-lg text-neutral-600  mb-2 px-1`}>{details.strArea}</Text> 

        

        <Animated.View style={[tailwind`flex flex-row items-center justify-around my-2`,cardAnimatedStyle]}>
             <View style={tailwind`bg-amber-300 py-2 items-center justify-center rounded-8 w-17 `}>
                <ClockIcon
                    style={tailwind`bg-white rounded-full mb-1 p-2`}
                    strokeWidth={2}
                    size={30}
                />
                <View  style={tailwind`items-center`}>
                    <Text style={tailwind`text-neutral-600  text-lg`} >35</Text>
                    <Text style={tailwind`text-neutral-600 text-xs`}>min</Text>
                </View>
             </View>
             <View style={tailwind`bg-amber-300 py-2 items-center justify-center rounded-8 w-17`}>
                <UserGroupIcon
                    style={tailwind`bg-white rounded-full mb-1 p-2`}
                    strokeWidth={2}
                    size={30}
                />
                <View  style={tailwind`items-center`}>
                    <Text style={tailwind`text-neutral-600  text-lg`} >03</Text>
                    <Text style={tailwind`text-neutral-600 text-xs`}>servings</Text>
                </View>
             </View>
             <View style={tailwind`bg-amber-300 py-2 items-center justify-center rounded-8 w-17`}>
                <FireIcon
                    style={tailwind`bg-white rounded-full mb-1 p-2`}
                    strokeWidth={2}
                    size={30}
                />
                <View  style={tailwind`items-center`}>
                    <Text style={tailwind`text-neutral-600  text-lg`} >100</Text>
                    <Text style={tailwind`text-neutral-600 text-xs`}>cal</Text>
                </View>
             </View>
             <View style={tailwind`bg-amber-300 py-2 items-center justify-center rounded-8 w-17`}>
                <Square3Stack3DIcon
                    style={tailwind`bg-white rounded-full mb-1 p-4`}
                    strokeWidth={2}
                    size={30}
                />
                <View style={tailwind`items-center`}>
                <Text style={tailwind`text-neutral-600 text-base`}>Easy</Text>
                <Text style={tailwind`text-neutral-600  text-xs`} > </Text>
                </View>
             </View>
        </Animated.View>

        <View style={tailwind`mx-3 mt-2`}>
            <Text style={tailwind`text-2xl text-neutral-600 mb-2 font-bold`}>ingredients</Text>

            {getIngredients(details).map((item, index)=>(
                <View key={index} style={tailwind`flex-row items-start mb-1`}>
                    <Text style={tailwind`text-amber-600 text-2xl mr-2`}>•</Text>
                    <Text style={tailwind`text-lg text-neutral-700 flex-shrink`}>{item}</Text>
                </View>
            ))}  
        </View>


        <View style={tailwind`mx-3 mb-2 mt-3`}>
            <Text style={tailwind`text-2xl text-neutral-600 font-bold`}>Instruction</Text>
            <View style={tailwind`max-w-[100%] my-1`}>
                <Text style={tailwind`text-base text-neutral-600 p-1`}>{details.strInstructions}</Text>
            </View>
        </View>

        {
            details.strYoutube &&  (
                <View style={tailwind`mx-2 mt-5 mb-3`}>
                   <View style={tailwind`flex-row items-center`}>
                       <Image
                           source={require('../../assets/youtube.png')}
                           style={tailwind`h-10 w-10 mr-1`}
                       />
                       <Text style={tailwind`text-2xl text-neutral-600 font-bold`}>Recipe Video</Text>
                   </View>

                   <View style={tailwind`mt-2`}>
                    <YoutubeIframe
                        videoId={getYoutubeVideoId(details.strYoutube)}
                        height={300}
                    />
                   </View>
                </View>
            )}



    </ScrollView>
  )
}
export default RecipeDetails