import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import StarRating from "react-native-star-rating-widget";
import { useRouter, useLocalSearchParams } from "expo-router";
import { icons } from "../../../../constants";

const ContactWorker = () => {
  const router = useRouter();
  const { worker } = useLocalSearchParams();
  const workerData = JSON.parse(worker); // Parse the worker data from params

  return (
    <View style={styles.container}>
      <Image source={workerData.image} style={styles.workerImage} />
      <Text style={styles.workerName}>{workerData.name}</Text>
      <Text style={styles.workerCategory}>{workerData.type}</Text>
      <Text>Age: {workerData.age}</Text>
      <Text>Experience: {workerData.experience} years</Text>
      <View style={styles.ratingContainer}>
        <Text>Rating: {workerData.rating}</Text>
        {/* <StarRating rating={workerData.rating} starSize={20} /> */}
      </View>
      <Text>Location: {workerData.location}</Text>
      <Text style={styles.description}>{workerData.description}</Text>
      <Text>Earnings per hour: ${workerData.earningPerHour}</Text>

      {/* Buttons for Chat, Call, and Invite */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Call</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.inviteButton}>
        <Text style={styles.inviteText}>Invite for a Job</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
    flex: 1,
  },
  workerImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
    marginBottom: 20,
  },
  workerName: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  workerCategory: {
    fontSize: 18,
    textAlign: "center",
    color: "gray",
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  description: {
    marginVertical: 10,
    fontSize: 16,
    lineHeight: 22,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 10,
    width: "48%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  inviteButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  inviteText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ContactWorker;
