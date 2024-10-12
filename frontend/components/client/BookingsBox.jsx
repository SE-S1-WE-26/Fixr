import { View, Text, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ConfirmationBox from './ConfirmationBox';
import FormatDateTime from '../../utils/FormatDateTime';
import icons from '../../constants/icons';
import ScanIcon from '../../components/client/home/ScanIcon';

const BookingsBox = ({ type, title, workerId, date, time, amount, qrcode, jobStatus, id }) => {
    const router = useRouter();
    const [worker, setWorker] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [alertDetails, setAlertDetails] = useState({
        cancelMsg: '',
        alertTitle: '',
        image: '',
        message: '',
        cancelColor: '',
        cancelTextStyle: '',
        confirmButton: false,
    });

    const fetchWorker = async () => {
        try {
            const response = await axios.get(
                `http://192.168.1.3:8010/worker/${workerId}`
            );
            setWorker(response.data);
        } catch (error) {
            console.error("Error fetching Worker Details:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (workerId) fetchWorker();
    }, [workerId]);

    const handleCancelAppointment = () => {
        setIsAlertVisible(true);
        setAlertDetails({
            cancelMsg: 'Cancel',
            alertTitle: 'Cancel Appointment',
            image: 'cancel',
            message: 'Are you sure you want to cancel the appointment?',
            cancelColor: 'white',
            cancelTextStyle: '',
            confirmButton: true,
        });
    };

    const handleOnClose = () => setIsAlertVisible(false);

    const handleConfirmClose = async () => {
        const jobData = {
            scheduled: false,
            scheduledWorkerId: null,
            scheduledTime: null,
            scheduledDate: null,
        };

        try {
            const token = await AsyncStorage.getItem('token');
            const response = await fetch(`http://192.168.8.101:8010/job/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(jobData),
            });

            if (response.ok) {
                setAlertDetails({
                    cancelMsg: 'Got It!',
                    alertTitle: 'Success',
                    image: 'success',
                    message: 'Appointment cancelled successfully.',
                    cancelColor: 'white',
                    cancelTextStyle: '',
                    confirmButton: false,
                });
            } else {
                const errorData = await response.json();
                Alert.alert('Error', errorData.message || 'Failed to update the job.');
            }
        } catch (error) {
            console.error('Error updating the job:', error);
            Alert.alert('Error', 'Something went wrong. Please try again.');
        } finally {
            setIsAlertVisible(true);
        }
    };

    if (loading) {
        return (
            <SafeAreaView className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="orange" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="rounded-xl mt-3 mx-auto shadow-sm w-11/12 h-60 border border-gray-300 flex flex-col">
            <View className="flex-row left-4 -mt-3 items-center">
                <View className="items-center rounded-full border border-gray-100">
                    <Image
                        source={{ uri: worker?.userId?.profilePic }}
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
                <TouchableOpacity onPress={() => router.push({ pathname: "/pages/client/mybookings/qrscanner", params: { qrcode, jobStatus, title, id, workerId } })}>
                    <ScanIcon icon={icons.scanner} />
                </TouchableOpacity>
            </View>
            <View className="flex-row mt-3 justify-evenly">
                <View className="bg-blue-300 rounded-lg px-2 h-[30px] flex-row items-center gap-1">
                    <Image source={icons.calendar} className="w-4 h-4 mb-1" resizeMode="contain" />
                    <Text className="text-xs mb-1">{FormatDateTime(date)}</Text>
                </View>
                <View className="bg-green-300 rounded-lg px-1 h-[30px] flex-row items-center gap-1">
                    <Image source={icons.clock} className="w-4 h-4 mb-1" resizeMode="contain" />
                    <Text className="text-xs mb-1">{time}</Text>
                </View>
                {amount && (
                    <View className="bg-amber-300 rounded-lg px-1 h-[30px] flex-row items-center gap-1">
                        <Image source={icons.earnings} className="w-4 h-4 mb-1" resizeMode="contain" />
                        <Text className="text-xs mb-1">{amount}</Text>
                    </View>
                )}
            </View>
            <View className="flex-row mt-4 justify-center px-1">
                <TouchableOpacity className=" bg-red-800 rounded-lg px-3 h-[35px] flex-row w-11/12 justify-center" onPress={handleCancelAppointment}>
                    <View>
                        <Text className="mt-2 text-center text-white font-medium">Cancel Appointment</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <ConfirmationBox
                visible={isAlertVisible}
                image={alertDetails.image}
                message={alertDetails.message}
                title={alertDetails.alertTitle}
                cancelColor={alertDetails.cancelColor}
                cancelTextStyle={alertDetails.cancelTextStyle}
                onCancelMsg={alertDetails.cancelMsg}
                confirmButton={alertDetails.confirmButton}
                onConfirmMesg={"Yes"}
                onConfirm={handleConfirmClose}
                onCancel={handleOnClose}
            />
        </SafeAreaView>
    );
};

export default BookingsBox;
