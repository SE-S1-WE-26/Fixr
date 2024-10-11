import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import images from "../../../../constants/images";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
const { GoogleGenerativeAI } = require("@google/generative-ai");
import uploadImages from "../../../../utils/uploadImage";
import * as ImagePicker from "expo-image-picker";

const AddJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [environment, setEnvironment] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [budget, setBudget] = useState("");
  const [imageURIs, setImageURIs] = useState([]); // State to hold selected image URIs
  const [estJobDuration, setEstJobDuration] = useState("");
  const [loading, setLoading] = useState(false); // State to track loading

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    console.log("Permission result:", permissionResult);

    if (permissionResult.granted === false) {
      Alert.alert("Permission to access camera roll is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true, // Allow multiple selection
    });
    console.log("Picker result:", pickerResult);

    // Check if the picker result has assets and update the image URIs accordingly
    if (
      !pickerResult.canceled &&
      pickerResult.assets &&
      pickerResult.assets.length > 0
    ) {
      const selectedImages = pickerResult.assets.map((asset) => asset.uri); // Get all selected assets
      console.log("Images selected:", selectedImages);
      setImageURIs(selectedImages); // Set the image URIs to state
    } else {
      console.log("Image selection was cancelled or no images were selected.");
    }
  };

  const getEstimatedDuration = async (title, description) => {
    try {
      setLoading(true); // Start loading when the function is called
      const genAI = new GoogleGenerativeAI(
        "AIzaSyAxCnNyWnEpbYMILL_fSLeKXWAfu9ViO0Y"
      );
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `Based on the job description and title, estimate the approximate and most accurate minimum number of hours to complete the job.\nJob title: ${title}\nJob Description: ${description}\nReturn just a number or a number with one decimal place (eg. 2.5) and also return a number less than 16`;

      const result = await model.generateContent(prompt);
      const responseText = await result.response.text(); // Make sure to await the text() method
      console.log("Raw result:", responseText);

      // Extract the number or number with one decimal place using a regular expression
      const numberMatch = responseText.match(/(\d+(\.\d)?)/);
      if (numberMatch) {
        const estimatedHours = parseFloat(numberMatch[0]); // Parse the extracted number as a float
        console.log("Extracted estimated hours:", estimatedHours);
        setEstJobDuration(estimatedHours); // Set the estimated hours in state
      } else {
        console.warn("No number found in the response.");
        setEstJobDuration(null); // Handle case where no number is found
      }
    } catch (error) {
      console.error("Error estimating job duration:", error);
      setEstJobDuration(null); // Handle errors gracefully by resetting the state
    } finally {
      setLoading(false); // Stop loading after the function completes
    }
  };

  // Handle form submission with axios
  const handlePostJob = async () => {
    if (
      !title ||
      !description ||
      !category ||
      !environment ||
      !address ||
      !city
    ) {
      Alert.alert("Error", "Please fill all the fields before submitting.");
      return;
    }

    let imageURLs = [];
    if (imageURIs.length > 0) {
      imageURLs = await uploadImages({ folder: "jobs", imageURIs }); // Pass the array of URIs
    }

    const jobData = {
      title: title,
      description: description,
      category: category,
      estDuration: estJobDuration,
      environment: environment,
      clientId: "66fd9893a2a4bed234315070",
      address: address,
      city: city,
      status: "pending",
      scheduled: false,
      budget: budget,
      images: imageURLs.length > 0 ? imageURLs : [],
    };

    try {
      const response = await axios.post(
        "http://192.168.1.3:8010/job/create",
        jobData
      );

      if (response.status === 201) {
        Alert.alert("Success", "Job posted successfully.");
        setTitle("");
        setDescription("");
        setCategory("");
        setEnvironment("");
        setAddress("");
        setCity("");
        setBudget("");
        setEstJobDuration("");
      } else {
        console.log("Response status:", response.status);
        console.log("Response data:", response.data);
        Alert.alert(
          "Error",
          response.data.message || "Failed to post the job."
        );
      }
    } catch (error) {
      console.error(
        "Error posting the job:",
        error.response?.data || error.message
      );
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  const handleEstimateDuration = () => {
    getEstimatedDuration(title, description);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-white">
      <View className="">
        <ImageBackground
          source={images.addJob}
          className="w-full h-72 bg-white"
        >
          <View className="items-center justify-center h-full">
            <Text className="text-3xl font-bold mb-56">Post Jobs</Text>
          </View>
        </ImageBackground>
      </View>

      <View className="-mt-52 mx-3 bg-white p-5 rounded-xl shadow-md mb-3">
        <Text className="text-base text-center mb-4 font-semibold">
          Your next handyman is a form away
        </Text>
        <TextInput
          className="w-full p-3 mb-4 border border-gray-300 rounded-md"
          placeholder="Job Title"
          value={title}
          onChangeText={setTitle}
        />

        <Text className="text-base text-black mb-2">Job Category</Text>
        <View className="w-full mb-8 border border-gray-300 rounded-md">
          <Picker
            selectedValue={category}
            onValueChange={(itemValue) => setCategory(itemValue)}
          >
            <Picker.Item label="Select Job Category" value="" />
            <Picker.Item label="Roofing" value="Roofing" />
            <Picker.Item label="Plumbing" value="Plumbing" />
            <Picker.Item label="Painting" value="Painting" />
            <Picker.Item label="Gardening" value="Gardening" />
            <Picker.Item label="Electrical work" value="Electrical work" />
          </Picker>
        </View>

        <TextInput
          className="w-full p-3 mb-4 border border-gray-300 rounded-md h-32"
          placeholder="Job Description"
          value={description}
          onChangeText={(text) => {
            setDescription(text);
          }}
          multiline
        />

        <TouchableOpacity
          className="mb-4 bg-orange p-2 rounded"
          onPress={handleEstimateDuration}
        >
          <Text className="text-white text-center">Estimate Duration</Text>
        </TouchableOpacity>

        <View className="flex flex-row justify-between items-center my-4 mb-4">
          <Text className="text-base">Estimated Job Duration:</Text>
          {loading ? (
            <ActivityIndicator size="small" color="#FF5733" />
          ) : (
            <Text className="text-orange font-bold text-2xl">
              {estJobDuration ? (
                `${estJobDuration} hours`
              ) : (
                <ActivityIndicator size="small" color="#FF5733" />
              )}
            </Text>
          )}
        </View>
        <View className="flex flex-row mb-8">
          <Text className="text-gray-500 text-xs text-justify">
            <Text className="text-orange text-xs mr-2">Note: </Text>
            The job duration estimation is more accurate with more detail in the
            title and description.
          </Text>
        </View>

        <Text className="text-base text-black mb-2">Indoor/Outdoor Work</Text>
        <View className="flex-row gap-6 mb-8">
          <TouchableOpacity onPress={() => setEnvironment("Indoor")}>
            <Text
              className={`text-base ${
                environment === "Indoor" ? "text-black" : "text-gray-500"
              }`}
            >
              {environment === "Indoor" ? "●" : "○"} Indoor
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setEnvironment("Outdoor")}>
            <Text
              className={`text-base ${
                environment === "Outdoor" ? "text-black" : "text-gray-500"
              }`}
            >
              {environment === "Outdoor" ? "●" : "○"} Outdoor
            </Text>
          </TouchableOpacity>
        </View>

        <TextInput
          className="w-full p-3 mb-4 border border-gray-300 rounded-md"
          placeholder="Address Line"
          value={address}
          onChangeText={setAddress}
        />

        <TextInput
          className="w-full p-3 mb-4 border border-gray-300 rounded-md"
          placeholder="City"
          value={city}
          onChangeText={setCity}
        />

        <TextInput
          className="w-full p-3 mb-4 border border-gray-300 rounded-md"
          placeholder="Budget"
          value={budget}
          onChangeText={setBudget}
        />

        <TouchableOpacity onPress={pickImage} className="mb-4">
          <Text className="text-blue-500 text-center">Select Image</Text>
        </TouchableOpacity>

        {imageURIs.length > 0 && (
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {imageURIs.map((uri, index) => (
              <Image
                key={index}
                source={{ uri }}
                style={{
                  width: 100,
                  height: 100,
                  marginVertical: 10,
                  marginRight: 10,
                }}
              />
            ))}
          </View>
        )}

        <TouchableOpacity
          className="w-full bg-yellow p-4 rounded-lg items-center"
          onPress={handlePostJob}
        >
          <Text className="text-white text-lg font-bold">Post Job</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddJob;
