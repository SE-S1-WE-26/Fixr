import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, ScrollView, View } from "react-native";
import Header from "../../components/common/Header";

import ProfileCard from "../../components/worker/profile/ProfileCard";
import Summary from "../../components/worker/profile/Summary";
import Heading from '../../components/common/Heading';

const Profile = () => {
  return (
    <SafeAreaView className="h-full bg-white">
      <Header title={"Profile"} />
      <ScrollView>
        <ProfileCard />
        <Heading name='Summary' link='/' />
        <Summary />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
