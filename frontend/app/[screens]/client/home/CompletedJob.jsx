import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity,Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter,Stack,useLocalSearchParams } from "expo-router";  // Import useRoute to access passed params
import { icons } from "../../../../constants";

export default function CompletedJob() {
  const router = useRouter();  // Get the route object to access params
  const { data, scannedDate, jobStatus, jobName, handymanName, startTime, totalJobTime } = useLocalSearchParams();

  const handelNavigate = () => {
    route.push('/(client-tabs)/mybookings');
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
      {/* Top Square with Job Completed Message */}
      <View style={styles.topBox}>
        <Text style={styles.heading}>Job Completed!</Text>
        <Text style={styles.description}>Time has been recorded.</Text>
      </View>

      {/* Job Details Card */}
      <View style={styles.card}>
        <Text style={styles.cardText}>
          <Text style={styles.label}>Job Name </Text>{jobName}
        </Text>
        <Text style={styles.cardText}>
          <Text style={styles.label}>Handyman: </Text>{handymanName}
        </Text>
        <Text style={styles.cardText}>
          <Text style={styles.label}>Start Time: </Text>{startTime}
        </Text>
        <Text style={styles.cardText}>
          <Text style={styles.label}>End Time: </Text>{scannedDate}
        </Text>
      </View>

      {/* Job Status Card */}
      <View style={styles.card}>
        <Text style={styles.jobStatus}>
          <Text style={styles.jobLable}>Job Status: </Text>Completed
        </Text>
      </View>

      {/* Total Job Time Card */}
      <View style={styles.card}>
        <Text style={styles.cardText}>
          <Text style={styles.label}>Total Job Time: </Text>{totalJobTime}
        </Text>
      </View>

      {/* Bottom Square with Scan Message */}
      <View style={styles.bottomBox}>
        <Text style={styles.scanMessage}>
          Thank you for using our service!
        </Text>
      </View>

      <TouchableOpacity className='mt-12 bg-orange py-2 px-8 rounded-lg' onPress={handelNavigate}>
        <Text className='text-lg font-bold text-white'>Done</Text>
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
  topBox: {
    width: '100%',
    backgroundColor: '#F8EFD7',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },  // Creates depth effect
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,  // For Android shadow
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
    shadowOffset: { width: 0, height: 4 },  // Adds shadow to give a 3D look
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,  // Android shadow
  },
  cardText: {
    fontSize: 18,
    marginVertical: 5,
  },
  jobStatus: {
    fontSize: 25,
    marginVertical: 5,
    color: 'red',
    fontWeight: 'bold',
  },
  label: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 18,
    color: 'black',
  },
  jobLable: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 18,
    color: 'black',
  },
  bottomBox: {
    width: '100%',
    backgroundColor: '#F8EFD7',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },  // Adds depth
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,  // Android shadow
  },
  scanMessage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
  },
});
