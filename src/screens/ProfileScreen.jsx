import { View, Text, TouchableOpacity, Image, Pressable } from 'react-native'
import React from 'react'
import tailwind from 'twrnc'
import { ArrowLeftIcon, ArrowRightStartOnRectangleIcon, BellIcon, ChatBubbleLeftIcon, ChevronRightIcon, Cog6ToothIcon, UserIcon } from 'react-native-heroicons/outline'
import {  HeartIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../context/AuthContext'

const ProfileScreen = () => {
    const navigation = useNavigation()
    const {logout} = useAuth()

  const handleLogout=async()=>{
    try {
        await logout()
    } catch (error) {
        console.log("Logout Error:", error)
    }
  }

  return (
    <View style={tailwind`bg-white flex-1 pt-10 px-5`}>
      <View style={tailwind`flex-row items-center`}>
        <TouchableOpacity
           style={tailwind`bg-amber-500 rounded-full p-1`}
        >
            <ArrowLeftIcon 
                size={30}
                strokeWidth={2}
                onPress={()=> navigation.goBack()}
            />
        </TouchableOpacity>
        <Text style={tailwind`text-2xl text-neutral-600 ml-22 font-bold`}>Profile</Text>
      </View>

      <View style={tailwind`flex mx-4 mt-5 justify-center items-center`}>
         <Image
            source={require('../../assets/avtar.png')}
            style={{width:110,height:110,borderRadius:55}}
         />
         <Text style={tailwind`text-lg text-neutral-600`}>admin</Text>
         <Text style={tailwind`text-lg text-neutral-600`}>admin123@gmail.com</Text>
      </View>

      <View style={tailwind`flex-row justify-around items-center mx-2 mt-10`}>
        <View style={tailwind`flex items-center justify-center p-2 rounded-xl bg-gray-200 w-23`}>
            <BellIcon
                strokeWidth={2}
                color={'blue'}
            />
            <Text style={tailwind`text-xs`}>Notifications</Text>
        </View>
        <View style={tailwind`flex items-center justify-center p-2 rounded-xl bg-gray-200 w-23`}>
            <ChatBubbleLeftIcon
                strokeWidth={2}
                color={'green'}
            />
            <Text style={tailwind`text-xs`}>Help!</Text>
        </View>
        <View style={tailwind`flex items-center justify-center p-2 rounded-xl bg-gray-200 w-23`}>
            <Pressable
               style={tailwind`items-center`}
               onPress={()=>navigation.navigate('Favourite')}
            >
                <HeartIcon
                strokeWidth={2}
                color={'red'}
            />
            <Text style={tailwind`text-xs`}>Favourites</Text>
            </Pressable>
        </View>
      </View>

      <View style={tailwind`flex mx-2 mt-5 `}>
        <View style={tailwind`w-full flex-row items-center justify-between bg-gray-200 px-1 py-2 mb-4 rounded-lg`}>
            <View style={tailwind`flex-row items-center`}>
                <UserIcon
                strokeWidth={2}
            />
            <Text style={tailwind`text-neutral-600 ml-2`}>My Profile</Text>
            </View>
            <ChevronRightIcon/>
        </View>
        <View style={tailwind`w-full flex-row items-center justify-between bg-gray-200 px-1 py-2 mb-4 rounded-lg`}>
            <View style={tailwind`flex-row items-center`}>
                <Cog6ToothIcon
                strokeWidth={2}
            />
            <Text style={tailwind`text-neutral-600 ml-2`}>Notification Settings</Text>
            </View>
            <ChevronRightIcon/>
        </View>
        <View style={tailwind`w-full flex-row items-center justify-between bg-gray-200 px-1 py-2 mb-3 rounded-lg`}>
            
                <TouchableOpacity
                  style={tailwind`flex-row items-center`}
                  onPress={handleLogout}
                >
                    <ArrowRightStartOnRectangleIcon
                       strokeWidth={2}
                        color={'#fb1c1cff'}
                    />
                <Text style={tailwind`text-neutral-600 ml-2`}>Logout</Text>
                </TouchableOpacity>
           
        </View>
      </View>


    </View>
  )
}

export default ProfileScreen