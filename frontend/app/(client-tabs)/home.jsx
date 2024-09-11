import { View, Text, ScrollView, Image } from "react-native";
import { React, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import HomeHeader from "../../components/client/HomeHeader";

const Home = () => {
  return (
    <SafeAreaView className="h-full bg-white px-5 py-4">
      <ScrollView>
        <HomeHeader />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
