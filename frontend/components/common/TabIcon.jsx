import { React } from "react";
import { View, Text, Image } from "react-native";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="items-center justify-center">
      <Image
        source={icon}
        resizedMode="contain"
        tintColor={`${focused ? "orange" : color}`}
        className="w-6 h-6"
      />
      {/* <Text className={`${focused? 'font-semibold' : 'font-medium'}`}>
          {name}
        </Text> */}
    </View>
  );
};

export default TabIcon;
