import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, View, Image, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../constants";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set a timeout for 3 seconds before navigating to the sign-in screen
    const timer = setTimeout(() => {
      setIsLoading(false);
      router.push("/sign-in");
    }, 3000);

    // Clean up the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.content}>
          <Image
            source={images.logo}
            resizeMode="contain"
            style={styles.logo}
          />
          {isLoading && (
            <ActivityIndicator size="large" color="#F59E2B" style={styles.loader} className='mt-10'/>
          )}
        </View>
      </ScrollView>
      <StatusBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
    minHeight: "85vh",
    width: "100%",
  },
  logo: {
    width: 240,
    height: 240,
  },
  loader: {
    marginTop: 20,
  },
});
