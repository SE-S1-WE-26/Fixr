import { View, Text, ScrollView, Image } from "react-native";
import { React, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/common/CustomButton";
import { Link, router } from "expo-router";

import { images } from "../../constants";
import FormField from "../../components/common/FormField";

import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage - This is Temporary for Dev purposes

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = () => {
    router.push("/profile");
  };

  // Function to save user role to AsyncStorage and redirect
  const handleLogin = async (role) => {
    try {
      setIsSubmitting(true);

      // Save the role (client or worker) to AsyncStorage
      await AsyncStorage.setItem("userRole", role);
      console.log(`User role saved: ${role}`); // Debugging line
      // Redirect to the profile page
      router.push(`(${role}-tabs)/home`);
    } catch (error) {
      console.error("Error saving user role:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="h-full">
      <ScrollView>
        <View className="w-full justify-center h-full px-10 my-2">
          <Image
            source={images.logoSmall}
            resizeMode="contain"
            className="w-24 h-24 mx-auto my-12"
          />
          <Text className="text-2xl text-semibold -mt-4 font-semibold">
            Login to Fixr
          </Text>
          {/* <FormField 
            title="Email"
            value={form.email}
            handleChangeText={(e)=>setForm({...form,email:e})}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField 
            title="Password"
            value={form.password}
            handleChangeText={(e)=>setForm({...form,password:e})}
            otherStyles="mt-7"
          />
          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          /> */}

          <CustomButton
            title="Sign in as Client"
            handlePress={() => {
              console.log("Sign in as Client"); // Log button click
              {
                handleLogin("client");
              }
            }}
            containerStyles="mt-7 bg-black-900"
            isLoading={isSubmitting}
          />

          <CustomButton
            title="Sign in as Worker"
            handlePress={() => {
              console.log("Sign in as Worker"); // Log button click
              {
                handleLogin("worker");
              }
            }}
            containerStyles="mt-4"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-400 font-medium">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-semibold text-black-600"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
