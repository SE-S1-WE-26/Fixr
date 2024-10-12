import { View, Text, Image, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileCard = () => {
  const [workerData, setWorkerData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMyData = async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch('https://fixerbackend.vercel.app/worker/mydata', {
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
      setWorkerData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMyData();
  }, []);


  return (
    <View className="flex mt-2 rounded-xl bg-powder shadow px-4 md:px-5 pt-4 md:pt-5 pb-3 mx-4 md:mx-6 justify-center">
      {isLoading ? (
        <ActivityIndicator color="#F59E2B" />
      ) : (
        <View>
          <View className="flex-col items-center justify-center">
            <Image 
              source={{ uri: workerData?.userId?.profilePic }} 
              style={{ width: 80, height: 80 }} 
              className="rounded-full" 
            />
            <Text className="text-3xl md:text-4xl font-bold mt-2">
              {workerData?.userId?.name}
            </Text>
            <Text className="font-semibold text-base md:text-lg">
              {workerData?.category}
            </Text>
          </View>
          <View className="py-2 gap-1">
            <View className="flex flex-row">
              <Text className="font-medium text-sm md:text-base">Age: </Text>
              <Text className="text-sm md:text-base">
                {workerData?.age} Years
              </Text>
            </View>
            <View className="flex flex-row">
              <Text className="font-medium text-sm md:text-base">Experience: </Text>
              <Text className="text-sm md:text-base">
                {workerData?.experience} Years
              </Text>
            </View>
          </View>
          <View className='flex flex-row justify-between mt-2'>
            <View className='px-3 md:px-5 bg-green-900 rounded-lg'>
              <Text className="text-sm md:text-lg font-bold text-white">
                {workerData?.phone}
              </Text>
            </View>
            <View className='px-3 md:px-5 bg-black-900 rounded-lg'>
              <Text className="text-sm md:text-lg font-bold text-white">
                {workerData?.userId?.location}
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default ProfileCard;
