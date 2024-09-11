import { View, Text } from "react-native";
import React from "react";
import RoleChangeButton from "./RoleChangeButton";

const Header = ({ title }) => {
  return (
    <View className="w-full flex-row justify-between items-center">
      <Text className="text-4xl font-bold mt-2">{title}</Text>
      <RoleChangeButton />
    </View>
  );
};

export default Header;
