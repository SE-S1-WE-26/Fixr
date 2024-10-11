import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Linking,
  } from "react-native";
import React from 'react'
import Ionicons from "@expo/vector-icons/Ionicons";
import JobStatusCard from "./JobStatusCard";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const ProfileBody = () => {
  return (
    <View className='p-4'>

          <JobStatusCard
            subTitle={"Job is ongoing"}
            iconName={"cog"}
            iconColor={"red"}
            bgColor={"#ffdede"}
            title={"In Progress"}
            time={"10:00 AM"}
          />
          <JobStatusCard
            subTitle={"Job is Complted"}
            iconName={"checkmark-done-sharp"}
            iconColor={"#78a55a"}
            bgColor={"#def7ff"}
            title={"Completed"}
            time={"04:00 PM"}
          />
          <JobStatusCard
            subTitle={"Job is Close"}
            iconName={"enter-outline"}
            iconColor={"blue"}
            bgColor={"#f2f2f2"}
            title={"Check Out"}
            time={"05:00 PM"}
          />
          <View>
            <View className="flex-col items-center justify-center mt-5">
              <View className=" flex-1  justify-center items-center p-1">
                <TouchableOpacity>
                  <View className="bg-[#77a143] p-3 rounded-md">
                    <Text className="font-bold text-lg">
                      {" "}
                      <MaterialIcons
                        name="payments"
                        size={24}
                        color="black"
                      />{" "}
                      Payments
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View className=" flex-1  justify-center items-center p-1">
                <TouchableOpacity>
                  <View className="bg-[#ffb727bf] p-3 rounded-md">
                    <Text className="font-bold text-lg">
                      {" "}
                      <Entypo name="archive" size={24} color="black" /> Status
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
    </View>
  )
}

export default ProfileBody