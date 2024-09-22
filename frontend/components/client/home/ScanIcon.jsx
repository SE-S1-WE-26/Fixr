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
    width: 70,
    height: 70,
    borderRadius: 20, 
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 70,
    height: 70,
    tintColor: "black", 
  },
});

export default ScanIcon;
