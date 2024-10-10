import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { icons } from "../../../constants";
import StarRating from "react-native-star-rating-widget";

const TopWorkerCard = ({ worker, isFavorite }) => {
  // State to manage the favorite status
  const [favorite, setFavorite] = useState(isFavorite);

  useEffect(() => {
    setFavorite(isFavorite); // Sync initial state
  }, [isFavorite]);

  const handleFavorite = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.post(
        'http://192.168.1.3:8010/client/favorite',
        { workerId: worker._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Toggle the favorite status in the state based on response
      if (response.status === 200) {
        setFavorite(!favorite);
        console.log("Toggled favorite status for worker:", worker);
      }
    } catch (error) {
      console.error("Error toggling favorite status:", error);
    }
  };

  return (
    <TouchableOpacity className="bg-powder border border-2 border-platinum shadow px-2 pt-2 pb-2 rounded-lg max-w-[150px] my-4">
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
      <TouchableOpacity className="absolute top-0 right-0 bg-white pr-2 pt-2 pb-1 pl-2 rounded-bl-xl rounded-tr-lg" onPress={handleFavorite}>
        <Image
          source={favorite ? icons.redlike : icons.like}
          className={`w-6 h-6 ${favorite ? "" : "opacity-30"}`}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default TopWorkerCard;
