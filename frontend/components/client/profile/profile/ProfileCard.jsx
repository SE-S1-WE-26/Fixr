import {
  View,
  ActivityIndicator,
  Text,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";

const ProfileCard = () => {
  const [clientData, setClientData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMyData = async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(
        "https://fixerbackend.vercel.app/client/mydata",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch client data");
      }

      const data = await response.json();
      setClientData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMyData();
  }, []);

  return (
    <View className="flex mt-2 rounded-xl bg-powder shadow px-4 md:px-5 pt-4 md:pt-5 mx-4 md:mx-6 justify-center">
      {isLoading ? (
        <ActivityIndicator color="#F59E2B" />
      ) : (
        <View>
          <View className="flex-col items-center justify-center">
            <Image
              source={{ uri: clientData?.userId?.profilePic }}
              style={{ width: 80, height: 80 }}
              className="rounded-full"
            />
            <Text className="text-3xl md:text-4xl font-bold mt-2">
              {clientData?.userId?.name}
            </Text>
            <Text className="font-semibold text-base md:text-lg">
              {clientData?.userId?.location}
            </Text>
          </View>
          <View className="flex flex-row justify-between m-2 mb-6">
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(`tel:${clientData?.userId?.phone}`);
              }}
            >
              <View className="px-3 md:px-5 bg-green-900 rounded-lg p-2 justify-between">
                <Text className="text-sm md:text-lg font-bold text-white">
                  <Ionicons name="call" size={16} color="white" />
                  <Text>
                    {"   "}
                    {clientData?.userId?.phone}
                  </Text>
                </Text>
              </View>
            </TouchableOpacity>

            <View className="px-3 md:px-5 bg-black-900 rounded-lg">
              <Text className="text-sm md:text-lg font-bold text-white pt-2">
                <Entypo name="chat" size={24} color="white" />
                {"  "}CHAT
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default ProfileCard;
