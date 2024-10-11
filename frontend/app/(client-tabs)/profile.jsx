import React from "react";
import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/common/Header";
import ProfileCard from "../../components/client/profile/profile/ProfileCard";
import ProfileBody from "../../components/client/profile/profile/ProfileBody";

const Profile = () => {
  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView>
        <View className="w-full h-full">
          <Header title={"My Profile"} />
          <View>

          </View>
          <ProfileCard/>
          <ProfileBody/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
