import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import images from '../../../../constants/images';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

const AddJob = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [enviroment, setEnviroment] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [budget, setBudget] = useState('');

  // Handle form submission with axios
  const handlePostJob = async () => {
    if (!title || !description || !category || !enviroment || !address || !city) {
      Alert.alert('Error', 'Please fill all the fields before submitting.');
      return;
    }
  
    // Job data payload
    const jobData = {
      title: title,
      description: description,
      category: category,
      environment: enviroment, // Spelling corrected
      clientId: "66fd9893a2a4bed234315070",
      address: address,
      city: city,
      status: "open",
      scheduled: false,
      budget: budget,
    };
  
    try {
      // Send a POST request to the backend API using axios
      const response = await axios.post('http://192.168.8.103:8010/job/create', jobData);
  
      if (response.status === 201) {
        Alert.alert('Success', 'Job posted successfully.');
        // Clear form after successful submission
        setTitle('');
        setDescription('');
        setCategory('');
        setEnviroment('');  // Fixed typo
        setAddress('');
        setCity('');
        setBudget('');  // Clear budget field as well
      } else {
        console.log('Response status:', response.status);  // Debugging status code
        Alert.alert('Error', response.data.message || 'Failed to post the job.');
      }
    } catch (error) {
      console.error('Error posting the job:', error.response?.data || error.message);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };
  

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-white">
      {/* Background Image Section */}
      <View className="">
        <ImageBackground
          source={images.addJob} // Add your background image path
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
        {/* Job Title */}
        <TextInput
          className="w-full p-3 mb-4 border border-gray-300 rounded-md"
          placeholder="Job Title"
          value={title}
          onChangeText={setTitle}
        />

        {/* Job Description */}
        <TextInput
          className="w-full p-3 mb-4 border border-gray-300 rounded-md h-32"
          placeholder="Job Description"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        {/* Job Category - Picker */}
        <Text className="text-base text-black mb-2">Job Category</Text>
        <View className="w-full mb-4 border border-gray-300 rounded-md">
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


        {/* Indoor/Outdoor Work */}
        <Text className="text-base text-black mb-2">Indoor/Outdoor Work</Text>
        <View className="flex-row gap-6 mb-5">
          <TouchableOpacity onPress={() => setEnviroment('Indoor')}>
            <Text className={`text-base ${enviroment === 'Indoor' ? 'text-black' : 'text-gray-500'}`}>
              {enviroment === 'Indoor' ? '●' : '○'} Indoor
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setEnviroment('Outdoor')}>
            <Text className={`text-base ${enviroment === 'Outdoor' ? 'text-black' : 'text-gray-500'}`}>
              {enviroment === 'Outdoor' ? '●' : '○'} Outdoor
            </Text>
          </TouchableOpacity>
        </View>

        {/* Address Line */}
        <TextInput
          className="w-full p-3 mb-4 border border-gray-300 rounded-md"
          placeholder="Address Line"
          value={address}
          onChangeText={setAddress}
        />

        {/* City */}
        <TextInput
          className="w-full p-3 mb-4 border border-gray-300 rounded-md"
          placeholder="City"
          value={city}
          onChangeText={setCity}
        />

        {/* City */}
        <TextInput
          className="w-full p-3 mb-4 border border-gray-300 rounded-md"
          placeholder="Budget"
          value={budget}
          onChangeText={setBudget}
        />

        {/* Upload Photos */}
        {/* <Text className="text-base mb-2 ">
          Upload Photos
        </Text>
        <TouchableOpacity className="w-40
         bg-gray-200 p-2 rounded-md items-center mb-5">
          <Text className="text-blue-600 text-lg">Choose File</Text>
        </TouchableOpacity> */}

        {/* Post Job Button */}
        <TouchableOpacity className="w-full bg-yellow p-4 rounded-lg items-center" onPress={handlePostJob}>
          <Text className="text-white text-lg font-bold">Post Job</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default AddJob