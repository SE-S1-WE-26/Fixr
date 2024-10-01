import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar } from 'react-native-calendars';
import icons from '../../../../constants/icons';
import CustomButton from '../../../../components/common/CustomButton';
import AlertBox from '../../../../components/client/AlertBox';  

const scheduleAppointment = () => {
    const [selectedDate, setSelectedDate] = useState('2024-10-03');  // Default selected date
    const [isAlertVisible, setIsAlertVisible] = useState(false);      // Alert state
    const [alertMessage, setAlertMessage] = useState('');             // Alert message
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');

    // Dates with special markings
    const markedDates = {
        '2024-09-19': { selected: true, selectedColor: '#D9534F', disabled: true }, // Red (occupied)
        '2024-09-21': { selected: true, selectedColor: '#D9534F', disabled: true }, // Red (occupied)
        '2024-09-25': { selected: true, selectedColor: '#B0BEC5' }, // Grey (weather warning)
        '2024-09-16': { selected: true, selectedColor: '#B0BEC5' }, // Grey (weather warning)
        [selectedDate]: { selected: true, selectedColor: '#2D9CDB' } // Selected date (blue)
    };

    // Time Slots
    const timeSlots = [
        "06.30 - 11.30 AM", "12.00 - 05.00 PM", "06.30 - 11.30 AM",
        "12.00 - 05.00 PM", "06.30 - 11.30 AM", "12.00 - 05.00 PM",
    ];

    // Handle Date Selection
    const handleDayPress = (day) => {
        const dateString = day.dateString;

        // If the date is occupied, show custom alert
        if (markedDates[dateString]?.selectedColor === '#D9534F') {
            setAlertMessage('Sorry, the selected date is fully booked! Please select another date.');
            setIsAlertVisible(true);
            setTitle("Error");
            setImage("close");
        }
        // If the date has a weather warning, show custom alert
        else if (markedDates[dateString]?.selectedColor === '#B0BEC5') {
            setAlertMessage('This date has a weather warning. Please take precautions.');
            setIsAlertVisible(true);
            setTitle("Weather Warning");
            setImage("weatherWarning");
        }
        else {
            // If it's a regular selectable date
            setSelectedDate(dateString);
        }
    };

    return (
        <SafeAreaView className="bg-white h-full">
            <ScrollView>
                {/* Header */}
                <View className="w-full px-4 md:px-6">
                    <Text className="text-3xl md:text-4xl font-bold">Schedule Appointment</Text>
                </View>

                {/* Worker Information */}
                <View className="flex-row ml-2 mt-4">
                    <Image
                        source={icons.worker}
                        className="w-14 h-14"
                        resizeMode='contain'
                    />
                    <Text className="text-xl font-bold ml-5 mt-5">Amila Fernando</Text>
                </View>

                {/* Job Estimation */}
                <View className="flex-col ml-4 mt-2">
                    <Text className="text-lg font-semibold">Job Estimation</Text>
                    <View className="flex-row mt-2">
                        <Image
                            source={icons.clock}
                            className="w-5 h-5"
                            resizeMode='contain'
                            tintColor={"#F9B42B"}
                        />
                        <Text className="text-base font-medium ml-2" >5 Hours</Text>
                    </View>
                    <View className="flex-row mt-1">
                        <Image
                            source={icons.earnings}
                            className="w-5 h-5"
                            resizeMode='contain'
                            tintColor={"#F9B42B"}
                        />
                        <Text className="text-base font-medium ml-2">LKR 2,500</Text>
                    </View>
                </View>

                {/* Select Date Section */}
                <Text className="text-lg font-semibold ml-4 mt-4">Select Date</Text>
                <View className="mx-4 my-2">
                    <Calendar
                        // Mark the selected, occupied, and weather warning dates
                        markedDates={markedDates}
                        // Handle date selection
                        onDayPress={handleDayPress}
                    />
                </View>

                {/* Select Available Time Slot */}
                <Text className="text-lg font-semibold ml-4 mt-4">Select Available Time Slot</Text>
                <View className="flex-wrap flex-row justify-center mt-2 mb-4">
                    {timeSlots.map((slot, index) => (
                        <TouchableOpacity key={index} className="bg-gray-200 p-3 m-1 rounded-lg">
                            <Text className="text-xs">{slot}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Confirm Button */}
                {/* <View className="px-6">
                    <TouchableOpacity className="bg-yellow p-2 rounded-xl items-center mb-4">
                        <Text className="text-white text-lg font-bold">Confirm</Text>
                    </TouchableOpacity>
                </View> */}
                <CustomButton
                    title={"Confirm"}
                    handlePress={() => router.push('../screens/client/mybookings/myJobPosts')}
                    containerStyles={"mx-4 mb-5"}
                />
            </ScrollView>
            {/* Custom AlertBox Component */}
            <AlertBox
                visible={isAlertVisible}
                onClose={() => setIsAlertVisible(false)}
                message={alertMessage}
                image={image}
                title={title}
            />

        </SafeAreaView>
    );
};

export default scheduleAppointment;
