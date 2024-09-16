import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, ScrollView } from "react-native";
import Header from "../../components/common/Header";
import Summary from "../../components/worker/earnings/Summary";
import EarningsCard from "../../components/worker/earnings/EarningsCard";

import { EarningsList } from "../../constants/constants";
import FormatCurrency from "../../utils/FormatCurrency";

const Earnings = () => {
  return (
    <SafeAreaView className="h-full bg-white">
      <Header title={"My Earnings"} />
      <Summary />
      <ScrollView className="mt-4">
        {EarningsList.map((earning) => (
          <EarningsCard
            key={earning.id}
            jobNo={earning.job}
            date={earning.date}
            earnings={FormatCurrency(earning.earnings)}
            time={earning.duration}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Earnings;
