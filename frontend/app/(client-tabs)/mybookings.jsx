import React from "react";
import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/common/Header";
import JobCard from "../../components/client/mybookings/JobCard";
import { MyJobsClient } from "../../constants/constants";

const MyBookings = () => {
  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView>
        <View className="w-full h-full">
          <Header title={"My Jobs"} />
          {MyJobsClient.map((job) => (
            <JobCard
              key={job.id}
              jobName={job.name}
              date={job.date}
              time={job.time}
              handyman={job.handyman}
              qrcode={job.barcode}
            />
          ))}
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyBookings;
