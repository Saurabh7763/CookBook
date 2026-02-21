import { useNavigation } from '@react-navigation/native'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { ArrowLeftIcon } from 'react-native-heroicons/outline'
import tailwind from 'twrnc'

const SupportScreen = () => {
    const navigation = useNavigation()
  return (
    <View style={tailwind`my-7 mx-4`}>
      <TouchableOpacity
           style={tailwind`bg-amber-500 mt-2 w-10 rounded-full p-1`}
        >
            <ArrowLeftIcon 
                size={30}
                strokeWidth={2}
                color={'white'}
                onPress={()=> navigation.goBack()}
            />
        </TouchableOpacity>
      <View
        style={tailwind`mt-20 items-center`}
      >
        <Image
            source={require('../../assets/namaste.png')}
            style={tailwind`w-50 h-50`}
        />
        <Text style={tailwind`text-xl text-neutral-500 font-bold text-center`}>
            coming soon!
        </Text>
      </View>
    </View>
  )
}

export default SupportScreen