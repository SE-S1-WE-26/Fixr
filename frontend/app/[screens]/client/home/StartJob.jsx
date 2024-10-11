import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter,Stack } from "expo-router";  // Import useRouter for navigation
import { icons } from "../../../../constants"; // Assuming icons are imported correctly

export default function StartJob() {
  const router = useRouter();  // Get the route object for navigation

  // Mock data for the job details 
  const jobName = "Fixing Sink";
  const handymanName = "John Doe";
  const startTime = "2024-10-10 09:30 AM"; // Example start time

  const handleNavigate = () => {
    router.push('/(client-tabs)/mybookings'); // Navigating to the bookings page
    console.log('Navigating to mybookings');
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
      <Image
                source={icons.success}
                style={{ width: 80, height: 80 }} // Adjusted for better visibility
                className='mb-6'
              />
        {/* Top Square with Job Started Message */}
        <View style={styles.topBox}>
          <Text style={styles.heading}>Job Started!</Text>
          <Text style={styles.description}>Start time recorded successfully.</Text>
        </View>

        {/* Job Details Card */}
        <View style={styles.card}>
          <Text style={styles.cardText}>
            <Text style={styles.label}>Job Name: </Text>{jobName}
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
        <TouchableOpacity className='mt-12 bg-orange py-2 px-8 rounded-lg' onPress={handleNavigate}>
          <Text className='text-lg font-bold text-white'>Go to Bookings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
  header: {
    width: '100%',
    padding: 20,
    alignItems: 'flex-start',
  },
  topBox: {
    width: '100%',
    backgroundColor: '#F8EFD7',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
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
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  scanMessage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
  },
});
