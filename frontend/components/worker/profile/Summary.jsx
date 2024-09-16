import { View, Text } from "react-native";
import React from "react";

const Summary = () => {
  return (
    <View className="flex mt-2 rounded-xl bg-powder shadow px-4 md:px-5 py-4 md:py-5 mx-4 md:mx-6 justify-center">
      <View className="flex flex-row justify-between">
        <View className="grow flex-col bg-white shadow p-3 md:p-4 rounded-lg mr-2 md:mr-2 justify-center">
          <Text className="font-semibold text-lg md:text-xl">Total Earnings</Text>
          <View className='flex flex-row items-center'>
            <Text className="font-bold text-xl md:text-2xl">LKR</Text>
            <Text className="font-bold text-2xl md:text-4xl ml-1 md:ml-2 text-orange">34,575.00</Text>
          </View>
        </View>
        <View className="flex flex-col items-center bg-orange shadow p-3 md:p-4 rounded-lg">
          <Text className="font-bold text-2xl md:text-3xl text-[#FFECAE]">4.8</Text>
          <Text className="font-semibold text-xs md:text-sm">Current</Text>
          <Text className="font-semibold text-xs md:text-sm">Rating</Text>
        </View>
      </View>
      <View className="flex flex-row justify-between items-center bg-white shadow p-3 md:p-4 rounded-lg mt-2">
        <Text className="font-semibold text-lg md:text-xl">Overall Performance</Text>
        <Text className="font-bold text-xl md:text-2xl text-green-900">High</Text>
      </View>
      <View className="flex flex-row justify-between mt-2">
        <View className="flex flex-col items-center bg-[#BD5C25] shadow p-3 md:p-4 rounded-lg">
          <Text className="font-semibold text-white text-sm md:text-base">Completed Jobs</Text>
          <Text className="font-bold text-2xl md:text-3xl text-[#FFB783]">12</Text>
        </View>
        <View className="grow flex-row justify-between items-center bg-white shadow p-3 md:p-4 rounded-lg ml-2 md:ml-2">
          <Text className="font-bold text-2xl md:text-4xl text-orange">358</Text>
          <Text className="font-semibold text-sm md:text-base">Hours Worked</Text>
        </View>
      </View>
    </View>
  );
};

export default Summary;
