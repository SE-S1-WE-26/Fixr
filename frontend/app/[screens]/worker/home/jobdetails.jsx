import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import JobInfo from "../../../../components/worker/home/JobInfo";
import ClientCard from "../../../../components/worker/home/ClientCard";

import { icons } from "../../../../constants";

const JobDetails = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="h-full bg-white">
      <Stack.Screen
        options={{
          headerBackVisible: false,
          headerShadowVisible: false,
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity onPress={()=>router.back()}>
              <Image
                source={icons.back}
                className="w-4 h-4"
                tintColor="orange"
              />
            </TouchableOpacity>
          ),
        }}
      />
      <View className='px-6'>
        <Text className="text-3xl font-bold">Leaky Kitchen Sink</Text>
      </View>
      <JobInfo />
      <ClientCard />
    </SafeAreaView>
  );
};

export default JobDetails;
