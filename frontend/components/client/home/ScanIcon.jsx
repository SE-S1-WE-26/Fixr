import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, Animated } from "react-native";
import { icons } from "../../../constants";
import * as Animatable from 'react-native-animatable';

const ScanIcon = ({ icon }) => {
  const [scaleValue] = useState(new Animated.Value(0));

  // Scale animation on mount
  useEffect(() => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 5,
      tension: 80,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.square,
        { transform: [{ scale: scaleValue }] },
      ]}
    >
      <Animatable.View
        animation="pulse"
        easing="ease-in-out"
        iterationCount="infinite"
      >
        <Image source={icon} style={styles.icon} />
      </Animatable.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  square: {
    backgroundColor: "#F8EFD7",
    width: 60,
    height: 60,
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
