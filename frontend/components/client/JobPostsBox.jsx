import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '../../constants/images'

const JobPostsBox = ({ type, topic, description, handlePressJob, handlePressHandymen }) => {
    return (
        <SafeAreaView className={`rounded-xl mx-auto shadow-smw-[340px] w-11/12 pb-4 border border-gray-300 flex flex-col mb-2`}>
                <View className='flex-row -mt-3 left-4'>
                    <View className={`w-11 h-11 items-center top-0 rounded-full border border-gray-100`}>
                        <Image
                            source={images[type]}
                            className={` w-6 h-6 top-[7.17px]`}
                            resizeMethod='contain' />
                    </View>
                    <Text className={`text-center p-1 font-semibold text-lg`}>{topic}</Text>
                </View>
                <Text className="mt-1 text-base left-2">{description}</Text>
                <View className={`flex-row mt-4 justify-between px-2`}>
                    <View className={` bg-black-800 rounded-xl px-2.5 h-[35px] flex-row items-center w-40 justify-center`}>
                        <TouchableOpacity  onPress={handlePressJob}>
                            <Text className="text-white font-medium">View Post</Text>
                        </TouchableOpacity>
                    </View>
                    <View className={` bg-red-800 rounded-xl px-2.5 h-[35px] flex-row items-center w-40 justify-center`}>
                        <TouchableOpacity >
                            <Text className="text-white font-medium">Delete Post</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View className={`mt-3 justify-center px-2 w-full`}>
                    <View className={`bg-yellow rounded-xl px-2.5 h-[35px] flex-row items-center text-center justify-center`}>
                        <TouchableOpacity onPress={handlePressHandymen} className="text-center items-center">
                            <Text className="font-medium">View Interested Handymen</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
    )
}

export default JobPostsBox