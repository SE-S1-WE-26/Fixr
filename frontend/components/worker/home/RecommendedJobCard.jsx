import { View, Text, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { React, useEffect, useState } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import FormatCurrency from '../../../utils/FormatCurrency';
import axios from "axios";

import { icons } from "../../../constants";

const RecommendedJobCard = ({ job }) => {
  const router = useRouter();
  const [loading, setIsLoading] = useState(true); // Set loading true initially
  const [workerData, setWorkerData] = useState(null);
  const [client, setClient] = useState(null);
  
  const calcJobCost = (workerData, jobDuration) => {
    return (workerData?.hourlyRate * jobDuration).toFixed(2);
  };

  const handleNavigation = () => {
    console.log("Navigating to Job Details");
    router.push({
      pathname: "/pages/worker/home/jobdetails",
      params: { jobId: job._id, jobCost: calcJobCost(workerData, job.estDuration) }
    });
    console.log("Job ID to navigate:", job._id);
  };

  const fetchMyData = async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch('http://192.168.1.3:8010/worker/mydata', {
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

  const fetchClientData = async (clientId) => {
    try {
      const response = await axios.get(`http://192.168.1.3:8010/client/${clientId}`);
      setClient(response.data);
    } catch (error) {
      console.error("Error fetching client:", error.message);
    }
  };

  useEffect(() => {
    fetchMyData();
    if (job.clientId && job.clientId._id) {
      fetchClientData(job.clientId._id);
    }
  }, []);

  // Show loading indicator if loading or client is not yet loaded
  if (loading || !client) {
    return (
      <View className="flex min-h-[140px] min-w-[380px] max-w-[380px] my-4 rounded-xl bg-powder shadow px-4 py-3 justify-center items-center">
        <ActivityIndicator size="large" color="orange" />
      </View>
    );
  }

  return (
    <View className="flex min-h-[140px] min-w-[380px] max-w-[380px] my-4 rounded-xl bg-powder shadow px-4 py-3 justify-center">
      {/* Top Section with Job and Client Info */}
      <View className="flex flex-row items-center">
        <View className="flex flex-row items-center">
          <Image
            source={{ uri: client.userId.profilePic }}
            className="rounded-full bg-orange h-14 w-14"
          />
          <View className="ml-4">
            <Text
              className="text-xl md:text-2xl font-semibold max-w-[220px] truncate"
              numberOfLines={1}
            >
              {job.title}
            </Text>
            <Text className="text-sm md:text-base">{job.category}</Text>
            <Text className="text-sm md:text-base">{job.city}, Sri Lanka</Text>
          </View>
        </View>
        <TouchableOpacity
          className="p-2 rounded-lg absolute right-0"
          onPress={handleNavigation}
        >
          <Image
            source={icons.next}
            className="rounded-full h-10 w-10"
            tintColor={'orange'}
          />
        </TouchableOpacity>
      </View>

      {/* Bottom Section with Cost and Time Info */}
      <View className="flex-row justify-between mt-3">
        <View>
          <Text className="text-sm md:text-base">Est. Job Cost</Text>
          <Text className="text-2xl md:text-3xl font-bold text-orange">
            LKR {FormatCurrency(calcJobCost(workerData, job.estDuration))}
          </Text>
        </View>
        <View className="items-end">
          <Text className="text-sm md:text-base">Est. Job Time</Text>
          <Text className="text-2xl md:text-3xl font-bold text-orange">
            {job.estDuration} Hours
          </Text>
        </View>
      </View>
    </View>
  );
};

export default RecommendedJobCard;
