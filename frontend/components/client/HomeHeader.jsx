import { View, Text, Image } from "react-native";
import React from "react";

import { images } from "../../constants";

import RoleChangeButton from "../RoleChangeButton";

const HomeHeader = () => {
  return (
    <View className="w-full h-full">
      <View className="flex-row justify-between items-center">
        <Image
          source={images.logoSmall}
          resizeMode="contain"
          className="w-12 h-12"
        />
        <RoleChangeButton />
      </View>
      <Text className="text-4xl font-medium mt-4">Welcome to Fixr !</Text>
      <Text className="text-lg font-medium">Find your handyman today</Text>
    </View>
  );
};

export default HomeHeader;
