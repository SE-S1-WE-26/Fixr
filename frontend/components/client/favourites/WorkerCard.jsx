import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { icons } from "../../../constants";
import StarRating from "react-native-star-rating-widget";
import { useRouter } from "expo-router";

const WorkerCard = ({ worker }) => {
    console.log(worker);
  return (
    <TouchableOpacity className="border-2 border-platinum bg-powder shadow px-2 pt-2 pb-2 rounded-lg max-w-[155px] my-4"
      // Navigate to ContactWorker on press
    >
      <View>
        <Image
          source={{ uri: worker?.userId?.profilePic }}
          className="w-32 h-32 rounded-lg bg-slate-100 mx-auto"
        />
      </View>
      <View className="mt-2 items-start">
        <Text className="font-bold text-lg" numberOfLines={1}>
          {worker?.userId?.name}
        </Text>
        <View>
          <Text numberOfLines={1}>{worker?.category}</Text>
          <View className='flex flex-row items-center mt-2'>
            <Text className='flex flex-row p-1 text-slate-500'>{worker?.userId?.rating}</Text>
            <StarRating
                    className="ml-1"
                    rating={worker?.userId?.rating}
                    starSize={16}
                    starStyle={{ marginHorizontal: 0 }}
                  />
          </View>
        </View>
      </View>
      {/* <TouchableOpacity className="absolute top-0 right-0 bg-white pr-2 pt-2 pb-1 pl-2 rounded-bl-xl rounded-tr-lg" >
        <Image
          source={favorite ? icons.redlike : icons.like}
          className={`w-6 h-6 ${favorite ? "" : "opacity-30"}`}
        />
      </TouchableOpacity> */}
    </TouchableOpacity>
  );
};

export default WorkerCard;
