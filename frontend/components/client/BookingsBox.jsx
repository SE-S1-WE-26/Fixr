import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import images from '../../constants/images';
import icons from '../../constants/icons';
import ScanIcon from '../../components/client/home/ScanIcon';
import axios from 'axios'; 
import FormatDateTime from '../../utils/FormatDateTime';

const BookingsBox = ({ type, title, workerId, date, time, amount, qrcode, jobStatus, id }) => {
    const router = useRouter();
    const [worker, setWorker] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state

    const handleNavigation = () => {
        // Navigate to Scanner screen and pass the expected QR code
        router.push({
            pathname: "/pages/client/mybookings/qrscanner",
            params: { qrcode, jobStatus, title, id, workerId }, // Passing the expected QR code
        });
    };

    const fetchWorker = async () => {
        console.log("worker id", workerId);
        try {
            const response = await axios.get(
                `http://192.168.1.3:8010/worker/${workerId}`
            );
            setWorker(response.data);
        } catch (error) {
            console.error("Error fetching Worker Details:", error.response?.data || error);
        } finally {
            setLoading(false); // Set loading to false after the fetch attempt
        }
    };

    useEffect(() => {
        if (workerId) {
            fetchWorker();
        }
    }, [workerId]); // Only depend on workerId
    
      

    if (loading) {
        return (
            <SafeAreaView className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="orange" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="rounded-xl mt-3 mx-auto shadow-sm w-[340px] w-11/12 h-60 border border-gray-300 flex flex-col">
            <View className="flex-row left-4 -mt-3 items-center">
                <View className="items-center rounded-full border border-gray-100">
                    <Image
                        source={{uri: worker?.userId?.profilePic}}
                        className="w-12 h-12 rounded-full"
                        resizeMethod="contain"
                    />
                </View>
                <View className='ml-1'>
                <Text className="font-semibold text-lg ml-2">{title}</Text>
                <Text className="font-medium text-slate-500 text-xs ml-2">{type}</Text>
                </View>
            </View>
            <View className="flex-row justify-between items-center px-4">
                <Text className="mt-1 text-base left-1">Handyman: {worker?.userId?.name}</Text>
                <TouchableOpacity onPress={handleNavigation}>
                    <ScanIcon icon={icons.scanner} />
                </TouchableOpacity>
            </View>
            <View className="flex-row gap-1 mt-2 justify-center">
                <View className="bg-blue-200 rounded-lg px-2 h-[30px] flex-row items-center gap-1">
                    <Image
                        source={icons.calendar}
                        className="w-4 h-4 mb-1"
                        resizeMode="contain"
                        tintColor={"black"}
                    />
                    <Text className="text-xs mb-1">{FormatDateTime(date)}</Text>
                </View>
                <View className="bg-green-300 rounded-lg px-1 h-[30px] flex-row items-center gap-1">
                    <Image
                        source={icons.clock}
                        className="w-4 h-4 mb-1"
                        resizeMode="contain"
                        tintColor={"black"}
                    />
                    <Text className="text-xs mb-1">{time}</Text>
                </View>
                <View className="bg-amber-300 rounded-lg px-1 h-[30px] flex-row items-center gap-1">
                    <Image
                        source={icons.earnings}
                        className="w-4 h-4 mb-1"
                        resizeMode="contain"
                    />
                    <Text className="text-xs mb-1">{amount}</Text>
                </View>
            </View>
            <View className="flex-row mt-4 justify-between px-1">
                <View className="bg-white border-2 border-yellow rounded-lg px-2.5 h-[30px] flex-row">
                    <TouchableOpacity>
                        <Text className="mt-0.5">Handyman Profile</Text>
                    </TouchableOpacity>
                </View>
                <View className="bg-white border-2 border-red-800 rounded-lg px-2.5 h-[30px] flex-row">
                    <TouchableOpacity>
                        <Text className="mt-0.5">Cancel Appointment</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default BookingsBox;
