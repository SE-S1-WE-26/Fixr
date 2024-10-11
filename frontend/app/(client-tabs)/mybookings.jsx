import React, { useEffect, useState } from "react";
import { View, ScrollView, Image,ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/common/Header";
import BookingsBox from "../../components/client/BookingsBox";
import images from "../../constants/images";
import CustomButton from "../../components/common/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const MyBookings = () => {
  const router = useRouter();
  const [scheduledJobs, setScheduledJobs] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMyScheduledJobs = async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch('http://192.168.8.101:8010/job/client/scheduled', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch worker data');
      }

      const data = await response.json();
      setScheduledJobs(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMyScheduledJobs();
  }, []);

  const renderBookingsList = () => (
    <View className="flex-col">
      {scheduledJobs?.map((job) => (
        <BookingsBox
          key={job._id}
          type={job.category}
          title={job.title}
          date={job.scheduledDate}
          time={job.scheduledTime}
          amount={job.jobCost}
          qrcode={job._id}
          id={job._id}
          workerId={job.scheduledWorkerId._id}
          jobStatus={job.status}
        />
      ))}
    </View>
  );

  if (isLoading) {
    return (
      <SafeAreaView className="h-full bg-white">
        <ScrollView>
          <View className="w-full h-full flex justify-center items-center">
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView>
        <View className="w-full h-full">
          <Header title={"My Bookings"} />
          <Image
            source={images.myBookings}
            className="mx-auto"
          />
          
          {renderBookingsList()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyBookings;
