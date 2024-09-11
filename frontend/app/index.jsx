import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../constants";
import CustomButton from "../components/common/CustomButton";

export default function App() {
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="w-full justify-center items-center min-h-[85vh] px-4">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-60 h-60"
          />
          <CustomButton
            title="Get Started"
            handlePress={() => {
              router.push("/sign-in");
            }}
            containerStyles="w-3/4 mt-7"
            isLoading={false}
          />
        </View>
      </ScrollView>
      <StatusBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
