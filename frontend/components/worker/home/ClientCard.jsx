import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

import { icons } from "../../../constants";

const ClientCard = () => {
  return (
    <View className="flex mt-2 rounded-xl px-5 py-5 mx-6">
      <View className="flex flex-row justify-between">
        <View className='flex flex-row items-center'>
          <Image source={icons.client} className="w-14 h-14" />
          <View className='ml-4'>
            <Text className='text-lg font-semibold'>Nishan Kumara</Text>
            <Text>Member Since: Jan, 2023</Text>
            <Text>Ratings</Text>
          </View>
        </View>
        <View>
          <TouchableOpacity className="py-2 px-4 bg-green-900 rounded-lg">
            <Text className="text-white">Call</Text>
          </TouchableOpacity>
          <TouchableOpacity className="py-2 px-4 bg-black-900 rounded-lg mt-2">
            <Text className="text-white">Chat</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity className="bg-orange p-4 rounded-lg items-center mt-2">
        <Text className="text-white font-semibold">Apply For The Job</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ClientCard;
