import React from "react";
import { View, Text } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useLocalSearchParams } from "expo-router";  // Correct hook from expo-router

const GenerateQR = () => {
  const { jobName,date,time,qrcode} = useLocalSearchParams();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Job Name: {jobName}</Text>
      <Text>Date: {date}</Text>
      <Text>Time: {time}</Text>
      <QRCode
        value={`Job Code:${qrcode}`} // QR code contains Job ID
        size={250}
      />
    </View>
  );
};

export default GenerateQR;
