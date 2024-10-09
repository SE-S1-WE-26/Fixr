import React from "react";
import { View, Text } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useLocalSearchParams } from "expo-router";  // Correct hook from expo-router

const GenerateQR = () => {
  const { jobName,date,time,handyman,jobId,workerId} = useLocalSearchParams();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Job Name: {jobName}</Text>
      <Text>Date: {date}</Text>
      <Text>Time: {time}</Text>
      <Text>Handyman: {handyman}</Text>
      <QRCode
        value={`JobID:${jobId},WorkerID:${workerId}`} // QR code contains Job ID and Worker ID
        size={200}
      />
    </View>
  );
};

export default GenerateQR;
