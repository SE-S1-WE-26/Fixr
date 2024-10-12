import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, Stack, useLocalSearchParams } from "expo-router"; // Import useRoute to access passed params
import { icons } from "../../../../constants";
import axios from "axios";
import FormatDateTime from "../../../../utils/FormatDateTime";
import FormatCurrency from "../../../../utils/FormatCurrency";

export default function CompletedJob() {
  const router = useRouter(); // Get the route object to access params
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

  const [job, setJob] = useState(null);
  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true); // State for loading
  const [jobCost, setJobCost] = useState(1000); // State for job cost

  const fetchJobDetails = async () => {
    try {
      const jobResponse = await axios.get(`http://192.168.1.3:8010/job/${id}`);
      setJob(jobResponse.data);

      if (workerId) {
        const workerResponse = await axios.get(`http://192.168.1.3:8010/worker/${workerId}`);
        setWorker(workerResponse.data);
      }
    } catch (err) {
      console.error("Error fetching job details:", err);
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  // Calculate total job time
  const calculateTotalJobTime = (startTime, endTime) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const diffInMilliseconds = end - start;
    const diffInHours = diffInMilliseconds / (1000 * 60 * 60);
    return parseFloat(diffInHours.toFixed(2));
  };

  // Calculate job cost based on worker's hourly rate and job time
  const calculateJobCost = (workerHourlyRate, jobTime) => {
    return workerHourlyRate * jobTime;
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchJobDetails();
      if (job && worker) {
        const jobTime = calculateTotalJobTime(job?.startTime, job?.endTime);
        const cost = calculateJobCost(worker?.hourlyRate, jobTime);
        console.log("Cost", cost);
        setJobCost(cost);
      }
    };

    fetchData();
  }, []);

  const handleNavigate = () => {
    updateJobCostDatabase(id, jobCost);
    router.push("/(client-tabs)/mybookings");
    console.log("Navigating to mybookings");
  };

  const updateJobCostDatabase = async (jobId, jobCost) => {
    try {
      const response = await axios.put(`http://192.168.1.3:8010/job/cost/${jobId}`, { cost: jobCost });
      if (response.status === 200) {
        console.log("Job cost updated successfully:", response.data);
      } else {
        console.error("Failed to update job cost:", response.data);
      }
    } catch (error) {
      console.error("Error updating job cost:", error);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
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
                style={{ width: 24, height: 24 }}
                tintColor="orange"
              />
            </TouchableOpacity>
          ),
        }}
      />
      <View style={styles.container}>
        <View>
          <View style={styles.topBox} className="flex flex-row items-center justify-center">
            <Image
              source={icons.success}
              style={{ width: 50, height: 50 }}
              className="mr-6"
            />
            <View>
              <Text style={styles.heading}>Job Completed!</Text>
              <Text style={styles.description}>Time has been recorded.</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardText}>
            <Text style={styles.label}>Job Name: </Text>
            {job?.title}
          </Text>
          <Text style={styles.cardText}>
            <Text style={styles.label}>Handyman: </Text>
            {worker ? worker?.userId?.name : "Loading..."}
          </Text>
          <Text style={styles.cardText}>
            <Text style={styles.label}>Start Time: </Text>
            {FormatDateTime(job?.startTime)}
          </Text>
          <Text style={styles.cardText}>
            <Text style={styles.label}>End Time: </Text>
            {FormatDateTime(job?.endTime)}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.jobStatus}>
            <Text style={styles.label}>Job Status: </Text>Completed
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardText}>
            <Text style={styles.label}>Total Job Time: </Text>
            {job?.startTime && job?.endTime
              ? calculateTotalJobTime(job?.startTime, job?.endTime)
              : "N/A"}
            {" Hours"}
          </Text>
          <Text style={styles.cardText}>
            <Text style={styles.label}>Total Job Cost: LKR </Text>
            {FormatCurrency(parseFloat(jobCost).toFixed(2))}
          </Text>
        </View>

        <TouchableOpacity
          className="mt-12 bg-orange py-2 px-8 rounded-lg"
          onPress={handleNavigate}
        >
          <Text className="text-lg font-bold text-white">Done</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
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
});
