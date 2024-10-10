import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function StartJob() {
  // Mock data for the job details 
  const jobName = "Fixing Sink";
  const handymanName = "John Doe";
  const startTime = "2024-10-10 09:30 AM"; // Example start time

  return (
    <View style={styles.container}>
      {/* Top Square with Job Started Message */}
      <View style={styles.topBox}>
        <Text style={styles.heading}>Job Started!</Text>
        <Text style={styles.description}>Start time recorded successfully.</Text>
      </View>

      {/* Job Details Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>
         {jobName}
        </Text>
        <Text style={styles.cardText}>
          <Text style={styles.label}>Handyman: </Text>{handymanName}
        </Text>
        <Text style={styles.cardText}>
          <Text style={styles.label}>Start Time: </Text>{startTime}
        </Text>
      </View>

      {/* Job Status Card */}
      <View style={styles.card}>
        <Text style={styles.jobStatus}>
          <Text style={styles.label}>Job Status </Text>In Progress
        </Text>
      </View>

      {/* Bottom Square with Scan Message */}
      <View style={styles.bottomBox}>
        <Text style={styles.scanMessage}>
          Scan the QR code again once the job is complete.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  topBox: {
    width: '100%',
    backgroundColor: '#F8EFD7',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 }, // Creates depth effect
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6, // For Android shadow
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
  },
  description: {
    fontSize: 16,
    color: 'gray',
    marginTop: 10,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 }, // Adds shadow to give a 3D look
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6, // Android shadow
  },
  cardTitle: {
    fontSize: 20,
    marginVertical: 5,
    fontWeight: 'bold',
  },
  cardText: {
    fontSize: 18,
    marginVertical: 5,
  },
  label: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 18,
  },
  jobStatus: {
    fontSize: 25,
    marginVertical: 5,
    color: 'green',
    fontWeight: 'bold',
    
  },
  bottomBox: {
    width: '100%',
    backgroundColor: '#F8EFD7',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 }, // Adds depth
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6, // Android shadow
  },
  scanMessage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
  },
});
