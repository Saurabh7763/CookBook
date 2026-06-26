import { View, Text, TouchableOpacity, Image, ScrollView, StatusBar, Dimensions } from 'react-native'
import React, { useEffect } from 'react'
import tailwind from 'twrnc'
import { ArrowLeftIcon, ArrowRightStartOnRectangleIcon, BellIcon, ChatBubbleLeftIcon, ChevronRightIcon, Cog6ToothIcon, SunIcon, UserIcon, ShieldCheckIcon, CreditCardIcon } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming, Easing } from 'react-native-reanimated'

const { width } = Dimensions.get('window');

const ProfileScreen = () => {
    const navigation = useNavigation()
    const { logout, user } = useAuth()
    const { theme, toggleTheme, themeStyles } = useTheme()

    const profileOpacity = useSharedValue(0);
    const profileTranslateY = useSharedValue(20);
    const contentOpacity = useSharedValue(0);

    useEffect(() => {
        profileOpacity.value = withTiming(1, { duration: 600 });
        profileTranslateY.value = withSpring(0);
        contentOpacity.value = withTiming(1, { duration: 800, delay: 200 });
    }, []);

    const profileStyle = useAnimatedStyle(() => ({
        opacity: profileOpacity.value,
        transform: [{ translateY: profileTranslateY.value }]
    }));

    const contentStyle = useAnimatedStyle(() => ({
        opacity: contentOpacity.value
    }));

    const handleLogout = async () => {
        try {
            await logout()
        } catch (error) {
            console.log("Logout Error:", error)
        }
    }

    return (
        <ScrollView style={tailwind`${themeStyles.background} flex-1`} showsVerticalScrollIndicator={false}>
            <StatusBar barStyle={themeStyles.statusBar} />
            
            {/* Header */}
            <View style={tailwind`pt-14 px-6 pb-6 flex-row items-center justify-between`}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={tailwind`${theme === 'light' ? 'bg-gray-100' : 'bg-slate-800'} p-2.5 rounded-2xl`}
                >
                    <ArrowLeftIcon size={24} color={theme === 'light' ? '#374151' : '#f3f4f6'} strokeWidth={2.5} />
                </TouchableOpacity>
                <Text style={tailwind`text-xl font-black ${themeStyles.text}`}>Account Profile</Text>
                <View style={tailwind`w-10`} />
            </View>

            {/* Profile Info Section */}
            <Animated.View style={[tailwind`items-center px-6`, profileStyle]}>
                <View style={tailwind`relative`}>
                    <View style={tailwind`p-1 bg-amber-100 rounded-[40px] shadow-sm`}>
                        <Image
                            source={require('../../assets/avtar.png')}
                            style={[tailwind`rounded-[38px]`, { width: 120, height: 120 }]}
                        />
                    </View>
                    <TouchableOpacity style={tailwind`absolute bottom-0 right-0 bg-amber-500 p-2.5 rounded-2xl border-4 ${theme === 'light' ? 'border-white' : 'border-slate-900'} shadow-lg`}>
                        <UserIcon size={18} color="white" strokeWidth={3} />
                    </TouchableOpacity>
                </View>
                
                <Text style={tailwind`text-2xl font-black ${themeStyles.text} mt-5`}>{user?.displayName || 'Chief Foodie'}</Text>
                <Text style={tailwind`${themeStyles.subText} font-medium text-sm mt-1`}>{user?.email || 'foodie@chef.com'}</Text>
                
                <View style={tailwind`flex-row mt-6 bg-amber-50 rounded-3xl p-1.5`}>
                    <TouchableOpacity style={tailwind`bg-white px-6 py-2 rounded-[20px] shadow-sm`}>
                        <Text style={tailwind`text-amber-600 font-bold text-xs`}>Edit Profile</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>

            {/* Grid Menu */}
            <Animated.View style={[tailwind`mt-10 px-6`, contentStyle]}>
                <View style={tailwind`flex-row justify-between mb-4`}>
                    <GridButton 
                        onPress={() => navigation.navigate('Notification')} 
                        icon={<BellIcon color={theme === 'light' ? "#3b82f6" : "#60a5fa"} size={26} strokeWidth={2} />} 
                        label="Alerts" 
                        bgColor={theme === 'light' ? "bg-blue-50" : "bg-blue-900/20"}
                        themeStyles={themeStyles}
                    />
                    <GridButton 
                        onPress={() => navigation.navigate('Favourite')} 
                        icon={<HeartIcon color={theme === 'light' ? "#ef4444" : "#f87171"} size={26} />} 
                        label="Favs" 
                        bgColor={theme === 'light' ? "bg-red-50" : "bg-red-900/20"}
                        themeStyles={themeStyles}
                    />
                    <GridButton 
                        onPress={() => navigation.navigate('Support')} 
                        icon={<ChatBubbleLeftIcon color={theme === 'light' ? "#10b981" : "#34d399"} size={26} strokeWidth={2} />} 
                        label="Support" 
                        bgColor={theme === 'light' ? "bg-green-50" : "bg-green-900/20"}
                        themeStyles={themeStyles}
                    />
                </View>

                {/* List Menu */}
                <View style={tailwind`mt-4 ${theme === 'light' ? 'bg-gray-50/50' : 'bg-slate-900/50'} rounded-[32px] p-2`}>
                   <MenuRow 
                      icon={<SunIcon size={22} color={theme === 'light' ? "#4b5563" : "#9ca3af"} />} 
                      label="App Theme" 
                      value={theme.charAt(0).toUpperCase() + theme.slice(1)}
                      onPress={toggleTheme} 
                      themeStyles={themeStyles}
                   />
                   <MenuRow 
                      icon={<Cog6ToothIcon size={22} color={theme === 'light' ? "#4b5563" : "#9ca3af"} />} 
                      label="Notification Settings" 
                      onPress={() => navigation.navigate('NotiSetting')} 
                      themeStyles={themeStyles}
                   />
                   <MenuRow 
                      icon={<ShieldCheckIcon size={22} color={theme === 'light' ? "#4b5563" : "#9ca3af"} />} 
                      label="Security & Privacy" 
                      onPress={() => {}} 
                      themeStyles={themeStyles}
                   />
                   <MenuRow 
                      icon={<CreditCardIcon size={22} color={theme === 'light' ? "#4b5563" : "#9ca3af"} />} 
                      label="Subscription Basics" 
                      onPress={() => {}} 
                      themeStyles={themeStyles}
                      isLast
                   />
                </View>

                {/* Logout Button */}
                <TouchableOpacity 
                    style={tailwind`flex-row items-center justify-center p-5 ${theme === 'light' ? 'bg-red-50' : 'bg-red-900/10'} rounded-[28px] mt-10 mb-20`}
                    onPress={handleLogout}
                >
                    <ArrowRightStartOnRectangleIcon size={22} color="#ef4444" strokeWidth={2.5} />
                    <Text style={tailwind`text-red-500 text-lg ml-3 font-black`}>Logout Session</Text>
                </TouchableOpacity>
            </Animated.View>
        </ScrollView>
    )
}

const GridButton = ({ icon, label, onPress, bgColor, themeStyles }) => (
    <TouchableOpacity 
        onPress={onPress}
        style={tailwind`${bgColor} w-[30%] py-5 rounded-[28px] items-center justify-center border ${themeStyles.border === 'border-gray-100' ? 'border-white' : 'border-slate-800'}`}
    >
        {icon}
        <Text style={tailwind`${themeStyles.text} font-bold text-[11px] mt-2 uppercase tracking-tighter`}>{label}</Text>
    </TouchableOpacity>
);

const MenuRow = ({ icon, label, value, onPress, isLast, themeStyles }) => (
    <TouchableOpacity 
        onPress={onPress}
        style={[
            tailwind`flex-row items-center justify-between p-4 px-5`,
            !isLast && tailwind`border-b ${themeStyles.border}`
        ]}
    >
        <View style={tailwind`flex-row items-center`}>
            <View style={tailwind`${themeStyles.border === 'border-gray-100' ? 'bg-white' : 'bg-slate-800'} p-2 rounded-xl shadow-sm mr-4`}>
                {icon}
            </View>
            <Text style={tailwind`${themeStyles.text} font-bold text-base`}>{label}</Text>
        </View>
        <View style={tailwind`flex-row items-center`}>
            {value && <Text style={tailwind`mr-2 ${themeStyles.subText} font-bold text-sm`}>{value}</Text>}
            <ChevronRightIcon size={20} color="#9ca3af" strokeWidth={3} />
        </View>
    </TouchableOpacity>
);

export default ProfileScreen