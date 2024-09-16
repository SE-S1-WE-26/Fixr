import { View, Text, Image } from "react-native";
import React from "react";

import { icons } from "../../../constants";

const EOMWinner = () => {
  return (
    <View className="flex rounded-xl bg-powder pt-5 mx-4 sm:mx-6">
      <View className="relative flex flex-col items-center mb-10">
        <View className="absolute bg-orange text-[#FFECAE] px-4 py-1 rounded-lg z-10">
          <Text className="text-[#FFECAE] font-bold text-2xl sm:text-3xl">
            Janaka Perera
          </Text>
        </View>
        <Image source={icons.worker} className="w-32 h-32 sm:w-48 sm:h-48 m-8 sm:m-6" />
        <Image source={icons.winner} className="absolute w-16 h-16 sm:w-24 sm:h-24 -bottom-4 sm:-bottom-6" />
      </View>
      <View className="flex flex-row items-center">
        <View className="grow bg-powder shadow p-3 sm:p-4 rounded-xl sm:rounded-2xl">
          <Text className='font-semibold text-sm sm:text-base'>Total Earnings</Text>
          <Text className='font-bold text-2xl sm:text-3xl text-orange'>LKR 120,000.00</Text>
        </View>
        <View className="absolute right-0 items-center bg-orange p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow">
          <Text className='font-semibold mb-1 sm:mb-2 text-sm sm:text-base'>Ratings</Text>
          <View className="flex flex-row items-center">
            <Text className='font-bold text-3xl sm:text-5xl text-[#FFECAE]'>4.8</Text>
            <Text className='font-bold text-xl sm:text-3xl text-[#FFECAE]'>/5</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default EOMWinner;
