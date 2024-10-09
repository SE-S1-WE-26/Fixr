import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import StarRating from "react-native-star-rating-widget";
import { icons } from "../../../constants";
import { useRouter } from "expo-router";

const TopWorkerCard = ({ data }) => {
  const router = useRouter();
  const handlePress = () => {
    router.push({
      pathname: "/pages/client/home/ContactWorker",
      params: { worker: JSON.stringify(data) }, // Passing worker data
    });
  };

  return (
    <TouchableOpacity className="bg-powder shadow px-2 pt-2 pb-2 rounded-lg max-w-[155px]"
      onPress={handlePress} // Navigate to ContactWorker on press
    >
      <View>
        <Image
          source={data.image}
          className="w-32 h-32 rounded-lg bg-gray-200 mx-auto"
        />
      </View>
      <View className="mt-2 items-start">
        <Text className="font-bold" numberOfLines={1}>
          {data.name}
        </Text>
        <View>
          <Text numberOfLines={1}>{data.type}</Text>
          <View className='flex flex-row items-center'>
            <Text className='flex flex-row my-2 bg-gray-200 rounded-xl p-1'>{data.rating}</Text>
            <StarRating
              className='ml-1'
              rating={data.rating}
              starSize={16}
              starStyle={{ marginHorizontal: 0 }}
            />
          </View>
        </View>
      </View>
      <TouchableOpacity className="absolute top-0 right-0 bg-white pr-2 pt-2 pb-1 pl-2 rounded-bl-xl rounded-tr-lg">
        <Image
          source={data.fav ? icons.redlike : icons.like}
          className={` w-6 h-6 ${data.fav ? "" : "opacity-30"}`}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default TopWorkerCard;
