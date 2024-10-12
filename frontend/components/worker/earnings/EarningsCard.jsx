import { View, Text } from "react-native";
import React from "react";

const EarningsCard = ({ jobNo, date, earnings, time }) => {
  return (
    <View className="flex min-h-[80px] mt-2 rounded-xl bg-powder shadow px-4 md:px-5 py-3 mx-4 md:mx-6 justify-center">
      <View className="flex flex-row justify-between items-center mb-2">
        <Text className="text-sm md:text-base">Job No: {jobNo}</Text>
        <Text className="text-sm md:text-base">{date}</Text>
      </View>
      <View className="flex flex-row justify-between items-end">
        <View className="flex flex-row items-center">
          <Text className="font-bold text-xl md:text-2xl">LKR</Text>
          <Text className="font-bold text-3xl md:text-4xl ml-2 text-orange">{earnings}</Text>
        </View>
        <Text className="font-bold text-xl md:text-2xl">{time} Hours</Text>
      </View>
    </View>
  );
};

export default EarningsCard;
