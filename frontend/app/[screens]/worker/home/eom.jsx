import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import React from "react";

import EOMWinner from "../../../../components/worker/home/EOMWinner";
import LeaderboardCard from "../../../../components/worker/home/LeaderboardCard";
import Heading from '../../../../components/common/Heading';

import { icons } from "../../../../constants";

const EOM = () => {
  const router = useRouter();

  return (
    <SafeAreaProvider className="h-full bg-white">
      <Stack.Screen
        options={{
          headerBackVisible: false,
          headerShadowVisible: false,
          headerTitle: "Employee of the Month",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Image
                source={icons.back}
                className="w-4 h-4 mr-5"
                tintColor="orange"
              />
            </TouchableOpacity>
          ),
        }}
      />
      <EOMWinner/>
      <Heading name="Leaderboards"/>
      <LeaderboardCard name="Saman Kumarasiri" earnings="LKR 100,000.00" rating="4.8"/>
      <LeaderboardCard name="Roshan Bandara" earnings="LKR 90,000.00" rating="4.8"/>
    </SafeAreaProvider>
  );
};

export default EOM;
