import { View, Text, Image } from "react-native";
import React from "react";

import { icons } from "../../../constants";

const ProfileCard = () => {
  return (
    <View className="flex mt-2 rounded-xl bg-powder shadow px-4 md:px-5 pt-4 md:pt-5 pb-3 mx-4 md:mx-6 justify-center">
      <View className="flex-col items-center justify-center">
        <Image source={icons.worker} style={{ width: 80, height: 80 }} className="rounded-full" />
        <Text className="text-3xl md:text-4xl font-bold mt-2">Janaka Perera</Text>
        <Text className="font-semibold text-base md:text-lg">Electrician</Text>
      </View>
      <View className="py-2 gap-1">
        <View className="flex flex-row">
          <Text className="font-medium text-sm md:text-base">Age : </Text>
          <Text className="text-sm md:text-base">28 Years</Text>
        </View>
        <View className="flex flex-row">
          <Text className="font-medium text-sm md:text-base">Experience : </Text>
          <Text className="text-sm md:text-base">4 Years</Text>
        </View>
        <View className="flex flex-row">
          <Text className="font-medium text-sm md:text-base">Description : </Text>
          <Text className="text-sm md:text-base">I'm fixing anything</Text>
        </View>
      </View>
      <View className='flex flex-row justify-between mt-2'>
        <View className='px-3 md:px-5 bg-green-900 rounded-lg'>
          <Text className="text-sm md:text-lg font-bold text-white">071 123 4567</Text>
        </View>
        <View className='px-3 md:px-5 bg-black-900 rounded-lg'>
          <Text className="text-sm md:text-lg font-bold text-white">Malabe, Sri Lanka</Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileCard;
