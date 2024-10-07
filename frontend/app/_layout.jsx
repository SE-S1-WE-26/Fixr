import { StyleSheet, Text, View } from "react-native";
import { Slot, SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Montserrat-Black": require("../assets/fonts/Montserrat-Black.ttf"),
    "Montserrat-Bold": require("../assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-ExtraBold": require("../assets/fonts/Montserrat-ExtraBold.ttf"),
    "Montserrat-ExtraLight": require("../assets/fonts/Montserrat-ExtraLight.ttf"),
    "Montserrat-Light": require("../assets/fonts/Montserrat-Light.ttf"),
    "Montserrat-Medium": require("../assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-SemiBold": require("../assets/fonts/Montserrat-SemiBold.ttf"),
    "Montserrat-Thin": require("../assets/fonts/Montserrat-Thin.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;

  return (
    <>
      <Stack>
        // Common
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />

        // Worker
        <Stack.Screen name="(worker-tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="jobdetails" options={{ headerShown: true }} />
        <Stack.Screen name="eom" options={{ headerShown: true }} />

        // Client
        <Stack.Screen name="(client-tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="ReportWorker" options={{ headerShown: true }} />
        <Stack.Screen name="CompletedJob" options={{ headerShown: true }} />
        <Stack.Screen name="Scanner" options={{ headerShown: true }} />
        <Stack.Screen name="StartJob" options={{ headerShown: true }} />
      </Stack>
    </>
  );
};

export default RootLayout;
