import { View, Text, TouchableOpacity, Image, Pressable } from 'react-native'
import React from 'react'
import tailwind from 'twrnc'
import { ArrowLeftIcon, ArrowRightStartOnRectangleIcon, BellIcon, ChatBubbleLeftIcon, ChevronRightIcon, Cog6ToothIcon, SunIcon,  } from 'react-native-heroicons/outline'
import {  HeartIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../context/AuthContext'

const ProfileScreen = () => {
    const navigation = useNavigation()
    const {logout,user} = useAuth()

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
                color={'white'}
                onPress={()=> navigation.goBack()}
            />
        </TouchableOpacity>
        <Text style={tailwind`text-2xl text-neutral-600 ml-22 font-bold`}>Profile</Text>
      </View>

      <View style={tailwind`flex mx-4 mt-5 justify-center bg-amber-500 p-3 rounded-10 items-center`}>
         <Image
            source={require('../../assets/avtar.png')}
            style={{width:110,height:110,borderRadius:55}}
         />
         <Text style={tailwind`text-lg font-bold text-neutral-600`}>{user?.displayName}</Text>
         <Text style={tailwind`text-sm text-neutral-600`}>{user?.email}</Text>
      </View>

      <View style={tailwind`flex-row justify-around items-center mx-2 mt-10`}>
        <View style={tailwind`flex items-center justify-center p-2 rounded-xl bg-gray-200 w-23`}>
            <TouchableOpacity
            style={tailwind`flex items-center`}
            onPress={()=>navigation.navigate('Notification')}>
                <BellIcon
                strokeWidth={2}
                color={'blue'}
            />
            <Text style={tailwind`text-xs`}>Notifications</Text>
            </TouchableOpacity>
        </View>
        <View style={tailwind`flex items-center justify-center p-2 rounded-xl bg-gray-200 w-23`}>
            <TouchableOpacity
               style={tailwind`items-center`}
               onPress={()=>navigation.navigate('Support')}
            >
                <ChatBubbleLeftIcon
                strokeWidth={2}
                color={'green'}
            />
            <Text style={tailwind`text-xs`}>Help!</Text>
            </TouchableOpacity>
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
                <SunIcon
                strokeWidth={2}
            />
            <Text style={tailwind`text-neutral-600 ml-2`}>Theme</Text>
            </View>
            <ChevronRightIcon/>
        </View>
        <View style={tailwind`w-full flex-row items-center justify-between bg-gray-200 px-1 py-2 mb-10 rounded-lg`}>
            <View style={tailwind`flex-row items-center`}>
                <TouchableOpacity
                  style={tailwind`flex-row items-center`}
                  onPress={()=>navigation.navigate('NotiSetting')}
                >
                    <Cog6ToothIcon
                strokeWidth={2}
            />
            <Text style={tailwind`text-neutral-600 ml-2`}>Notification Settings</Text>
                </TouchableOpacity>
            </View>
            <ChevronRightIcon/>
        </View>
           
           <TouchableOpacity 
             style={tailwind`flex-row mx-auto items-center justify-center px-5 py-3 bg-red-500 rounded-full mt-5`}
             onPress={handleLogout}
           >
            <ArrowRightStartOnRectangleIcon
                       strokeWidth={2}
                        color={'#ffffff'}
                    />
                    <Text style={tailwind`text-xl ml-3 text-white font-bold`}>Logout</Text>
           </TouchableOpacity>
      </View>


    </View>
  )
}

export default ProfileScreen