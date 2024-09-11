import React from "react";
import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";

const MyBookings = () => {
  return (
    <SafeAreaView className="h-full bg-white px-5 py-4">
      <ScrollView>
        <View className="w-full h-full">
          <Header title={"My Bookings"} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyBookings;
