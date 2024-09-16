import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

import { icons } from "../../../constants";

const RecommendedJobCard = () => {
  const router = useRouter();

  const handleNavigation = () => {
    console.log("Navigating to Job Details");
    router.push("/pages/worker/home/jobdetails");
  };

  return (
    <View className="flex min-h-[140px] mt-2 rounded-xl bg-powder shadow px-4 py-3 justify-center">
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
              Leaky Kitchen Sink
            </Text>
            <Text className="text-sm md:text-base">Plumbing</Text>
            <Text className="text-sm md:text-base">Malabe, Sri Lanka</Text>
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
            LKR 5,000.00
          </Text>
        </View>
        <View className="items-end">
          <Text className="text-sm md:text-base">Est. Job Time</Text>
          <Text className="text-2xl md:text-3xl font-bold text-orange">
            10 Hrs
          </Text>
        </View>
      </View>
    </View>
  );
};

export default RecommendedJobCard;
