import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { React, useState, useEffect } from "react";
import { useRouter } from "expo-router";
import ScanIcon from "../../client/home/ScanIcon";
import { icons } from "../../../constants";
import FormatDateTime from "../../../utils/FormatDateTime";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import axios from "axios";

const WorkerJobCard = ({ job }) => {
  const router = useRouter();
  const [qrcode, setQrcode] = useState(null);
  const [jobName, setJobName] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [workerData, setWorkerData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const fetchMyData = async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch('http://192.168.1.3:8010/worker/mydata', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch worker data');
      }

      const data = await response.json();
      setWorkerData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMyData();
  }, []);

  // This effect runs whenever job or workerData changes
  useEffect(() => {
    if (job) {
      setQrcode(job._id);
      setJobName(job.title);
      setDate(job.scheduledDate);
      setTime(job.scheduledTime);
    }
  }, [job]);

  const handleNavigationToJobDetails = () => {
    console.log("Navigating to Job Details");
    
    // Only navigate if workerData is available
    if (workerData) {
      const jobCost = calcJobCost(workerData, job.estDuration);
      router.push({
        pathname: "/pages/worker/home/scheduledjobdetails",
        params: { jobId: job._id, jobCost: jobCost },
      });
      console.log("Job ID to navigate:", job._id);
    } else {
      console.log("Worker data is not yet available.");
    }
  };

  const calcJobCost = (workerData, jobDuration) => {
    if (workerData?.hourlyRate) {
      const jobCost = (workerData.hourlyRate * jobDuration).toFixed(2);
      console.log("Job Cost:", jobCost);
      return jobCost;
    }
    return "N/A"; // or some default value to indicate unavailability
  };

  const handleNavigation = () => {
    router.push({
      pathname: "/pages/worker/myjobs/GenerateQR",
      params: { jobName, date, time, qrcode }, // Pass the job details
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image style={styles.image} source={{ uri: job?.clientId?.userId?.profilePic }} />
        <View style={styles.details}>
          <Text style={styles.jobName}>{job?.title}</Text>
          <Text className='text-slate-500 text-xs'>{job?.clientId?.userId?.name}</Text>
          <Text>{FormatDateTime(job?.scheduledDate)}</Text>
          <Text>{job?.scheduledTime}</Text>
        </View>
        <TouchableOpacity style={styles.scanner} onPress={handleNavigation}>
          <ScanIcon icon={icons.scanner} />
        </TouchableOpacity>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.detailsButton} onPress={handleNavigationToJobDetails} disabled={isLoading}>
          <Text style={styles.buttonText}>{isLoading ? "Loading..." : "View Details"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 80,
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    marginHorizontal: 10,
    justifyContent: "center",
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    // Shadow for Android
    elevation: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    backgroundColor: "#ff6600",
    borderRadius: 100,
  },
  details: {
    marginLeft: 10,
  },
  jobName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  scanner: {
    position: "absolute",
    right: 10,
    bottom: 10,
    zIndex: 10,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  detailsButton: {
    backgroundColor: "#ff6600",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
  },
});

export default WorkerJobCard;
