import { useTheme } from '../context/ThemeContext'
import { ArrowLeftIcon } from 'react-native-heroicons/outline'
import tailwind from 'twrnc'
import { StatusBar, View, Text, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const NotificationScreen = () => {
    const navigation = useNavigation()
    const { theme, themeStyles } = useTheme();

    return (
        <View style={tailwind`flex-1 ${themeStyles.background} pt-12 px-6`}>
            <StatusBar barStyle={themeStyles.statusBar} />
            <View style={tailwind`flex-row items-center mb-10`}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={tailwind`${theme === 'light' ? 'bg-gray-100' : 'bg-slate-800'} p-2 rounded-2xl mr-4`}
                >
                    <ArrowLeftIcon size={24} color={theme === 'light' ? "#374151" : "#f3f4f6"} strokeWidth={3} />
                </TouchableOpacity>
                <Text style={tailwind`text-2xl ${themeStyles.text} font-black`}>
                    Notifications
                </Text>
            </View>

            <View style={tailwind`flex-1 items-center justify-center pb-20`}>
                <Image
                    source={require('../../assets/notification.png')}
                    style={tailwind`h-64 w-64`}
                    resizeMode="contain"
                />
                <Text style={tailwind`${themeStyles.subText} text-lg text-center font-bold mt-4`}>
                    No notifications yet!
                </Text>
                <Text style={tailwind`${themeStyles.subText} text-sm text-center px-10 mt-2 opacity-60`}>
                    We'll let you know when something new and exciting arrives in your kitchen.
                </Text>
            </View>
        </View>
    )
}

export default NotificationScreen