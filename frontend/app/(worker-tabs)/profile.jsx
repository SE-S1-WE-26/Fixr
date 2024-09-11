import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, ScrollView } from "react-native";
import Header from "../../components/Header";

const Profile = () => {
  return (
    <SafeAreaView className="h-full bg-white px-5 py-4">
      <ScrollView>
        <View className="w-full h-full">
          <Header title={"Profile"} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
