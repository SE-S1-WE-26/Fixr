import { View, Text, Image } from "react-native";
import React from "react";
import FormatCurrency from "../../../utils/FormatCurrency";

import { images } from "../../../constants";

const LeaderboardCard = ({ worker,place }) => {
  // Check if the worker is not null and contains the necessary fields
  if (!worker || !worker.workerId || !worker.workerId.userId) {
    return null; // Render nothing if the worker is not yet loaded
  }
  return (
    <View className="flex flex-row mt-2 rounded-xl bg-powder py-4 px-3 mx-4 sm:mx-6 shadow items-center justify-between">
      <View className='flex flex-row items-center'>
        <View className="relative">
          <Image source={{ uri: worker?.workerId?.userId?.profilePic }}  className="w-14 h-14 sm:w-16 sm:h-16 bg-slate-100 rounded-full" />
          {
            place === 2 ? (
              <Image source={images.silver} className="absolute w-8 h-8 bottom-0 -right-1" />
            ) : (
              <Image source={images.bronze} className="absolute w-8 h-8 bottom-0 -right-1" />
            )
          }
        </View>
        <View className="ml-3 sm:ml-4">
          <Text className="text-base sm:text-lg font-bold">{worker.workerId.userId.name}</Text>
          <View>
            <Text className="text-xs sm:text-sm font-semibold">Total Earnings</Text>
            <Text className="text-xl sm:text-2xl font-bold text-orange">LKR {FormatCurrency(worker.workerId.earnings)}</Text>
          </View>
        </View>
      </View>
      <View className="items-center bg-orange px-3 sm:px-4 py-1 sm:py-2 rounded-xl sm:rounded-2xl shadow">
        <Text className="text-xs sm:text-sm font-semibold text-white">Ratings</Text>
        <View className="flex flex-row items-center">
          <Text className="font-bold text-xl sm:text-2xl text-[#FFECAE]">{worker.workerId.userId.rating}</Text>
          <Text className="font-bold text-xl sm:text-2xl text-[#FFECAE]">/5</Text>
        </View>
      </View>
    </View>
  );
};

export default LeaderboardCard;
