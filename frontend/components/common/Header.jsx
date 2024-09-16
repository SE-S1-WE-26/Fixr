import { View, Text } from "react-native";
import React from "react";
import RoleChangeButton from "./RoleChangeButton";

const Header = ({ title }) => {
  return (
    <View className="w-full flex-row justify-between items-center px-4 md:px-6 py-3 md:py-4 bg-white">
      <Text className="text-3xl md:text-4xl font-bold">{title}</Text>
      <RoleChangeButton />
    </View>
  );
};

export default Header;
