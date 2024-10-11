import { View, Text, Image, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@expo/vector-icons/Ionicons";

const JobStatusCard = ({
  iconName,
  iconColor,
  bgColor,
  title,
  time,
  subTitle,
}) => {
  return (
    <View
      style={{
        backgroundColor: bgColor,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 24,
        margin: 10,
      }}
    >
      <View
        style={{ backgroundColor: bgColor }}
        className="flex flex-row  rounded-3xl "
      >
        <View className="justify-center items-center pl-4 pr-2 ml-3">
          <Ionicons name={iconName} size={32} color={iconColor} />
        </View>
        <View className="flex-1 p-3 items-start">
          <Text className="text-center text-black font-bold">{title}</Text>
          <Text className="text-center text-[#AEAEAE] font-bold">
            {subTitle}
          </Text>
        </View>
        <View className="justify-center items-center p-3 bg-[#ffb627] rounded-r-3xl">
          <Text className="font-bold text-lg">{time}</Text>
        </View>
      </View>
    </View>
  );
};

export default JobStatusCard;
