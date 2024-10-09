import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { icons, images } from "../../../constants";
import { useRouter } from "expo-router";
import FormatCurrency from "../../../utils/FormatCurrency";
import StarRating from "react-native-star-rating-widget";

const EOMCard = ({ eom }) => {
  const router = useRouter();

  // Get the current month and year
  const getCurrentMonthYear = (year, month) => {
    const date = new Date(year, month - 1); // month is 0-indexed
    const options = { year: 'numeric', month: 'long' };
    return date.toLocaleDateString(undefined, options); // e.g., "October, 2024"
  };

  const handleNavigation = () => {
    console.log("Navigating to Employee of the Month");
    router.push("/pages/worker/home/eom");
  };

  if (!eom) {
    // If `eom` is not yet loaded, show a loading indicator or placeholder
    return (
      <View className="flex h-[100px] rounded-xl py-2 px-4 justify-center items-center">
        <ActivityIndicator size="large" color="orange" />
      </View>
    );
  }

  return (
    <TouchableOpacity
      className="flex-row justify-between min-h-[100px] bg-powder py-2 px-4 rounded-xl mx-5 shadow"
      onPress={handleNavigation}
    >
      <View className="flex-1">
        <Text className="text-sm md:text-base font-medium">
          Meet Our Employee of the Month!
        </Text>
        <View className="flex-row mt-2">
          <Image
            source={{ uri: eom?.workerId?.userId?.profilePic }}
            style={{ height: 48, width: 48, borderRadius: 24 }}
          />
          <View className="ml-3 flex-1">
            <Text
              className="font-semibold text-xl md:text-2xl"
              numberOfLines={1}
            >
              {eom?.workerId?.userId?.name}
            </Text>
            <View className="flex-row justify-between">
              <View className="flex flex-row gap-4">
                <Text className="font-medium text-sm">
                  {getCurrentMonthYear(eom?.year, eom?.month)}
                </Text>
                <View className="flex flex-row items-center px-2">
                  <Text className="font-medium text-sm text-slate-500">
                    {eom?.workerId?.userId.rating}
                  </Text>
                  <StarRating
                    className="ml-2"
                    rating={eom?.workerId?.userId.rating}
                    starSize={16}
                    starStyle={{ marginHorizontal: 0 }}
                  />
                </View>
              </View>
              <Text className="font-medium text-sm mr-4">
                LKR {FormatCurrency(eom.workerId.earnings)}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <Image
        source={images.trophy}
        style={{ height: 64, width: 64 }}
        className="self-center"
      />
    </TouchableOpacity>
  );
};

export default EOMCard;
