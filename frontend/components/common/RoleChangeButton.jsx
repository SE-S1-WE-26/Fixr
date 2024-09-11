//This is a Temperory Button to test the role changes. This file will be removed in the final version of the app.

import { TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { React, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, router } from "expo-router";

const RoleChangeButton = () => {
  const [role, setRole] = useState("client");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const role = await AsyncStorage.getItem("role");
        if (role) {
          setRole(role);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchRole();
  }, []);

  const handlePress = async () => {
    setIsLoading(true);
    try {
      const newRole = role === "client" ? "worker" : "client";
      await AsyncStorage.setItem("role", newRole);
      setRole(newRole);
      console.log('Role Changed to :', newRole);
      router.push(`(${newRole}-tabs)/home`);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.8}
      className={`bg-[#FFB8B8] rounded-xl min-h-[35px] px-4 justify-center items-center ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text
          style={{
            color: "#DB3131",
            fontWeight: "600",
            fontSize: 14,
          }}
        >
          Change to {`${role === "worker" ? "Client" : "Worker"}`}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default RoleChangeButton;
