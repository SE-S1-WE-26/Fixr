import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    StyleSheet,
    ScrollView,
} from 'react-native';
import images from '../../../../constants/images';

const AddJob = () => {
    const [jobTitle, setJobTitle] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [category, setCategory] = useState('');
    const [indoorOutdoor, setIndoorOutdoor] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');

    const handlePostJob = () => {
        
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
          value={jobTitle}
          onChangeText={setJobTitle}
        />

        {/* Job Description */}
        <TextInput
          className="w-full p-3 mb-4 border border-gray-300 rounded-md h-32"
          placeholder="Job Description"
          value={jobDescription}
          onChangeText={setJobDescription}
          multiline
        />

        {/* Job Category */}
        <TextInput
          className="w-full p-3 mb-4 border border-gray-300 rounded-md"
          placeholder="Job Category"
          value={category}
          onChangeText={setCategory}
        />

        {/* Indoor/Outdoor Work */}
        <Text className="text-base text-black mb-2">Indoor/Outdoor Work</Text>
        <View className="flex-row gap-6 mb-5">
          <TouchableOpacity onPress={() => setIndoorOutdoor('Indoor')}>
            <Text className={`text-base ${indoorOutdoor === 'Indoor' ? 'text-black' : 'text-gray-500'}`}>
              {indoorOutdoor === 'Indoor' ? '●' : '○'} Indoor
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIndoorOutdoor('Outdoor')}>
            <Text className={`text-base ${indoorOutdoor === 'Outdoor' ? 'text-black' : 'text-gray-500'}`}>
              {indoorOutdoor === 'Outdoor' ? '●' : '○'} Outdoor
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

        {/* Upload Photos */}
        <Text className="text-base mb-2 ">
              Upload Photos
            </Text>
        <TouchableOpacity className="w-40
         bg-gray-200 p-2 rounded-md items-center mb-5">
          <Text className="text-blue-600 text-lg">Choose File</Text>
        </TouchableOpacity>

        {/* Post Job Button */}
        <TouchableOpacity className="w-full bg-yellow p-4 rounded-lg items-center" onPress={handlePostJob}>
          <Text className="text-white text-lg font-bold">Post Job</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    )
}

export default AddJob