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
        <View  style={styles.container}>
            <View className='flex flex-row items-center'>
                <Image className='bg-orange w-10 h-10 rounded-full' />
                <View className='ml-2'>
                    <Text className='text-lg font-semibold'>{jobName}</Text>
                    <Text>Scheduled Date: {date}</Text>
                    <Text>Scheduled Time: {time}</Text>
                    <Text>Handyman: {handyman}</Text>
                </View>
                <TouchableOpacity style={styles.scanner} onPress={handleNavigation}>
                    <ScanIcon icon={icons.scanner} />
                </TouchableOpacity>
            </View>
            <View className='flex flex-row justify-center'>
                <TouchableOpacity className='bg-orange items-center justify-center p-2 rounded-lg mr-1'>
                    <Text className='text-white'>Handyman Details</Text>
                </TouchableOpacity>
                <TouchableOpacity className='border border-2 border-orange items-center justify-center p-1 rounded-lg ml-1'>
                    <Text>Cancel Appointment</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: 80,
        marginTop: 5,
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: '#f9f9f9',
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginHorizontal: 10,
        justifyContent: 'center',
        // Shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        // Shadow for Android
        elevation: 5,
    },
    scanner: {
        position: "absolute",
        bottom: 10,
        right: 10,
        zIndex: 10,
    },
});

export default JobCard;
