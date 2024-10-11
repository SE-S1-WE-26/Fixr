import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter, Stack } from "expo-router"; // Correct hook from expo-router
import FormatDateTime from "../../../../utils/FormatDateTime";

import { icons } from "../../../../constants";

const GenerateQR = ({job}) => {
  const router = useRouter();
  const { jobName, date, time, qrcode } = useLocalSearchParams();

  return (
    <SafeAreaView className="h-full bg-white">
      <Stack.Screen
        options={{
          headerBackVisible: false,
          headerShadowVisible: false,
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Image
                source={icons.back}
                style={{ width: 24, height: 24 }} // Adjusted for better visibility
                tintColor="orange"
              />
            </TouchableOpacity>
          ),
        }}
      />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View className="bg-powder border border-platinum rounded-lg p-2 border-2">
      <View className='mb-4 justify-center'>
      <Text className='text-xl font-semibold mx-auto my-3'>{jobName}</Text>
          <View className='flex flex-row justify-between mx-3'>
          <Text>{FormatDateTime(date)}</Text>
          <Text>{time}</Text>
          </View>
      </View>
        <View className="bg-powder border border-platinum rounded-lg p-4 border-4">
          <QRCode value={qrcode} size={250} />
        </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default GenerateQR;
