import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, Stack, useLocalSearchParams } from "expo-router"; // Import useRouter for navigation
import axios from "axios";
import { icons } from "../../../../constants"; // Assuming icons are imported correctly

export default function StartJob() {
  const router = useRouter(); // Get the route object for navigation
  const { jobDetails } = useLocalSearchParams();

  // Check if jobDetails is defined and is a string
  let title, jobStatus, scannedDate, id, workerId;

  if (jobDetails && typeof jobDetails === "string") {
    try {
      const parsedJobDetails = JSON.parse(jobDetails); // Parse the jobDetails string
      title = parsedJobDetails.title; // Destructure necessary fields
      jobStatus = parsedJobDetails.jobStatus; // Adjust based on your data structure
      scannedDate = parsedJobDetails.scannedDate; // Adjust based on your data structure
      id = parsedJobDetails.id; // Adjust based on your data structure
      workerId = parsedJobDetails.workerId; // Adjust based on your data structure
    } catch (error) {
      console.error("Error parsing jobDetails:", error);
    }
  } else {
    console.error("jobDetails is not valid:", jobDetails);
    return null; // Handle the case where jobDetails is invalid
  }

  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchWorker = async () => {
    console.log("worker id", workerId);
    try {
      const response = await axios.get(`http://192.168.1.3:8010/worker/${workerId}`);
      setWorker(response.data);
    } catch (error) {
      console.error("Error fetching Worker Details:", error.response?.data || error);
    } finally {
      setLoading(false); // Set loading to false after the fetch attempt
    }
  };

  useEffect(() => {
    fetchWorker();
  }, []);

  const handleNavigate = () => {
    router.push("/(client-tabs)/mybookings"); // Navigating to the bookings page
    console.log("Navigating to mybookings");
  };

  if (loading) {
    return (
      <SafeAreaView className="h-full bg-white">
        <ActivityIndicator size="large" color="orange" />
      </SafeAreaView>
    );
  }

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
      <View style={styles.container}>
      <View>
          {/* Top Square with Job Completed Message */}
          <View style={styles.topBox} className="flex flex-row items-center justify-center">
            <Image
              source={icons.success}
              style={{ width: 50, height: 50 }} // Adjusted for better visibility
              className="mr-6"
            />
            <View>
              <Text style={styles.heading}>Job Started!</Text>
              <Text style={styles.description}>Time has been recorded.</Text>
            </View>
          </View>
        </View>

        {/* Job Details Card */}
        <View style={styles.card}>
          <Text style={styles.cardText}>
            <Text style={styles.label}>Job Title: </Text>
            {title}
          </Text>
          <Text style={styles.cardText}>
            <Text style={styles.label}>Handyman: </Text>
            {worker ? worker?.userId?.name : "Loading..."}
          </Text>
          <Text style={styles.cardText}>
            <Text style={styles.label}>Start Time: </Text>
            {scannedDate}
          </Text>
        </View>

        {/* Job Status Card */}
        <View style={styles.card}>
          <Text style={styles.jobStatus}>
            <Text style={styles.label}>Job Status: </Text>In Progress
          </Text>
        </View>

        {/* Bottom Square with Scan Message */}
        <View style={styles.bottomBox}>
          <Text style={styles.scanMessage}>
            Scan the QR code again once the job is complete.
          </Text>
        </View>

        {/* Navigation Button */}
        <TouchableOpacity
          className="mt-12 bg-orange py-2 px-8 rounded-lg"
          onPress={handleNavigate}
        >
          <Text className="text-lg font-bold text-white">Go to Bookings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  header: {
    width: "100%",
    padding: 20,
    alignItems: "flex-start",
  },
  topBox: {
    width: "100%",
    backgroundColor: "#F8EFD7",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
  },
  description: {
    fontSize: 16,
    color: "gray",
    marginTop: 10,
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  cardText: {
    fontSize: 18,
    marginVertical: 5,
  },
  label: {
    fontWeight: "bold",
    color: "black",
    fontSize: 18,
  },
  jobStatus: {
    fontSize: 25,
    marginVertical: 5,
    color: "green",
    fontWeight: "bold",
  },
  bottomBox: {
    width: "100%",
    backgroundColor: "#F8EFD7",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  scanMessage: {
    fontSize: 16,
    fontWeight: "bold",
    color: "gray",
  },
});
