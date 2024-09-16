import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, ScrollView } from "react-native";
import Header from "../../components/common/Header";

const MyJobs = () => {
  return (
    <SafeAreaView className="h-full bg-white">
      <Header title={"My Jobs"} />
      <ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyJobs;
