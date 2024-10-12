import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import JobInfo from "../../../../components/worker/home/JobInfo";
import ClientCard from "../../../../components/worker/home/ClientCard";
import Heading from "../../../../components/common/Heading";
import ToolSuggestionsPopup from "../../../../components/worker/myJobs/ToolSuggestionsPopup";

import React, { useEffect, useState } from "react";
import { useRouter, useGlobalSearchParams } from "expo-router";
import axios from "axios";
const { GoogleGenerativeAI } = require("@google/generative-ai");

import { icons } from "../../../../constants";

const ScheduledJobDetails = () => {
  const router = useRouter();
  const { jobId, jobCost } = useGlobalSearchParams();
  const [popupVisible, setPopupVisible] = useState(false);

  const [job, setJob] = useState(null);
  const [client, setClient] = useState(null);
  const [loadingJob, setLoadingJob] = useState(true);
  const [loadingClient, setLoadingClient] = useState(true);
  const [loadingTools, setLoadingTools] = useState(false);
  const [toolsSuggestions, setToolsSuggestions] = useState([]); // State to store tool suggestions

  // Function to fetch job data by ID
  const fetchJobData = async (id) => {
    setLoadingJob(true); // Set loading state for job data
    let jobData; // Define jobData outside the try block
    try {
      const response = await axios.get(`http://192.168.1.3:8010/job/${id}`);
      jobData = response.data; // Assign value to jobData
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

  // Function to suggest tools based on job title and description
  const suggestTools = async (title, description) => {
    try {
      setLoadingTools(true); // Start loading when the function is called
      // Introduce a delay of 1 second (1000 milliseconds)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const genAI = new GoogleGenerativeAI(
        "AIzaSyAxCnNyWnEpbYMILL_fSLeKXWAfu9ViO0Y"
      );
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Based on the job description and title, suggest 10 tools that may need to do this job.\nJob title: ${title}\nJob Description: ${description}\nReturn just a list of tools don't number them and no additional texts.`;
      const result = await model.generateContent(prompt);
      console.log("Result:", result);
      const responseText = await result.response.text(); // Ensure to await the text() method
      // Assuming the response is a newline-separated string of tool names
      setToolsSuggestions(
        responseText.split("\n").filter((tool) => tool.trim() !== "")
      ); // Update the tools state
      console.log("Suggested Tools:", responseText);
    } catch (error) {
      console.error("Error generating content:", error.message);
    } finally {
      setLoadingTools(false); // Update loading state when done
    }
  };

  // Function to fetch client data by client ID
  const fetchClientData = async (clientId) => {
    setLoadingClient(true); // Set loading state for client data
    try {
      const response = await axios.get(
        `http://192.168.1.3:8010/client/${clientId}`
      );
      setClient(response.data);
      console.log("Client Data:", response.data); // Log the full response data
    } catch (error) {
      console.error("Error fetching client:", error.message);
    } finally {
      setLoadingClient(false); // Ensure loading state is updated for client data
    }
  };

  // Use effect to fetch job data on component mount
  useEffect(() => {
    if (jobId) {
      fetchJobData(jobId);
    }
  }, [jobId]);

  // Use effect to suggest tools when job data is available
  useEffect(() => {
    if (job) {
      suggestTools(job.title, job.description);
    }
  }, [job]);

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
      {loadingJob ? (
        <View className="flex h-full w-full justify-center items-center">
          <ActivityIndicator size="large" color="orange" />
        </View>
      ) : (
        <View className="-mt-8 h-full">
          <JobInfo job={job} jobCost={jobCost} loading={loadingJob} onShowTools={() => setPopupVisible(true)} AiVisible={true}/>
          <ToolSuggestionsPopup
            visible={popupVisible}
            tools={toolsSuggestions}
            onClose={() => setPopupVisible(false)} // Function to close popup
          />
          {client && client.userId ? ( // Check if client and userId are defined
            <ClientCard client={client} loading={loadingClient} />
          ) : (
            <View className="flex w-full justify-center items-center">
              <Text>No client details available</Text>
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

export default ScheduledJobDetails;
