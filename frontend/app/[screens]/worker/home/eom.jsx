import { View, Text, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import React, { useRef }  from "react";
import React, { useEffect, useState } from "react";
import axios from "axios";

import EOMWinner from "../../../../components/worker/home/EOMWinner";
import LeaderboardCard from "../../../../components/worker/home/LeaderboardCard";
import Heading from '../../../../components/common/Heading';

import { icons } from "../../../../constants";

import ReviewCard from "../../../../components/common/ReviewCard";

const EOM = () => {
  const router = useRouter();
  const bottonSheetRef = useRef();
  const [eom, setEom] = useState(null);
  const [eomWinner, setEomWinner] = useState(null);
  const [eomSecond, setEomSecond] = useState(null);
  const [eomThird, setEomThird] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCurentEom = async () => {
    try {
      const response = await axios.get('http://192.168.1.3:8010/eom/current');
      setEomWinner(response.data[0]);
      setEomSecond(response.data[1]);
      setEomThird(response.data[2]);
    } catch (err) {
      console.error('Error fetching EOM:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurentEom();
  }, []);

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
      <TouchableOpacity onPress={()=>bottonSheetRef.current?.expand()}>
      <EOMWinner/>
      </TouchableOpacity>
      <Heading name="Leaderboards"/>
      <LeaderboardCard name="Saman Kumarasiri" earnings="LKR 100,000.00" rating="4.8"/>
      <LeaderboardCard name="Roshan Bandara" earnings="LKR 90,000.00" rating="4.8"/>
      <ReviewCard rating={bottonSheetRef} />

      {/* Show ActivityIndicator while loading */}
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="orange" />
        </View>
      ) : (
        <>
          <EOMWinner worker={eomWinner} />
          <Heading name="Leaderboards" />
          <LeaderboardCard worker={eomSecond} place={2} />
          <LeaderboardCard worker={eomThird} place={3}/>
        </>
      )}
    </SafeAreaProvider>
  );
};

export default EOM;
