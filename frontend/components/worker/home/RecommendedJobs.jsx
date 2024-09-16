import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import RecommendedJobCard from "./RecommendedJobCard";

const RecommendedJobs = () => {
  return (
    <View className="mx-5">
      <RecommendedJobCard />
    </View>
  );
};

export default RecommendedJobs;
