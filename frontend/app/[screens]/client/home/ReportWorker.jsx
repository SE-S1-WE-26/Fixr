import React from "react";
import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../../components/common/Header";

const ReportWorker = () => {
  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView>
        <View className="w-full h-full">
          <Header title={"Report Worker"} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReportWorker;
