import { router } from 'expo-router';
import { React, useState, useEffect } from 'react'
import { View, Text, ScrollView, Image, Alert } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from "../../components/common/Header";
import images from '../../constants/images';
import CustomButton from '../../components/common/CustomButton';
import icons from '../../constants/icons';
import JobPostsBox from '../../components/client/JobPostsBox';
import ConfirmationBox from '../../components/client/ConfirmationBox';

const Search = () => {
  const [jobs, setJobs] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch('http://192.168.1.3:8010/job/client/', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const jobsData = await response.json();
          setJobs(jobsData);
          console.log("Jobs: ", jobsData);
        } else {
          const errorData = await response.json();
          console.log('Response status:', response.status, errorData);
        }
      } catch (error) {
        console.error('Error fetching jobs:', error.message);
      }
    };

    fetchJobs(); // Call the function
  }, []);

  const handleDelete = (jobId) => {
    setSelectedJobId(jobId); // Store the job ID of the job to be deleted
    setIsVisible(true); // Show confirmation dialog
  }

  const handleConfirm = async () => {
    setIsVisible(false);
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`http://192.168.1.3:8010/job/delete/${selectedJobId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`, // Include token in headers
        },
      });

      if (response.ok) {
        Alert.alert('Success', 'Job deleted successfully.');
        setJobs(jobs.filter(job => job._id !== selectedJobId)); // Update the job list after deletion
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.message || 'Failed to delete the job.');
      }
    } catch (error) {
      console.error('Error deleting the job:', error.message || error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  }

  const handleCancel = () => {
    setIsVisible(false);
  }

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView className="bg-white">
      <View className="w-full h-full">
          <Header title={"Search"} />
          <View className="flex-col">
        <Image
          source={images.myJobPosts}
          className="mx-auto"
          resizeMode='contain'
        />
        <View className="relative w-full h-[120px] -mb-11 -mt-2">
          <CustomButton
            title={
              <View className="flex-row items-center">
                <Image
                  source={icons.plus}
                  tintColor={"black"}
                  className="w-6 h-6"
                  resizeMode='contain'
                />
                <Text className="font-medium"> Add Post</Text>
              </View>
            }
            handlePress={() => router.push("../screens/client/mybookings/addJob")}
            containerStyles={"absolute right-4 top-4 px-4 h-12 rounded-full"}
          />
        </View>
        {/* Display fetched job posts */}
        {jobs && jobs.length > 0 ? (
          jobs.map((job, index) => (
            <JobPostsBox
              key={index}
              type={job.category.toLowerCase()}
              topic={job.title}
              description={job.description}
              handlePressJob={() => router.push({
                pathname: '../screens/client/mybookings/jobPost',
                params: { jobId: job._id }
              })}
              handlePressHandymen={() => router.push({
                pathname: '../screens/client/mybookings/interestedHandymen',
                params: { jobId: job._id }
              })}
              handleDelete={() => handleDelete(job._id)} // Pass the job ID to handleDelete
            />
          ))
        ) : (
          <Text className="text-center text-gray-500">No job posts found</Text>
        )}
      </View>
      </View>
      
      <ConfirmationBox
        visible={isVisible}
        title={"Delete job post"}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        onConfirmMesg={"Delete"}
        onCancelMsg={"Cancel"}
        confirmButton={true}
        cancelColor={"white"}
        message={"Are you sure you want to delete this post? This action cannot be undone."}
        image={"bin"}
        confirmColor={"red-800"}
      />
    </ScrollView>
    </SafeAreaView>
  );
};

export default Search;
