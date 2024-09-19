import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import icons from '../../constants/icons'

const InterestedHandyman = ({ handyman, isFavourite, jobTitle, rate, rating, viewProfileHandlePress, scheduleAppointmentHandlePress, declineHandlePress }) => {
    const [favourite, setFavourite] = useState(isFavourite);
    const handleFavouritePress = () => {
        setFavourite(!favourite);
    }

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating); // Get the number of full stars
        const hasHalfStar = rating % 1 >= 0.1; // Check if there's a half star
        const totalStars = 5; // Total number of stars

        // Add full stars
        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <Image
                    key={`full-${i}`}
                    source={icons.fullStar}
                    className="w-5 h-5"
                    resizeMode='contain'
                />
            );
        }

        // Add half star if applicable
        if (hasHalfStar) {
            stars.push(
                <Image
                    key="half"
                    source={icons.halfStar}
                    className="w-5 h-5"
                    resizeMode='contain'
                />
            );
        }

        // Add empty stars to fill the rest
        const emptyStars = totalStars - fullStars - (hasHalfStar ? 1 : 0);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(
                <Image
                    key={`empty-${i}`}
                    source={icons.noStar}
                    className="w-5 h-5"
                    resizeMode='contain'
                />
            );
        }

        return stars;
    };

    return (
        <SafeAreaView className={`rounded-xl mx-auto shadow-smw-[340px] w-11/12 pb-4 border border-gray-300 flex flex-col mb-2`}>
            <View className='flex-row -mt-3 left-4'>
                {/* handyman profile photo */}
                <View>
                    <Image
                        source={icons.worker}
                        className="w-12 h-12"
                        resizeMode='contain'
                    />
                </View>
                {/* handyman details */}
                <View className="flex-col ml-2">
                    <View className="flex-row">
                        <Text className="font-medium text-lg">{handyman}</Text>
                        <TouchableOpacity
                            onPress={handleFavouritePress}
                        >
                            <Image
                                source={`${favourite ? icons.favorites : icons.notFavourite}`}
                                tintColor={`${favourite ? "#F9B42B" : ""}`}
                                className={`w-5 h-5 mt-1 ml-1`}
                                resizeMode='contain'
                            />
                        </TouchableOpacity>
                    </View>
                    <Text>{jobTitle}</Text>
                    {/* rating */}
                    <View className="flex-row">
                        {renderStars(rating)}
                    </View>
                </View>
                {/* handyman rate */}
                <View className="flex-row absolute right-7 -top-3">
                    <Text className="text-xs font-semibold mt-1">LKR </Text>
                    <Text className="text-base font-semibold">{rate}/hr</Text>
                </View>
            </View>
            <View className="flex-row justify-between px-2 mt-2">
                <View className={` bg-black-800 rounded-full px-2.5 h-[35px] flex-row w-40 items-center justify-center`}>
                    <TouchableOpacity onPress={viewProfileHandlePress}>
                        <Text className="text-white font-medium">View Profile</Text>
                    </TouchableOpacity>
                </View>
                <View className={` bg-red-800 rounded-full px-2.5 h-[35px] w-40 flex-row items-center justify-center`}>
                    <TouchableOpacity >
                        <Text className="text-white font-medium">Decline</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View className="justify-center px-2 mt-2" >
                <View className={` bg-yellow rounded-full px-2.5 h-[35px] flex-row items-center justify-center`}>
                    <TouchableOpacity onPress={scheduleAppointmentHandlePress}>
                        <Text className="font-medium">Schedule Appointment</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default InterestedHandyman