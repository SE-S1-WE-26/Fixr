import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '../../constants/images'
import CustomButton from '../common/CustomButton'

const JobPostsBox = ({ type, topic, description, handlePressJob, handlePressHandymen, handleDelete, estDuration }) => {
    return (
        <SafeAreaView className={`rounded-xl mx-auto shadow-smw-[340px] w-11/12 pb-4 border border-gray-300 flex flex-col mb-2`}>
            <View className='flex-row -mt-3 left-4'>
                <View className={`w-11 h-11 items-center top-0 rounded-full border border-gray-100`}>
                    <Image
                        source={images[type]}
                        className={` w-7 h-7 top-[7.17px]`}
                        resizeMethod='contain' />
                </View>
                <Text className={`text-center p-1 font-semibold text-lg`}>{topic}</Text>
                
            </View>
            <Text className="mt-1 text-base left-2 px-2">{description}</Text>
            
            <View className={`flex-row mt-2 justify-between px-2 ml-2`}>
            <View className="flex flex-col">
                    <Text>Est. Duration</Text>
                    <View className="flex-row">
                        <Text className="text-orange text-2xl font-bold -mt-1">{estDuration} Hours</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={handlePressJob}>
                    <View className={` bg-amber-800 rounded-xl px-2.5 h-[40px] flex-row items-center w-40 justify-center mt-2 mr-2`}>
                        <Text className="text-white font-medium">View Post</Text>
                    </View>
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={handleDelete}>
                    <View className={` bg-red-800 rounded-xl px-2.5 h-[35px] flex-row items-center w-40 justify-center`}>
                        <Text className="text-white font-medium">Delete Post</Text>
                    </View>
                </TouchableOpacity> */}
            </View>
            <View className={`mt-3 justify-center w-80 mx-auto`}>
                <TouchableOpacity onPress={handlePressHandymen} className="text-center items-center bg-orange rounded-xl">
                    <View className={`px-2.5 h-[40px] flex-row items-center text-center `}>
                        <Text className="font-medium text-white">View Interested Handymen</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default JobPostsBox