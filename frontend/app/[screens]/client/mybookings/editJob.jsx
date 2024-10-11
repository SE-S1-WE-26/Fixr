import React, { useState, useEffect } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useGlobalSearchParams } from 'expo-router'

const editJob = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [enviroment, setEnviroment] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [budget, setBudget] = useState('');

    const params = useGlobalSearchParams();
    const { jobId } = params; 
    const router = useRouter(); 

    const [job, setJob] = useState(null);

    // Fetch job details on component mount
    useEffect(() => {
        const fetchJob = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const response = await fetch(`http://192.168.8.103:8010/job/${jobId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    setJob(data);
                    setTitle(data.title);
                    setDescription(data.description);
                    setCategory(data.category);
                    setEnviroment(data.environment);
                    setAddress(data.address);
                    setCity(data.city);
                    setBudget(data.budget.toString());
                } else {
                    Alert.alert('Error', 'Failed to load job details.');
                }
            } catch (error) {
                console.error('Error fetching job:', error);
                Alert.alert('Error', 'Something went wrong. Please try again.');
            }
        };

        if (jobId) {
            fetchJob();
        }
    }, [jobId]);

    const handlePostJob = async () => {
        if (!title || !description || !category || !enviroment || !address || !city) {
            Alert.alert('Error', 'Please fill all the fields before submitting.');
            return;
        }

        const jobData = {
            title,
            description,
            category,
            environment: enviroment,
            address,
            city,
            status: "pending",
            scheduled: false,
            budget,
        };

        try {
            const token = await AsyncStorage.getItem('token');
            const response = await fetch(`http://192.168.8.103:8010/job/update/${jobId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(jobData),
            });

            if (response.ok) {
                Alert.alert('Success', 'Job updated successfully.');
                router.push('./myJobPosts');
            } else {
                const errorData = await response.json();
                Alert.alert('Error', errorData.message || 'Failed to update the job.');
            }
        } catch (error) {
            console.error('Error updating the job:', error.message || error);
            Alert.alert('Error', 'Something went wrong. Please try again.');
        }
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-white">
            <View className="">
                <ImageBackground
                    source={images.addJob} 
                    className="w-full h-72 bg-white"
                >
                    <View className="items-center justify-center h-full">
                        <Text className="text-3xl font-bold mb-56">Update Job</Text>
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

                <TextInput
                    className="w-full p-3 mb-4 border border-gray-300 rounded-md h-32"
                    placeholder="Job Description"
                    value={description}
                    onChangeText={setDescription}
                    multiline
                />

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
                    keyboardType="numeric"
                />

                <TouchableOpacity onPress={handlePostJob}>
                    <View className="w-full bg-black-800 p-3 mb-10 rounded-lg items-center">
                        <Text className="text-white text-lg font-bold">Update Job</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default editJob;
