import { View, Text, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../CustomButton";
import { Link } from "expo-router";
import { images } from "../../../constants";
import FormField from "../FormField";

const ClientSignUp = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const [mylongitude , setLongitude] = useState(null);  // Initialize as null
  const [mylatitude , setLatitude] = useState(null);    // Initialize as null
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false); // For success animation state
  const [validationErrors, setValidationErrors] = useState({}); // For validation errors



  const [form, setForm] = useState({
    userType: "client",
    name: "",
    email: "",
    username: "",
    password: "",
    location: "",
    latitude: 6.914796180809013,
    longitude: 79.97397348721545,
  });


    // Fetch current location
    useEffect(() => {
      const getLocation = async () => {
        setIsLoading(true);
        try {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== "granted") {
            setLocationError("Permission to access location was denied");
            return;
          }
  
          const myLocation = await Location.getCurrentPositionAsync();
          setLongitude(myLocation.coords.longitude);
          setLatitude(myLocation.coords.latitude);
  
        } catch (error) {
          setLocationError("Error getting location permissions");
        } finally {
          setIsLoading(false);
        }
      };
  
      getLocation();
    }, []);

      // Update form with latitude and longitude when available
  useEffect(() => {
    if (mylatitude && mylongitude) {
      setForm(prevForm => ({
        ...prevForm,
        latitude: mylatitude,
        longitude: mylongitude,
      }));
    }
  }, [mylatitude, mylongitude]);


   // Frontend validation function
   const validateForm = () => {
    const errors = {};
    if (!form.name) errors.name = alert("Name is required.");
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) errors.email = alert("Valid email is required.");
    if (!form.password || form.password.length < 6) errors.password = alert("Password must be at least 6 characters.");
    if (!form.age || isNaN(form.age)) errors.age = alert("Age must be a valid number.");
    if (!form.category) errors.category = alert("Category is required.");
    if (!form.hourlyRate || isNaN(form.hourlyRate)) errors.hourlyRate = "Hourly rate must be a valid number.";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  

  const submit = async () => {
    if (!validateForm()) return; // Check if validation passes

    setIsSubmitting(true);
    console.log(form);
    try {
      const response = await fetch('http://192.168.174.210:8010/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          userType: 'client', // Specify user type as client
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setIsRegistered(true); // Show success animation
        console.log(data.message);
      } else {
        Alert.alert("Error", data.errors || data.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  
  // Display loading state
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Display location error
  if (locationError) {
    return (
      <View className="flex-1 justify-center items-center p-5">
        <Text>{locationError}</Text>
      </View>
    );
  }

  // Display Lottie animation on successful registration
  if (isRegistered) {

    setTimeout(() => {
        router.push('/sign-in');
    },3000)
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <SuccessAnimation/>
        <Text style={{ fontSize: 18, marginTop: 20 }}>Registration Successful!</Text>
      </SafeAreaView>
    );
  }


  return (
    <SafeAreaView className="h-full">
      <ScrollView>
        <View className="w-full justify-center h-full px-10 my-2">
          <Image
            source={images.logoSmall}
            resizeMode="contain"
            style={{ width: 80, height: 80, marginVertical: 24 }}
          />
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
            Register as a Client
          </Text>
          <FormField
            title="Name"
            value={form.name}
            handleChangeText={(text) => setForm({ ...form, name: text })}
            style={{ marginBottom: 20 }}
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(text) => setForm({ ...form, email: text })}
            style={{ marginBottom: 20 }}
            keyboardType="email-address"
          />
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(text) => setForm({ ...form, username: text })}
            style={{ marginBottom: 20 }}
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(text) => setForm({ ...form, password: text })}
            style={{ marginBottom: 20 }}
            secureTextEntry
          />
          <FormField
            title="Location"
            value={form.location}
            handleChangeText={(text) => setForm({ ...form, location: text })}
            style={{ marginBottom: 20 }}
          />
          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={{ fontSize: 16, color: '#737373' }}>
              Already have an account?
            </Text>
            <Link href="/sign-in" style={{ fontSize: 16, fontWeight: 'bold', color: '#000' }} className='ml-2'>
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ClientSignUp;
