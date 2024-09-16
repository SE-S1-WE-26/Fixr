import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "../../../constants";
import RoleChangeButton from "../../common/RoleChangeButton";

const HomeHeader = () => {
  return (
    <View className="w-full mb-5 px-5">
      <View className="flex-row justify-between items-center">
        <Image
          source={images.logoSmall}
          resizeMode="contain"
          className="w-12 h-12"
        />
        <RoleChangeButton />
      </View>
      {/* Responsive text size */}
      <Text className="text-3xl md:text-3xl lg:text-4xl font-medium mt-4">
        Welcome to Fixr!
      </Text>
      <Text className="text-base md:text-lg lg:text-xl font-medium">
        Find your job today
      </Text>
    </View>
  );
};

export default HomeHeader;
