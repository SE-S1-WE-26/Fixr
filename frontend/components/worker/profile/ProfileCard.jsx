import { View, Text, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Social } from "../../../constants/constants";
import Feather from "@expo/vector-icons/Feather";

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
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch worker data");
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
    <View className="flex mt-2 rounded-xl bg-powder shadow border-4 border-platinum px-4 md:px-5 pt-4 md:pt-5 pb-3 mx-4 md:mx-6 justify-center">
      {isLoading ? (
        <ActivityIndicator color="#F59E2B" />
      ) : (
        <View>
          <View className="flex-col items-center justify-center">
            <View className='border-2 rounded-lg shadow border-platinum'>
              <View className='flex flex-row mx-8 my-4'>
                <View className="border border-1 border-platinum rounded-full">
                  <Image
                    source={{ uri: workerData?.userId?.profilePic }}
                    style={{ width: 100, height: 100 }}
                    className="rounded-full"
                  />
                </View>
                <View className="flex items-center justify-center ml-4">
                  <Text className="text-2xl md:text-4xl font-bold">
                    {workerData?.userId?.name}
                  </Text>
                  <Text className="font-medium text-base md:text-lg">
                    {workerData?.category}
                  </Text>
                  <View className='flex flex-row mt-2'>
                    {Social.map((social, index) => (
                      <View key={index} className="flex flex-row items-center">
                        <Image
                          source={social.icon}
                          style={{ width: 25, height: 25 }}
                        />
                        <Text className="text-sm md:text-base ml-2">
                          {workerData?.userId[social.name]}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
            <View style={{ flex: 1, marginRight: 5 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 8, backgroundColor: 'green', borderRadius: 8 }} className='justify-center'>
                <Feather name="phone-call" size={16} color="white" />
                <Text style={{ marginLeft: 8, fontSize: 14, color: 'white', fontWeight: 'bold' }}>
                  {workerData?.phone}
                </Text>
              </View>
            </View>
            <View style={{ flex: 1, marginLeft: 5 }}>
              <View style={{ paddingHorizontal: 10, paddingVertical: 8, backgroundColor: '#000', borderRadius: 8 }} className='flex justify-center'>
                <Text style={{ fontSize: 14, color: 'white', fontWeight: 'bold' }} className='text-center'>
                  {workerData?.userId?.location}
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default ProfileCard;
