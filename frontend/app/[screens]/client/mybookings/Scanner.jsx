import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useRouter, useLocalSearchParams } from 'expo-router';  // useLocalSearchParams instead of useSearchParams

export default function Scanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const router = useRouter();  // Use router for navigation
  const { qrcode } = useLocalSearchParams();  // Get the expected QR code passed from JobCard

  // Request camera permission when the app starts
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // Handle barcode scan
  const handleBarCodeScanned = ({ type, data }) => {
    if (!scanned) {  // Prevent duplicate scan handling
      setScanned(true);
      setIsLoading(true); // Start loader
      
      const scannedData = {
        data,
        scannedDate: new Date().toLocaleString()
      };

      if (data === qrcode) {
        // If the scanned code matches the expected QR code
        setTimeout(() => {
          setIsLoading(false); // Stop loader
          // Navigate to new screen with scanned data
          router.push({
            pathname: '/pages/client/home/CompletedJob',
            params: { ...scannedData }  // Passing the scanned data and date
          });
          // setScanned(false); // No need to reset right away since we already navigated
        }, 1000);  // Delay to mimic processing time
      } else {
        // If the scanned code does not match, show the error and pause scanning for 3 seconds
        setTimeout(() => {
          setIsLoading(false); // Stop loader
          Alert.alert('Error', 'Scanned QR code does not match the expected job code.');
          setScanned(false);  // Reset for future scans
        }, 3000);  // Delay for error message
      }
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera. Please enable permissions in settings.</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}  // Disable scanning after first scan
        style={StyleSheet.absoluteFillObject}
      />

      {/* Overlay for scanning area */}
      <View style={styles.overlay}>
        <View style={styles.scanBox}>
          <Text style={styles.scanText}>Align QR code within the frame to scan</Text>
        </View>
      </View>

      {/* Show loading indicator when scanning */}
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>Processing...</Text>
        </View>
      )}

      {/* Custom back button */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Darken background
  },
  scanBox: {
    width: 250,
    height: 250,
    borderWidth: 3,
    borderColor: '#F59E2B',
    borderRadius: 20,  // Rounded corners
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  scanText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 10,
  },
  loadingOverlay: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 10,  // Rounded corners for loading box
  },
  loadingText: {
    marginTop: 10,
    color: '#fff',
    fontSize: 18,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 20,  // Rounded corners for back button
    paddingHorizontal: 15,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
