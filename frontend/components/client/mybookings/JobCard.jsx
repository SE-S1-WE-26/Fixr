import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import ScanIcon from "../../client/home/ScanIcon";
import { useRouter } from "expo-router";
import { icons } from "../../../constants";

const JobCard = ({ jobName, date, time, handyman, qrcode }) => {
    const router = useRouter();
    
    const handleNavigation = () => {
        // Navigate to Scanner screen and pass the expected QR code
        router.push({
            pathname: "/pages/client/mybookings/Scanner",
            params: { qrcode },  // Passing the expected QR code
        });
    }

    return (
        <View className="flex min-h-[80px] mt-2 rounded-xl bg-powder shadow px-4 md:px-5 py-3 mx-4 md:mx-6 justify-center">
            <View className='flex flex-row items-center'>
                <Image className='bg-orange w-10 h-10 rounded-full' />
                <View className='ml-2'>
                    <Text className='text-lg'>{jobName}</Text>
                    <Text>Scheduled Date: {date}</Text>
                    <Text>Scheduled Time: {time}</Text>
                    <Text>Handyman: {handyman}</Text>
                </View>
                <TouchableOpacity style={styles.scanner} onPress={handleNavigation}>
                    <ScanIcon icon={icons.scanner} />
                </TouchableOpacity>
            </View>
            <View className='flex flex-row'>
                <TouchableOpacity className='bg-orange items-center justify-center p-1 rounded-lg'>
                    <Text className='text-white'>View Handyman Details</Text>
                </TouchableOpacity>
                <TouchableOpacity className='border border-2 border-orange items-center justify-center p-1 rounded-lg'>
                    <Text>Cancel Appointment</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    scanner: {
        position: "absolute",
        bottom: 10,
        right: 10,
        zIndex: 10,
    },
    paddingBottom: {
        paddingBottom: 140, // Add padding below the PopularCategoriesList
    },
});

export default JobCard;
