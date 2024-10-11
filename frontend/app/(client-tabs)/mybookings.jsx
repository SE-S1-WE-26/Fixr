import React from "react";
import { View, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/common/Header";
import BookingsBox from "../../components/client/BookingsBox";
import images from "../../constants/images";
import CustomButton from "../../components/common/CustomButton";
import { router } from "expo-router";

const MyBookings = () => {
  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView>
        <View className="w-full h-full">
          <Header title={"My Bookings"} />
          <Image
          source={images.myBookings}
          className="mx-auto"
          />
          <CustomButton
            title={"My Job Posts"}
            handlePress={() => router.push('../screens/client/mybookings/myJobPosts')}
          />
          <View className="flex-col">
            <BookingsBox
              type={"plumbing"}
              topic={"Leaking Kitchen Sink"}
              handyman={"Janaka Fernando"}
              date={"23/10/2024"}
              time={"02:00PM-04:00PM"}
              amount={"LKR 2,500.00"}
              qrcode={"123456789"}
              id={"111"}
              workerId={"122345232"}
            />
            <BookingsBox
              type={"roofing"}
              topic={"Roof Leak Repair"}
              handyman={"Kamal Perera"}
              date={"23/10/2024"}
              time={"02:00PM-04:00PM"}
              amount={"LKR 2,500.00"}
              qrcode={"223456789"}
              id={"222"}
              workerId={"122345233"}

            />
            <BookingsBox
              type={"painting"}
              topic={"Painting"}
              handyman={"Sunil Silva"}
              date={"23/10/2024"}
              time={"02:00PM-04:00PM"}
              amount={"LKR 2,500.00"}
              qrcode={"323456789"}
              id={"333"}
              workerId={"122345234"}
            />
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyBookings;
