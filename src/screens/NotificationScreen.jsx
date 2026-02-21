import { useNavigation } from '@react-navigation/native'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { ArrowLeftIcon } from 'react-native-heroicons/outline'
import tailwind from 'twrnc'

const NotificationScreen = () => {
    const navigation =useNavigation()
  return (
    <View style={tailwind`my-7 flex mx-5`}>
        <View style={tailwind`flex `}>
            <TouchableOpacity
           style={tailwind`bg-amber-500 rounded-full w-10 p-1`}
        >
            <ArrowLeftIcon 
                size={30}
                strokeWidth={2}
                color={'white'}
                onPress={()=> navigation.goBack()}
            />
        </TouchableOpacity>
        </View>
        <View style={tailwind`flex items-center justify-center`}>
            <Image 
            source={require('../../assets/notification.png')}
            style={tailwind`h-60 w-60`}
        />
        <Text style={tailwind`text-neutral-500 text-lg text-center `}>
            No notification available yet!
        </Text>
        </View>
    </View>
  )
}

export default NotificationScreen