import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import icons from '../../constants/icons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ConfirmationBox from './ConfirmationBox';

const InterestedHandyman = ({ handyman, isFavourite, jobTitle, rate, rating, viewProfileHandlePress, scheduleAppointmentHandlePress, declineHandlePress, clientId, handymanId, handymanImage }) => {
    const [favourite, setFavourite] = useState(isFavourite);
    const [job, setJob] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState(''); 

    useEffect(() => {
        setFavourite(isFavourite);
    }, [isFavourite]);

    const handleFavouritePress = async () => {
        try {
            console.log("Initial fav value: ", favourite);
            const token = await AsyncStorage.getItem('token');
            const response = await fetch('https://fixerbackend.vercel.app/client/favorite', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    workerId: handymanId,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                if(favourite){
                    setIsVisible(true);
                    setAlertMessage("Handyman Removed from Favorites!");
                }
                else{
                    setIsVisible(true);
                    setAlertMessage("Handyman Added to Favorites");
                }
                setFavourite(!favourite);
            } else {
                console.error("Failed to update favorites:", data.message);
            }
        } catch (error) {
            console.error("Error updating favorite status:", error);
        }
    }

    const handleOnClose= () =>{ 
        setIsVisible(false);
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
                <View className="w-14 h-14">
                    <Image
                        source={handymanImage}
                        className="w-12 h-12 rounded-full bg-orange"
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
                    <Text className="font-bold">{rating} </Text>
                        {renderStars(rating)}
                    </View>
                </View>
                {/* handyman rate */}
                <View className="flex-row absolute right-7 -top-3">
                    <Text className="text-xs font-semibold mt-1">LKR </Text>
                    <Text className="text-base font-semibold">{rate}/hr</Text>
                </View>
            </View>
            <View className="flex-row justify-between px-3 mt-2">
                <TouchableOpacity onPress={viewProfileHandlePress}>
                    <View className={` bg-black-800 rounded-xl px-2.5 h-[30px] flex-row w-36 items-center justify-center`}>
                        <Text className="text-white font-medium">View Profile</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity >
                    <View className={` bg-red-800 rounded-xl px-2.5 h-[30px] w-36 flex-row items-center justify-center`}>
                        <Text className="text-white font-medium">Decline</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View className="justify-center px-3 mt-2" >
                <TouchableOpacity onPress={scheduleAppointmentHandlePress}>
                    <View className={` bg-yellow rounded-xl px-2.5 h-[32px] flex-row items-center justify-center`}>
                        <Text className="font-medium">Schedule Appointment</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <ConfirmationBox
            visible={isVisible}
            image={"success"}
            title={"Success"}
            message={alertMessage}
            cancelColor={"green-700"}
            cancelTextStyle={"text-white"}
            onCancel={handleOnClose}
            onCancelMsg={"Got it!"}
            />
        </SafeAreaView>
    )
}

export default InterestedHandyman