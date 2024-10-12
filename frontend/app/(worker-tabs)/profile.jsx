import React, { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View } from "react-native";
import Header from "../../components/common/Header";
import ReviewCard from "../../components/common/ReviewCard";
import ProfileCard from "../../components/worker/profile/ProfileCard";
import Summary from "../../components/worker/profile/Summary";
import Heading from "../../components/common/Heading";
import BottomSheet from "@gorhom/bottom-sheet"; // Assuming you're using @gorhom/bottom-sheet


const Profile = () => {
  const bottonSheetRef = useRef(); // ref for the bottom sheet

  return (
    <>
    <SafeAreaView className="h-full bg-white">
      <Header title={"Profile"} />
      <ScrollView>
        <ProfileCard />
        <Heading name="Summary" link="/" />
        {/* Pass the ref to the Summary */}
        {/* <Summary rating={bottonSheetRef} /> */}
      </ScrollView>

    </SafeAreaView>
      <>
        {/* <ReviewCard rating={bottonSheetRef} /> */}
      </>
    </>
  );
};

export default Profile;
