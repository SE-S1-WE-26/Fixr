import { StyleSheet, Text, View } from "react-native";
import { Slot, SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import WorkerProvider from "../components/common/mapView/WorkerProvider";

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

    <GestureHandlerRootView>
    <WorkerProvider>

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
        <Stack.Screen name="ReportWorker" options={{ headerShown: false }} />
        <Stack.Screen name="CompletedJob" options={{ headerShown: false }} />
        <Stack.Screen name="qrscanner" options={{ headerShown: false }} />
        <Stack.Screen name="StartJob" options={{ headerShown: false }} />
      </Stack>
    </>
    </WorkerProvider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
