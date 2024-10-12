import { View, Text } from "react-native";
import React from "react";
import {
  CalcTotalEarnings,
  CalcCompanyFee,
  CalcNetAmount,
} from "../../../utils/CalcEarnings";
import FormatCurrency from "../../../utils/FormatCurrency";

const Summary = () => {
  const totalEarnings = CalcTotalEarnings(500, 76);
  const companyFee = CalcCompanyFee(38000, 5);
  const netAmount = CalcNetAmount(totalEarnings, companyFee);

  return (
    <View className="flex mt-2 rounded-xl bg-powder shadow px-4 md:px-5 py-4 md:py-5 mx-4 md:mx-6 justify-center">
      <View>
        <View className="flex-row justify-between">
          <Text className="text-base md:text-lg">Hourly Rate</Text>
          <Text className="text-base md:text-lg font-semibold">LKR 500.00</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-base md:text-lg">Total Work Hours</Text>
          <Text className="text-base md:text-lg font-semibold">x 76</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-base md:text-lg">Total Earnings</Text>
          <Text className="text-base md:text-lg font-semibold">
            LKR {FormatCurrency(totalEarnings)}
          </Text>
        </View>
        <View className="flex-row justify-between mb-2">
          <Text className="text-base md:text-lg">Company Fee(5%)</Text>
          <Text className="text-base md:text-lg text-red-500 font-semibold">
            - LKR {FormatCurrency(companyFee)}
          </Text>
        </View>
      </View>
      <View className="flex items-end mt-2">
        <Text className="text-base md:text-lg">Net Amount</Text>
        <View className="flex-row justify-between items-center w-full">
          <Text className="font-bold text-2xl md:text-3xl">LKR </Text>
          <Text className="font-bold text-5xl md:text-6xl text-orange mt-1">
            {FormatCurrency(netAmount)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Summary;
