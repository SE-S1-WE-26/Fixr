import { View, Image, StyleSheet } from "react-native";
import React from "react";
import { icons } from "../../../constants";

const ScanIcon = ({ icon }) => {
  return (
    <View style={styles.square}>
      <Image source={icon} style={styles.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  square: {
    backgroundColor: "orange", 
    width: 50,
    height: 50,
    borderRadius: 10, 
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 60,
    height: 60,
    tintColor: "black", 
  },
});

export default ScanIcon;
