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
      <View className="flex-1">
        <Text className="text-sm md:text-base font-medium">
          Meet Our Employee of the Month!
        </Text>
        <View className="flex-row mt-2">
          <Image
            source={icons.worker}
            style={{ height: 48, width: 48, borderRadius: 24 }
            }
          />
          <View className="ml-3 flex-1">
            <Text className="font-semibold text-xl md:text-2xl" numberOfLines={1}>
              Janaka Perera
            </Text>
            <View className="flex-row justify-between">
              <Text className="font-medium text-sm">July, 2024</Text>
              <Text className="font-medium text-sm mr-4">LKR 120,000</Text>
            </View>
          </View>
        </View>
      </View>
      <Image
        source={images.trophy}
        style={{ height: 64, width: 64 }}
        className="self-center"
      />
    </TouchableOpacity>
  );
};

export default EOMCard;
