import { View, Text, FlatList } from "react-native";
import React from "react";

const JobInfo = () => {
  return (
    <View className="flex mt-2 rounded-xl bg-powder shadow px-5 py-5 mx-6">
      <View className="flex flex-row justify-between">
        <View>
          <Text className='text-base font-medium'>Location</Text>
          <Text className='text-lg font-bold'>Malabe, Sri Lanka</Text>
        </View>
        <View className="items-end">
          <Text className='text-base font-medium'>Est. Job Time</Text>
          <Text className='text-4xl font-bold text-orange'>10 Hrs</Text>
        </View>
      </View>
      <Text className="my-6">Description</Text>
      <View>
        <FlatList
          horizontal
        />
      </View>
      <View>
        <Text className='text-base font-medium'>Est. Job Cost</Text>
        <Text className='text-4xl font-bold text-orange'>LKR 5,000.000</Text>
      </View>
    </View>
  );
};

export default JobInfo;
