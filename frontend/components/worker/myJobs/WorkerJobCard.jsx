import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import ScanIcon from "../../client/home/ScanIcon";
import { icons } from "../../../constants";

const WorkerJobCard = ({ jobName, date, time, handyman, jobId }) => {
  const router = useRouter();

  const handleNavigation = () => {
    router.push({
      pathname: "/pages/worker/myjobs/GenerateQR",
      params: { jobId, jobName, date, time, handyman }, // Pass the job details
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.jobName}>{jobName}</Text>
          <Text>Scheduled Date: {date}</Text>
          <Text>Scheduled Time: {time}</Text>
          <Text>Handyman: {handyman}</Text>
        </View>
        <TouchableOpacity style={styles.scanner} onPress={handleNavigation}>
          <ScanIcon icon={icons.scanner} />
        </TouchableOpacity>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.detailsButton}>
          <Text style={styles.buttonText}>View Details</Text>
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
    width: 40,
    height: 40,
    backgroundColor: "#ff6600",
    borderRadius: 20,
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
