import { View, Text, ScrollView, Image } from "react-native";
import { React, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeHeader from "../../components/worker/home/HomeHeader";

import { images } from "../../constants";

const Home = () => {
  return (
    <SafeAreaView className="h-full bg-white pt-4">
      <ScrollView>
        <HomeHeader />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
