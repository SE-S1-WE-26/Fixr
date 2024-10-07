import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';  // Import useRoute to access passed params

export default function CompletedJob() {
  const route = useRoute();  // Get the route object to access params
  const { data, scannedDate } = route.params;  // Destructure the passed params

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Scanned Data: {data}</Text>
      <Text style={styles.text}>Scanned At: {scannedDate}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    margin: 10,
  },
});
