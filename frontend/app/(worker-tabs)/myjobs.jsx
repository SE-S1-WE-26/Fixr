import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View } from "react-native";
import Header from "../../components/common/Header";
import WorkerJobCard from "../../components/worker/myJobs/WorkerJobCard";
import { MyJobsWorker } from "../../constants/constants";

const MyJobs = () => {
  return (
    <SafeAreaView className="h-full bg-white">
      <Header title={"My Jobs"} />
      <ScrollView>
        <View className="w-full h-full">
          {MyJobsWorker.map((job) => (
            <WorkerJobCard
            key={job.id}
            jobId={job.id}               
            jobName={job.name}
            date={job.date}
            time={job.time} 
            qrcode={job.qrcode}   
          />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyJobs;
