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
  const { jobId, jobCost } = useGlobalSearchParams();

  const [job, setJob] = useState(null);
  const [client, setClient] = useState(null);
  const [loadingJob, setLoadingJob] = useState(true);
  const [loadingClient, setLoadingClient] = useState(true);

  // Function to fetch job data by ID
  const fetchJobData = async (id) => {
    setLoadingJob(true); // Set loading state for job data
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
    } finally {
      setLoadingJob(false); // Ensure loading state is updated for job data
    }
  };

  // Function to fetch client data by client ID
  const fetchClientData = async (clientId) => {
    setLoadingClient(true); // Set loading state for client data
    try {
      const response = await axios.get(`http://192.168.1.3:8010/client/${clientId}`);
      setClient(response.data);
      console.log("Client Data:", response.data); // Log the full response data
    } catch (error) {
      console.error("Error fetching client:", error.message);
    } finally {
      setLoadingClient(false); // Ensure loading state is updated for client data
    }
  };

  // Use effect to fetch data on component mount
  useEffect(() => {
    if (jobId) {
      fetchJobData(jobId);
    }
  }, [jobId]);

  // Combined loading state
  const isLoading = loadingJob || loadingClient;

  return (
    <SafeAreaView className="bg-white h-full">
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
      {isLoading ? (
        <View className="flex h-full w-full justify-center items-cente">
          <ActivityIndicator size="large" color="orange" />
        </View>
      ) : (
        <View className='-mt-6 h-full'>
          <JobInfo job={job} jobCost={jobCost} loading={loadingJob} />
          {client && client.userId ? ( // Check if client and userId are defined
            <ClientCard client={client} loading={loadingClient} />
          ) : (
            <View className="flex w-full justify-center items-center">
              <Text>No client details available</Text>
            </View>
          )}
          <TouchableOpacity className="bg-orange p-4 rounded-lg items-center mt-2 mx-5">
            <Text className="text-white font-semibold">Apply For The Job</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default JobDetails;
