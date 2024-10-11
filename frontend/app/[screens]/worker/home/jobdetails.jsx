import { View, Text, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import JobInfo from "../../../../components/worker/home/JobInfo";
import ClientCard from "../../../../components/worker/home/ClientCard";

import React, { useEffect, useState } from "react";
import { useRouter, useGlobalSearchParams } from "expo-router";
import axios from "axios";

import { icons } from "../../../../constants";

const JobDetails = () => {
  const router = useRouter();
  const { jobId,jobCost } = useGlobalSearchParams();

  const [job, setJob] = useState(null);
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch job data by ID
  const fetchJobData = async (id) => {
    try {
      const response = await axios.get(`http://192.168.1.3:8010/job/${id}`);
      const jobData = response.data;
      setJob(jobData);

      // Fetch client data using the clientId from the job data
      if (jobData.clientId) {
        await fetchClientData(jobData.clientId._id); // Make sure to wait for this to complete
      }
    } catch (error) {
      console.error("Error fetching job:", error.message);
      setLoading(false);
    } finally {
      setLoading(false); // Ensure loading state is updated in all cases
    }
  };

  // Function to fetch client data by client ID
  const fetchClientData = async (clientId) => {
    try {
      const response = await axios.get(`http://192.168.1.3:8010/client/${clientId}`);
      setClient(response.data);
      console.log("Client Data:", response.data); // Log the full response data
    } catch (error) {
      console.error("Error fetching client:", error.message);
    }
  };

  // Use effect to fetch data on component mount
  useEffect(() => {
    if (jobId) {
      fetchJobData(jobId);
    }
  }, [jobId]);

  return (
    <SafeAreaView className="h-full bg-white">
      <Stack.Screen
        options={{
          headerBackVisible: false,
          headerShadowVisible: false,
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Image
                source={icons.back}
                style={{ width: 24, height: 24 }} // Adjusted for better visibility
                tintColor="orange"
              />
            </TouchableOpacity>
          ),
        }}
      />
      <JobInfo job={job} jobCost={jobCost} loading={loading} />
      {client && client.userId ? ( // Check if client and userId are defined
        <ClientCard client={client} loading={loading} />
      ) : (
        <View className="flex w-full justify-center items-center">
        <ActivityIndicator size="large" color="orange" />
      </View>
      )}
    </SafeAreaView>
  );
};

export default JobDetails;
