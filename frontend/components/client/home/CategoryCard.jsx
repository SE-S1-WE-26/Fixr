import { View, Text, Image,TouchableOpacity } from 'react-native';
import React from 'react';

const CategoryCard = ({ data }) => {
  return (
    <TouchableOpacity
      key={data.title}
      className="flex max-w-[100px] items-center justify-center px-5 py-3 shadow bg-powder rounded-lg"
    >
      <View className='bg-white p-4 rounded-full'>
      <Image source={data.icon} className="w-12 h-12" />
      </View>
      <Text className="text-base font-medium mt-2" numberOfLines={1}>{data.title}</Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;
