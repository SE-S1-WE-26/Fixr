import { View, Text,TouchableOpacity } from "react-native";
import React from "react";
import RoleChangeButton from "./RoleChangeButton";
import { router } from "expo-router";

const Header = ({ title }) => {
  const navigate = () => {
    console.log("Navigating to Sign In");
    router.push("/sign-in");

  };
  return (
    <View className="w-full flex-row justify-between items-center px-4 md:px-6 py-3 md:py-4 bg-white">
      <Text className="text-3xl md:text-4xl font-bold">{title}</Text>
      <View className='flex flex-row'>
      <TouchableOpacity onPress={navigate} className='bg-orange items-center justify-center rounded-lg px-4 mx-2'>
        <Text className='text-white font-medium'>Logout</Text>
      </TouchableOpacity>
      <RoleChangeButton />
      </View>
    </View>
  );
};

export default Header;
