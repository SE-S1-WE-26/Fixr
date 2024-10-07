import React from "react";
import { View, Text, StyleSheet } from "react-native";

const StartJob = ({ scannedData }) => {
  if (!scannedData) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Job Started</Text>
      <Text>QR Data: {scannedData.data}</Text>
      <Text>Scanned At: {scannedData.scannedAt}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default StartJob;
