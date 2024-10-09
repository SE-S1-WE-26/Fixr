import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React from "react";
import FormatCurrency from '../../../utils/FormatCurrency'

const JobInfo = ({job,loading}) => {

  if (loading) {
    return <ActivityIndicator size="large" color="#F59E2B" />;
  }

  if (!job) {
    return (
      <View>
        <Text>No job details available</Text>
      </View>
    );
  }

  return (
    <>
      <View className='px-6'>
        <Text className="text-3xl font-bold">{job.title}</Text>
      </View>
      <View className="flex mt-6 rounded-xl bg-powder shadow px-5 py-5 mx-6">
      <View className="flex flex-row justify-between">
        <View>
          <Text className="text-base font-medium">Location</Text>
          <Text className="text-lg font-bold">{job.city}, Sri Lanka</Text>
        </View>
        <View className="items-end">
          <Text className="text-base font-medium">Est. Job Time</Text>
          <Text className="text-4xl font-bold text-orange">{job.estDuration}</Text>
        </View>
      </View>
      <Text className="my-6">{job.description}</Text>
      <View>
        <FlatList
          horizontal
          data={job.images} // Assuming job.images is an array
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={{ width: 100, height: 100 }} /> // Adjust as needed
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View>
        <Text className="text-base font-medium">Est. Job Cost</Text>
        <Text className="text-4xl font-bold text-orange">LKR {FormatCurrency(parseFloat(job.jobCost))}</Text>
      </View>
    </View>
    </>
  );
};

export default JobInfo;
