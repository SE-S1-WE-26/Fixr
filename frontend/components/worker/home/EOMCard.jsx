import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { icons, images } from "../../../constants";
import { useRouter } from "expo-router";

const EOMCard = () => {
  const router = useRouter();

  const handleNavigation = () => {
    console.log("Navigating to Employee of the Month");
    router.push("/pages/worker/home/eom");
  };

  return (
    <TouchableOpacity
      className="flex-row justify-between min-h-[100px] bg-powder py-2 px-4 rounded-xl mx-5 shadow"
      onPress={handleNavigation}
    >
      <View className="flex">
        <Text className="text-sm md:text-base font-medium">
          Meet Our Employee of the Month!
        </Text>
        <View className="flex-row mt-2">
          <Image
            source={icons.worker}
            alt="Employee of the Month"
            className="h-12 w-12 rounded-full bg-orange"
          />
          <View className="ml-3 flex-1">
            <Text className="font-semibold text-xl md:text-2xl" numberOfLines={1}>
              Janaka Perera
            </Text>
            <View className="flex-row justify-between">
              <Text className="font-medium text-sm">July, 2024</Text>
              <Text className="font-medium text-sm">LKR 120,000</Text>
            </View>
          </View>
        </View>
      </View>
      <Image
        source={images.trophy}
        alt="Employee of the Month"
        className="h-16 w-16 self-center ml-2"
      />
    </TouchableOpacity>
  );
};

export default EOMCard;
