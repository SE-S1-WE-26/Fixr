import React, { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View } from "react-native";
import Header from "../../components/common/Header";
import ProfileCard from "../../components/worker/profile/ProfileCard";
import Summary from "../../components/worker/profile/Summary";
import Heading from "../../components/common/Heading";
import ReviewWidget from "../../components/common/ReviewCard"; // Update if needed

const Profile = () => {
  const bottomSheetRef = useRef();

  return (
    <>
      <SafeAreaView className="h-full bg-white">
        <Header title={"Profile"} />
        <ScrollView>
          <ProfileCard />
          <Heading name="Summary" link="/" />
          <Summary rating={bottomSheetRef} />
        </ScrollView>

      {/* Pass bottomSheetRef to ReviewWidget */}
      <ReviewWidget rating={bottomSheetRef} />
      </SafeAreaView>
    </>
  );
};

export default Profile;