import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar } from 'react-native-calendars';
import icons from '../../../../constants/icons';
import CustomButton from '../../../../components/common/CustomButton';
import ConfirmationBox from '../../../../components/client/ConfirmationBox';
import { useGlobalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ScheduleAppointment = () => {
    const [selectedDate, setSelectedDate] = useState(''); // Default selected date
    const [isAlertVisible, setIsAlertVisible] = useState(false);      // Alert state
    const [alertMessage, setAlertMessage] = useState('');             // Alert message
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [confirmButton, setConfirmButton] = useState(false);
    const [cancelMsg, setCancelMsg] = useState('');
    const [cancelColor, setCancelColor] = useState('');
    const [cancelTextStyle, setCancelTextStyle] = useState('');
    const params = useGlobalSearchParams();
    const { jobId, handymanId } = params;
    const router = useRouter();
    const [job, setJob] = useState('');
    const [estCost, setEstCost] = useState(null);
    const [handyman, setHandyman] = useState('');
    const [weatherWarningMarkedDays, setWeatherWarningMarkedDays] = useState({});
    const [workerSchedules, setWorkerSchedules] = useState([]);
    const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [durationInHours, setDurationInHours] = useState(null);
    const [selectedWeatherDay, setSelectedWeatherDay] = useState(false);

    // Add state variables to hold scheduled data
    const [scheduledDate, setScheduledDate] = useState('');
    const [formattedTimescheduledTime, setScheduledTime] = useState('');
    const [scheduledWorkerId, setScheduledWorkerId] = useState('');

    // Function to fetch worker schedules
    const fetchWorkerSchedules = async () => {
        try {
            const response = await axios.get(`https://fixerbackend.vercel.app/slots/${handymanId}`);
            setWorkerSchedules(response.data);
            console.log("Fetched Schedules: ", response.data)
        } catch (error) {
            console.error('Error fetching worker schedules:', error.response?.data || error.message);
        }
    };


    // Function to fetch weather forecast data for a given latitude and longitude
    const fetchWeatherForecast = async (latitude, longitude) => {
        try {
            const response = await axios.get(`https://api.open-meteo.com/v1/forecast`, {
                params: {
                    latitude: latitude,
                    longitude: longitude,
                    hourly: 'precipitation',
                    start: new Date().toISOString().split('T')[0], // Start from today
                    timezone: 'GMT', // Fetch data in GMT (UTC)
                    forecast_days: 16, // Forecast for up to 16 days
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching weather data:", error);
            return null;
        }
    };

    // Function to fetch latitude and longitude using a city name
    const fetchGeocode = async (city) => {
        try {
            const response = await axios.get(`https://geocoding-api.open-meteo.com/v1/search`, {
                params: {
                    name: city,
                    count: 1,
                    language: 'en',
                    format: 'json',
                },
            });
            // Check if results are available and return the first one
            if (response.data.results && response.data.results.length > 0) {
                const { latitude, longitude } = response.data.results[0]; // Get the first result
                return { latitude, longitude };
            } else {
                console.error("No results found for the specified city.");
                return null;
            }
        } catch (error) {
            console.error("Error fetching geocode:", error);
            return null;
        }
    };

    // Function to convert UTC time to Sri Lanka time (GMT +5:30)
    const convertToSriLankaTime = (utcTime) => {
        const date = new Date(utcTime);
        date.setHours(date.getHours() + 5);     // Add 5 hours
        date.setMinutes(date.getMinutes() + 30); // Add 30 minutes
        return date;
    };

    // Function to process weather data and find rainy days between 6 AM and 10 PM
    const getRainWarningDays = (weatherData) => {
        const rainWarningDays = {};

        weatherData.hourly.time.forEach((utcTime, index) => {
            const localTime = convertToSriLankaTime(utcTime);
            const localHour = localTime.getHours();
            const date = localTime.toISOString().split('T')[0];

            // Check if precipitation occurs between 6 AM and 10 PM (Sri Lanka time)
            if (localHour >= 6 && localHour <= 22 && weatherData.hourly.precipitation[index] > 0) {
                rainWarningDays[date] = { selected: true, selectedColor: '#B0BEC5', disabled: true }; // Mark as weather warning
            }
        });

        return rainWarningDays;
    };

    const fetchJobAndWeather = async () => {
        if (jobId) {  // Ensure jobId exists before making the request
            try {
                const response = await axios.get(`https://fixerbackend.vercel.app/job/${jobId}`);
                setJob(response.data);
                console.log("Job data fetched:", response.data);

                // Fetch latitude and longitude for the city from the job details
                const geocodeData = await fetchGeocode(response.data.city);
                if (geocodeData) {
                    const { latitude, longitude } = geocodeData;
                    console.log("Latitute from api: ", latitude)
                    const weatherData = await fetchWeatherForecast(latitude, longitude);
                    if (weatherData) {
                        const rainWarningDays = getRainWarningDays(weatherData);
                        setWeatherWarningMarkedDays(rainWarningDays);
                    }
                }
            } catch (error) {
                console.error('Error fetching job:', error.response?.data || error.message);
            }
        }
        if (handymanId) {
            try {
                const response_handymen = await axios.get(`https://fixerbackend.vercel.app/worker/${handymanId}`);
                setHandyman(response_handymen.data);
                console.log("Handyman data fetched:", response_handymen.data);
                fetchWorkerSchedules();
                const durationInHours_val = Math.ceil(parseFloat(job.estDuration));
                const calculatedCost = durationInHours_val * handyman.hourlyRate;
                console.log("")
                setEstCost(calculatedCost);
                console.log("Est cost: ", estCost);
            } catch (error) {
                console.error('Error fetching handyman:', error.response?.data || error.message);
            }
        }
        if (job && handyman && estCost !== null && !isNaN(estCost)) {
            setIsLoading(false); // Stop loading once job and cost are valid
        }
    };

    // Effect to fetch job, handyman, and weather data
    useEffect(() => {
        fetchJobAndWeather();
    }, [jobId, handymanId]);

    useEffect(() => {
        if (job && handyman && !isNaN(parseFloat(job.estDuration))) {
            const durationInHours_val = Math.ceil(parseFloat(job.estDuration));
            setDurationInHours(durationInHours_val);
            setEstCost(durationInHours_val * handyman.hourlyRate);
        }
    }, [handyman, job]);

    useEffect(() => {
        if (job && handyman && estCost !== null && !isNaN(estCost)) {
            setIsLoading(false); // Stop loading once job and cost are valid
        }
    }, [job, estCost, handyman]);

    // Effect to generate available time slots when worker schedules change
    useEffect(() => {
        if (workerSchedules.length > 0 && job) {
            // Convert duration string to float
            const durationInHours = Math.ceil(parseFloat(job.estDuration));
            generateAvailableTimeSlots(durationInHours);
        }
    }, [workerSchedules, job]);

    // Dates with special markings
    const markedDates = {
        ...weatherWarningMarkedDays, // Merge weather warning days here
        [selectedDate]: { selected: true, selectedColor: '#2D9CDB' }, // Selected date (blue)
        '2024-10-19': { selected: true, selectedColor: '#D9534F', disabled: true }, // Red (occupied)
        '2024-10-21': { selected: true, selectedColor: '#D9534F', disabled: true }, // Red (occupied)
    };

    const fetchWorkerSchedulesForDate = async (dateString) => {
        try {
            const response = await axios.get(`https://fixerbackend.vercel.app/slots/${handymanId}`);

            console.log("API Response: ", response.data); // Log the complete response

            // Ensure both occupiedSlots and blockedSlots are arrays
            const occupiedSchedules = Array.isArray(response.data.occupiedSlots) ? response.data.occupiedSlots : [];
            const blockedSchedules = Array.isArray(response.data.blockedSlots) ? response.data.blockedSlots : [];

            // Log the individual schedules
            console.log("Occupied Schedules: ", occupiedSchedules);
            console.log("Blocked Schedules: ", blockedSchedules);

            // Combine both schedules into a single array
            const schedules = [...occupiedSchedules, ...blockedSchedules];

            console.log("Combined schedules: ", schedules); // Log combined schedules

            // Ensure schedules is indeed an array
            if (!Array.isArray(schedules)) {
                throw new Error("Combined schedules is not an array.");
            }

            const selectedDate = new Date(dateString);
            selectedDate.setHours(0, 0, 0, 0); // Start of the day for comparison

            // Filter schedules for the selected date
            const filteredSchedules = schedules.filter(schedule => {
                const scheduleDate = new Date(schedule.from || schedule.to); // Compare from or to date
                return scheduleDate.toDateString() === selectedDate.toDateString(); // Match exact date
            });

            // Log filtered schedules
            console.log("Filtered Schedules: ", filteredSchedules);

            // Check if filteredSchedules is an array
            if (!Array.isArray(filteredSchedules)) {
                throw new Error("Filtered schedules is not an array.");
            }

            // Set worker schedules only if filteredSchedules is an array
            setWorkerSchedules(filteredSchedules);

            // Assuming `durationInHours` is set or available at this point
            console.log("Generate durationslots: ", durationInHours);
            generateAvailableTimeSlots(filteredSchedules, durationInHours);
        } catch (error) {
            console.error('Error fetching worker schedules in fetchWorkerSchedulesForDate:', error.response?.data || error.message);
        }
    };


    // Generate available time slots, excluding occupied and blocked times
    const generateAvailableTimeSlots = (schedules, duration) => {
        const timeSlots = [];
        const timeRangeStart = 6; // Start from 6 AM
        const timeRangeEnd = 22;  // End at 10 PM
        if (duration > 16) {
            duration = 16;
        }

        // Ensure schedules is an array
        if (!Array.isArray(schedules)) {
            console.error("Schedules is not an array:", schedules);
            return;
        }

        for (let hour = timeRangeStart; hour < timeRangeEnd; hour += duration) {
            const slotStart = `${hour}:00`;
            const slotEnd = `${hour + duration}:00`;

            // If the time exceeds the range, break the loop
            if (hour + duration > timeRangeEnd) break;

            // Check if the time slot overlaps with any occupied or blocked schedule
            const isSlotAvailable = schedules.every(schedule => {
                // Ensure the schedule has the expected properties
                if (!schedule.date || !schedule.startTime || !schedule.endTime) {
                    console.error("Schedule missing properties:", schedule);
                    return true; // If properties are missing, assume the slot is available
                }

                const scheduleStart = new Date(`${schedule.date}T${schedule.startTime}`).getHours();
                const scheduleEnd = new Date(`${schedule.date}T${schedule.endTime}`).getHours();

                // Ensure the slot does not overlap with any occupied or blocked slot
                return !(hour < scheduleEnd && (hour + duration) > scheduleStart);
            });

            if (isSlotAvailable) {
                timeSlots.push({ slot: `${slotStart} - ${slotEnd}`, startTime: slotStart, endTime: slotEnd });
            }
        }

        // Set available time slots
        setAvailableTimeSlots(timeSlots);
    };



    // Handle Date Selection
    const handleDayPress = (day) => {
        setIsLoading(true);
        setAvailableTimeSlots([]);
        const dateString = day.dateString;

        // If the date is occupied, show custom alert
        if (markedDates[dateString]?.selectedColor === '#D9534F') {

            setIsLoading(false);
            setAlertMessage('Sorry, the selected date is fully booked! Please select another date.');
            setIsAlertVisible(true);
            setTitle("Error");
            setImage("error");
            setConfirmButton(false);
            setCancelMsg("Close");
            setCancelColor("white");
            setCancelTextStyle('');
        }
        // If the date has a weather warning, show custom alert
        else if (markedDates[dateString]?.selectedColor === '#B0BEC5') {
            setSelectedWeatherDay(dateString);
            setIsLoading(false);
            setAlertMessage('This date has a weather warning. Do you still want to continue?');
            setIsAlertVisible(true);
            setTitle("Weather Warning");
            setImage("weatherWarning");
            setConfirmButton(true);
            setCancelMsg("No");
            setCancelColor("red-800");
            setCancelTextStyle('text-white');
        }
        else {
            // Set selected date
            setSelectedDate(dateString);

            // Fetch worker schedules for the selected date and generate available time slots
            fetchWorkerSchedulesForDate(dateString);
            setIsLoading(false);
        }
    };

    const handleYesWeatherWarning = async () => {
        setIsAlertVisible(false); // Close the alert
        setIsLoading(true); // Show loading spinner

        // Fetch worker schedules for the selected date and generate available time slots
        await fetchWorkerSchedulesForDate(selectedWeatherDay);
        setSelectedDate(selectedWeatherDay);

        setIsLoading(false); // Stop loading once the schedules are fetched
        
    };

        const handleCancel = () => {
            setIsAlertVisible(false);
        }

        const handleSlotSelect = (slot) => {
            setSelectedSlot(slot); // Assuming slot has the necessary properties
            console.log('Selected Slot:', slot); // Debug log to check what is being selected
        };

        // Updated updateJob function to accept parameters directly
        const updateJob = async ({ scheduledDate, scheduledTime, scheduledWorkerId }) => {
            if (!jobId) return;

            try {
                const token = await AsyncStorage.getItem('token');
                const response = await fetch(`https://fixerbackend.vercel.app/job/update/${jobId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        scheduled: true,
                        scheduledDate,
                        scheduledTime,
                        scheduledWorkerId,
                    }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                console.log("Job updated successfully:", data);
                setAlertMessage('Time slot successfully booked!');
                setIsAlertVisible(true);
                setTitle("Success");
                setImage("success");
                setConfirmButton(false);
                setCancelMsg("Close");
                setCancelColor("white");
                setCancelTextStyle('');

                // Delay the navigation using setTimeout
                setTimeout(() => {
                    router.push('../../../(client-tabs)/mybookings');
                }, 1800);
            } catch (error) {
                console.error('Error updating job:', error.message);
            }
        };

        const handleSlotConfirm = () => {
            if (selectedSlot) {
                // Prepare request body and call the API to confirm the selected slot
                const requestBody = {
                    occupiedSlots: [
                        {
                            from: selectedSlot.startTime, // 'YYYY-MM-DDTHH:MM:SS' in local time
                            to: selectedSlot.endTime,     // 'YYYY-MM-DDTHH:MM:SS' in local time
                            jobId: jobId || undefined,  // Only include jobId if it's defined
                            date: selectedDate,          // Include the date for clarity
                        }
                    ],
                };

                console.log("requestBody: ", requestBody.occupiedSlots[0].from);
                console.log("requestBody: ", requestBody.occupiedSlots[0].to);
                console.log("requestBody: ", requestBody.occupiedSlots[0].date);
                console.log("requestBody: ", requestBody.occupiedSlots[0].jobId);

                if(requestBody.occupiedSlots[0].from && requestBody.occupiedSlots[0].to && requestBody.occupiedSlots[0].date && requestBody.occupiedSlots[0].jobId){
                    axios.put(`https://fixerbackend.vercel.app/slots/update/${handymanId}`, requestBody)
                    .then(() => {
                        const slotStartTime = selectedSlot.startTime; // Assuming selectedSlot has a startTime property

                        // Format the time from the scheduled date
                        const formattedTime = new Date(slotStartTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                        // Ensure the selected date is properly formatted
                        const formattedDate = new Date(selectedDate); // Adjust format as needed

                        // Set scheduled date and time and ensure updateJob runs after all states are set
                        setScheduledDate(formattedDate);
                        setScheduledTime(selectedSlot.startTime);
                        setScheduledWorkerId(handymanId);

                        // Call updateJob only after all states are set
                        updateJob({
                            scheduledDate: formattedDate,
                            scheduledTime: selectedSlot.startTime,
                            scheduledWorkerId: handymanId,
                        });

                    })
                    .catch(error => {
                        console.error('Error saving the slot:', error);
                    });
                }
            } else {
                setAlertMessage('Please select a time slot before confirming!');
                setIsAlertVisible(true);
                setImage("error");
                setCancelMsg("Close")
                setTitle("Error")
            }
        };

        if (isLoading) {
            return (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size="large" color="orange" />
                    <Text>Loading...</Text>
                </View>
            );
        }

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
                            source={{uri : handyman.userId.profilePic}}
                            className="w-14 h-14 rounded-full bg-orange"
                            resizeMode='contain'
                        />
                        <Text className="text-xl font-bold ml-5 mt-5">{handyman.userId.name}</Text>
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
                            <Text className="text-base font-medium ml-2" >{job.estDuration} Hours</Text>
                        </View>
                        <View className="flex-row mt-1">
                            <Image
                                source={icons.earnings}
                                className="w-5 h-5"
                                resizeMode='contain'
                                tintColor={"#F9B42B"}
                            />
                            <Text className="text-base font-medium ml-2">LKR {estCost}</Text>
                        </View>
                    </View>

                    {/* Select Date */}
                    <Text className="text-lg font-semibold mt-5 ml-4">Select a Date:</Text>
                    <Calendar
                        current={selectedDate}
                        minDate={new Date().toISOString().split('T')[0]}
                        onDayPress={handleDayPress}
                        markedDates={markedDates}
                        theme={{
                            arrowColor: '#2D9CDB',
                            todayTextColor: '#2D9CDB',
                            selectedDayBackgroundColor: '#2D9CDB',
                            dayTextColor: 'black',
                        }}
                    />

                    {/* Time Slots */}
                    <Text className="text-lg font-semibold mt-5 ml-4">Select a Time Slot:</Text>
                    {/* Available Time Slots */}
                    <View className="flex-wrap flex-row mt-2 mb-4 justify-center">
                        {availableTimeSlots.map((slot, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => handleSlotSelect(slot)}
                                className={`p-3 m-1 rounded-lg ${selectedSlot === slot ? 'bg-yellow' : 'bg-gray-200'
                                    }`}
                            >
                                <Text className="text-xs">{slot.slot}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Schedule Button */}
                    <CustomButton
                        title={"Confirm"}
                        handlePress={handleSlotConfirm}
                        containerStyles={"mx-4 mb-5"}
                    />
                </ScrollView>

                {/* Confirmation Alert */}
                {isAlertVisible && (
                    <ConfirmationBox
                        visible={isAlertVisible}
                        image={image}
                        message={alertMessage}
                        title={title}
                        cancelColor={cancelColor}
                        onCancelMsg={cancelMsg}
                        confirmButton={confirmButton}
                        onConfirmMesg={"Yes"}
                        cancelTextStyle={cancelTextStyle}
                        onCancel={handleCancel}
                        onConfirm={handleYesWeatherWarning}
                    />
                )}
            </SafeAreaView>
        );
    };

    export default ScheduleAppointment;
