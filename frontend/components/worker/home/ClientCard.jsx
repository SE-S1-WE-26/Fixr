import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import StarRating from "react-native-star-rating-widget";

const ClientCard = ({client,setLoading}) => {
  return (
    <View className="flex mt-2 rounded-xl px-5 py-5 mx-6">
      <View className="flex flex-row justify-between">
        <View className='flex flex-row items-center'>
          <Image source={{ uri: client.userId.profilePic }} className="w-14 h-14 rounded-full" />
          <View className='ml-4'>
            <Text className='text-lg font-semibold'>{client.userId.name}</Text>
            <Text className='text-slate-500 my-1'>{client.userId.email}</Text>
            <View className='flex flex-row items-center'>
            <Text className='my-1'>Ratings :</Text>
            <Text className='rounded-full my-1 bg-gray-200 px-1 ml-2'>{client.userId.rating}</Text>
            <StarRating
              className='ml-1'
              rating={client.userId.rating}
              starSize={16}
              starStyle={{ marginHorizontal: 0 }}
            />
            </View>
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
