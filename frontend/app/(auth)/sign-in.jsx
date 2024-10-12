import { View, Text, ScrollView, Image, Alert , ActivityIndicator, TouchableOpacity } from "react-native";
import { React, useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/common/CustomButton";
import { Link, router } from "expo-router";
import axios from "axios";
import { images } from "../../constants";
import FormField from "../../components/common/FormField";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage


const SignIn = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(""); // Reset error message

    try {
        const response = await axios.post('https://fixerbackend.vercel.app/auth/signin', {
            username: form.email, // Use form.email for username
            password: form.password
        });
  
        console.log('Sign in response:', response.data);
      
        if (response.data.token) {
            await AsyncStorage.setItem('token', response.data.token);
            console.log('Token saved:', response.data.token);
            router.push(response.data.redirectUrl); // Default to /home if redirectUrl is not defined
        }
    } catch (error) {
      //console.error('Error signing in:', error.response ? error.response.data : error.message);
      setErrorMessage(
        error.response?.data?.message || "An unknown error occurred."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to save user role to AsyncStorage and redirect
  const handleLogin = async (role) => {
    try {
      setIsSubmitting(true);
      await AsyncStorage.setItem("userRole", role);
      console.log(`User role saved: ${role}`); // Debugging line
      router.push(`(${role}-tabs)/home`);
    } catch (error) {
      console.error("Error saving user role:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Initially set to true

  // Fetch users from the backend API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://fixerbackend.vercel.app/user");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching
      }
    };

    fetchUsers();
  }, []);

  // Handle test login
  const handleTestLogin = async (user) => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://fixerbackend.vercel.app/auth/signin",
        {
          username: user.username, // Use the username from the selected user
          password: user.password, // Assuming you have a test password for each user (use cautiously)
        }
      );

      console.log("Sign in response:", response.data);

      if (response.data.token) {
        await AsyncStorage.setItem("token", response.data.token);
        console.log("Token saved:", response.data.token);
        router.push(response.data.redirectUrl);
      }
    } catch (error) {
      console.error(
        "Error signing in:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView className="h-full">
      
      <ScrollView>
        <View className="w-full justify-center h-full px-10 my-2">
          <Image
            source={images.logoSmall}
            resizeMode="contain"
            className="w-24 h-24 mx-auto my-12"
          />
          <Text className="text-2xl font-semibold -mt-4">Login to Fixr</Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            secureTextEntry // This will hide the password input
          />
          {errorMessage ? (
            <Text className="text-red-500">{errorMessage}</Text>
          ) : null}
          <CustomButton
            title="Sign In"
            handlePress={handleSignIn}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <CustomButton
            title="Sign in as Client"
            handlePress={() => handleLogin("client")}
            containerStyles="mt-7 bg-black-900"
            isLoading={isSubmitting}
          />
          <CustomButton
            title="Sign in as Worker"
            handlePress={() => handleLogin("worker")}
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

          <ScrollView>
            <View>
              <Text
                style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}
              >
                Test Login as User:
              </Text>
              <View className="flex flex-col gap-2">
                {users.map((user) => (
                  <TouchableOpacity
                    className="bg-blue-500 py-2 px-4 rounded-md"
                    key={user._id}
                    onPress={() => handleTestLogin(user)}
                    disabled={isLoading}
                  >
                    <Text style={{ color: "white", fontWeight: "bold" }}>
                      {user.name || user.username}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
