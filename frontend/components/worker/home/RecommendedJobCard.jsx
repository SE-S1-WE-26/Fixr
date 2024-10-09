import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import FormatCurrency from '../../../utils/FormatCurrency'

import { icons } from "../../../constants";

const RecommendedJobCard = ({job}) => {
  const router = useRouter();

  const handleNavigation = () => {
    console.log("Navigating to Job Details");
    // Pass the job ID as a parameter
    router.push({
      pathname: "/pages/worker/home/jobdetails",
      params: { jobId: job._id } // Ensure the job ID is being sent correctly
    });
    console.log("Job ID to navigate:", job._id); // Check if job._id is defined
  };
  

  return (
    <View className="flex min-h-[140px] my-4 rounded-xl bg-powder shadow px-4 py-3 justify-center">
      {/* Top Section with Job and Client Info */}
      <View className="flex flex-row justify-between items-center">
        <View className="flex flex-row items-center">
          <Image
            source={icons.client}
            className="rounded-full bg-orange h-14 w-14"
          />
          <View className="ml-4">
            <Text
              className="text-xl md:text-2xl font-semibold"
              numberOfLines={1}
            >
              {job.title}
            </Text>
            <Text className="text-sm md:text-base">{job.category}</Text>
            <Text className="text-sm md:text-base">{job.city}, Sri Lanka</Text>
          </View>
        </View>
        <TouchableOpacity
          className="p-2 rounded-lg"
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
          LKR {FormatCurrency(parseFloat(job.jobCost))}
          </Text>
        </View>
        <View className="items-end">
          <Text className="text-sm md:text-base">Est. Job Time</Text>
          <Text className="text-2xl md:text-3xl font-bold text-orange">
          {job.estDuration}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default RecommendedJobCard;
