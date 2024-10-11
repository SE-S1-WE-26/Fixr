import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import StarRating from "react-native-star-rating-widget";
import Feather from "@expo/vector-icons/Feather";
import { Linking } from "react-native";

const ClientCard = ({ client }) => {
  const [loadingImage, setLoadingImage] = useState(true); // State for image loading

  const handleCall = (phone) => {
    console.log("Calling...", phone);
    if (phone) {
      Linking.openURL(`tel:${phone}`); // Open phone dialer with the phone number
    }
  };

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
            <Text className="text-lg font-semibold" numberOfLines={1}>
              {client.userId.name}
            </Text>
            <Text
              numberOfLines={1}
              className="text-slate-500 my-1 max-w-[100px]"
            >
              {client.userId.email}
            </Text>
            <View className="flex-row items-center">
              <View className="bg-slate-100 flex flex-row items-center rounded-lg px-2 py-1">
                <Text>{client.userId.rating}</Text>
                <StarRating
                  className="ml-2"
                  rating={client.userId.rating}
                  starSize={16}
                  starStyle={{ marginHorizontal: 0 }}
                />
              </View>
            </View>
          </View>
        </View>
        <View className="justify-center items-center">
          <TouchableOpacity
            onPress={() => handleCall(client.userId.phone)}
            className="py-2 px-4 bg-green-900 rounded-lg"
          >
            <Feather name="phone-call" size={24} color="white" />
          </TouchableOpacity>
          {/* <TouchableOpacity className="py-2 px-4 bg-black-900 rounded-lg mt-2">
            <Text className="text-white">Chat</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </View>
  );
};

export default ClientCard;
