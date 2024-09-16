import { View, Text, Image } from "react-native";
import React from "react";

import { icons } from "../../../constants";

const LeaderboardCard = ({ name, earnings, rating }) => {
  return (
    <View className="flex flex-row mt-2 rounded-xl bg-powder py-4 px-3 mx-4 sm:mx-6 shadow items-center justify-between">
      <View className='flex flex-row items-center'>
        <View className="relative">
          <Image source={icons.worker} className="w-14 h-14 sm:w-16 sm:h-16" />
          <Image source={icons.winner} className="absolute w-6 h-6 sm:w-8 sm:h-8 -bottom-1 sm:-bottom-2 right-0" />
        </View>
        <View className="ml-3 sm:ml-4">
          <Text className="text-base sm:text-lg font-bold">{name}</Text>
          <View>
            <Text className="text-xs sm:text-sm font-semibold">Total Earnings</Text>
            <Text className="text-xl sm:text-2xl font-bold text-orange">{earnings}</Text>
          </View>
        </View>
      </View>
      <View className="items-center bg-orange px-3 sm:px-4 py-1 sm:py-2 rounded-xl sm:rounded-2xl shadow">
        <Text className="text-xs sm:text-sm font-semibold text-white">Ratings</Text>
        <View className="flex flex-row items-center">
          <Text className="font-bold text-xl sm:text-2xl text-[#FFECAE]">{rating}</Text>
          <Text className="font-bold text-xl sm:text-2xl text-[#FFECAE]">/5</Text>
        </View>
      </View>
    </View>
  );
};

export default LeaderboardCard;
