import { View, Text, ScrollView, Image } from "react-native";
import { React, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../../constants";

import RoleChangeButton from "../../components/RoleChangeButton";

const Home = () => {
  return (
    <SafeAreaView className="h-full bg-white px-5 py-4">
      <ScrollView>
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
