import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import StarRating from "react-native-star-rating-widget";

const ClientCard = ({ client }) => {
  const [loadingImage, setLoadingImage] = useState(true); // State for image loading

  return (
    <View className="flex mt-2 rounded-xl px-5 py-5 mx-6">
      <View className="flex flex-row justify-between">
        <View className="flex flex-row items-center">
          <View>
            {loadingImage && (
              <View
                style={{
                  position: "absolute", // Position absolute to overlay on the image
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0, // Fill the parent container
                  justifyContent: "center", // Center vertically
                  alignItems: "center", // Center horizontally
                }}
              >
                <ActivityIndicator size="large" color="#F59E2B" />
              </View>
            )}
            <Image
              source={{ uri: client.userId.profilePic }}
              className="w-14 h-14 rounded-full"
              onLoadEnd={() => setLoadingImage(false)} // Set loading to false when image loads
              onError={() => setLoadingImage(false)} // Handle error case
            />
          </View>
          <View className="ml-4">
            <Text className="text-lg font-semibold">{client.userId.name}</Text>
            <Text className="text-slate-500 my-1">{client.userId.email}</Text>
            <View className="flex flex-row items-center">
              <Text className="my-1">Ratings :</Text>
              <Text className="rounded-full my-1 bg-gray-200 px-1 ml-2">
                {client.userId.rating}
              </Text>
              <StarRating
                className="ml-1"
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
    </View>
  );
};

export default ClientCard;
