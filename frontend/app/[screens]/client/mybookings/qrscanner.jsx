import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { Camera } from "expo-camera";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useRouter, useLocalSearchParams, Stack } from "expo-router";
import { icons } from "../../../../constants";
import axios from "axios";

export default function Scanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { qrcode, jobStatus, title, id, workerId } = useLocalSearchParams();
  const [scannedJobStatus, setScannedJobStatus] = useState(jobStatus);

  // Request camera permission on load
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const startJob = async () => {
    const time = new Date().toLocaleString();
    console.log(`Starting job with ID: ${id} at ${time}`); // Debug log
  
    try {
      const response = await axios.put(
        `http://192.168.1.3:8010/job/status/start/${id}`
      );
      console.log("Job status updated:", response.data);
    } catch (error) {
      console.error("Error updating job status:", error.response.data || error);
    }
  };  

  const endJob = async () => {
    const time = new Date().toLocaleString(); // Current time as ISO string

    try {
      const response = await axios.put(
        `http://192.168.1.3:8010/job/status/end/${id}`
      );
      console.log("Job status updated:", response.data);
    } catch (error) {
      console.error("Error updating job status:", error);
    }

    console.log("Job started!");
  };

  // Handle barcode scan
  const handleBarCodeScanned = async ({ data }) => {
    if (!scanned) {
      setScanned(true);
      setIsLoading(true);
      const scannedData = { data, scannedDate: new Date().toLocaleString() };

      if (data === qrcode) {
        const newStatus =
          scannedJobStatus === "pending" ? "ongoing" : "completed";
        const jobDetails = {
          data,
          scannedDate: new Date().toLocaleString(),
          jobStatus: newStatus,
          title: title,
          id: id,
          workerId: workerId,
        };

        // Call the startJob or endJob functions based on the new status
        if (newStatus === "ongoing") {
          await startJob(); // Start the job
        } else if (newStatus === "completed") {
          await endJob(); // End the job
        }

        setTimeout(() => {
          setIsLoading(false);
          setScannedJobStatus(newStatus);
          const path = newStatus === "ongoing" ? "StartJob" : "CompletedJob";
          router.push({
            pathname: `/pages/client/home/${path}`,
            params: { jobDetails: JSON.stringify(jobDetails) }, // Stringify the jobDetails object
          });
        }, 1000);
      } else {
        setTimeout(() => {
          setIsLoading(false);
          Alert.alert(
            "Error",
            "Scanned QR code does not match the expected job code."
          );
          setScanned(false);
        }, 3000);
      }
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }
  if (hasPermission === false) {
    return (
      <Text>No access to camera. Please enable permissions in settings.</Text>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
          headerBackVisible: false,
          headerShadowVisible: false,
          headerTitle: "Scan QR Code",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Image source={icons.back} style={styles.backIcon} />
            </TouchableOpacity>
          ),
        }}
      />
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      <View style={styles.overlay}>
        <View style={styles.topOverlay} />
        <View style={styles.bottomOverlay} />
        <View style={styles.leftOverlay} />
        <View style={styles.rightOverlay} />
        <View style={styles.scanBox}>
          <View style={[styles.corner, styles.topLeft]} />
          <View style={[styles.corner, styles.topRight]} />
          <View style={[styles.corner, styles.bottomLeft]} />
          <View style={[styles.corner, styles.bottomRight]} />
          <Text style={styles.scanText}>
            Align QR code within the frame to scan
          </Text>
        </View>
      </View>

      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>Processing...</Text>
        </View>
      )}

      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 0,
  },
  topOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "32%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  bottomOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "32%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  leftOverlay: {
    position: "absolute",
    top: "32%",
    bottom: "32%",
    left: 0,
    width: "16%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  rightOverlay: {
    position: "absolute",
    top: "32%",
    bottom: "32%",
    right: 0,
    width: "16%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  scanBox: {
    width: 280,
    height: 300,
    borderRadius: 20,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    zIndex: 1,
  },
  corner: {
    width: 70,
    height: 70,
    borderColor: "#fff",
    borderRadius: 5,
    position: "absolute",
  },
  topLeft: {
    top: 0,
    left: 0,
    borderLeftWidth: 3,
    borderTopWidth: 3,
  },
  topRight: {
    top: 0,
    right: 0,
    borderRightWidth: 3,
    borderTopWidth: 3,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderLeftWidth: 3,
    borderBottomWidth: 3,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderRightWidth: 3,
    borderBottomWidth: 3,
  },
  scanText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  loadingOverlay: {
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 10,
  },
  loadingText: {
    marginTop: 10,
    color: "#fff",
    fontSize: 18,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: "orange",
  },
});
