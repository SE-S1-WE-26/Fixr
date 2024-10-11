import { View, Text, ScrollView, Image, ActivityIndicator, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import JobTypeIconBar from '../../../../components/client/JobTypeIconBar'
import CustomButton from '../../../../components/common/CustomButton'
import icons from '../../../../constants/icons'
import { useRouter, useGlobalSearchParams } from 'expo-router'
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import ConfirmationBox from '../../../../components/client/ConfirmationBox';
import AsyncStorage from '@react-native-async-storage/async-storage';

const JobPost = () => {
  const params = useGlobalSearchParams();
  const { jobId } = params;
  const router = useRouter();

  const [job, setJob] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Initially set to true to show loading indicator

  useEffect(() => {
    console.log("Params: ", params);
    console.log("Job Id: ", jobId);

    if (jobId) {
      const fetchJob = async () => {
        try {
          const response = await axios.get(`http://192.168.8.101:8010/job/${jobId}`);
          setJob(response.data);
          console.log("Job data fetched:", response.data);
        } catch (error) {
          console.error('Error fetching job:', error.response?.data || error.message);
        } finally {
          setIsLoading(false); // Stop loading once the job data is fetched
        }
      };

      fetchJob();
    } else {
      setIsLoading(false); // Stop loading if no jobId is found
    }
  }, [jobId]);

  // Handle loading state
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="orange" />
        <Text>Loading job details...</Text>
      </View>
    );
  }

  const handleDelete = (jobId) => {
    setSelectedJobId(jobId);
    setIsVisible(true);
  }

  const handleConfirm = async () => {
    setIsVisible(false);
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`http://192.168.8.101:8010/job/delete/${selectedJobId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });

      if (response.ok) {
        Alert.alert('Success', 'Job deleted successfully.');
        setJob(null); // Clear job data after deletion
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
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        {job &&
          <JobTypeIconBar
            type={job.category.toLowerCase()}
          />
        }
        <View className="relative w-full h-[120px] -mb-11 -mt-2">
          <CustomButton
            title={
              <View className="flex-row items-center">
                <Image source={icons.edit} tintColor={"black"} className="w-6 h-6" resizeMode='contain' />
                <Text className="font-semibold">  Edit Post</Text>
              </View>
            }
            handlePress={() => router.push({
              pathname: "./editJob",
              params: { jobId: jobId }
            })}
            containerStyles={"absolute right-4 top-4 px-4 h-12 rounded-xl"}
          />
        </View>

        {/* Job Info */}
        {job &&
          <View className="border border-gray-200 mx-4 rounded-xl py-2 mb-4">
            <Text className="text-center font-bold text-xl my-3">{job.title}</Text>
            <View className="ml-7 mb-4">
              <Text className="font-medium text-lg">Job Description</Text>
              <Text className=" text-sm">{job.description}</Text>
            </View>
            <View className="ml-7 mb-4">
              <Text className="font-medium text-lg">Job Category</Text>
              <Text className="text-base">{job.category}</Text>
            </View>
            <View className="ml-7 mb-4">
              <Text className="font-medium text-lg">Indoor/Outdoor Work</Text>
              <Text className="text-base">{job.environment}</Text>
            </View>
            <View className="ml-7 mb-4">
              <Text className="font-medium text-lg">Address Line</Text>
              <Text className="text-base">{job.address}</Text>
            </View>
            <View className="ml-7 mb-4">
              <Text className="font-medium text-lg">City</Text>
              <Text className="text-base">{job.city}</Text>
            </View>
            <CustomButton
              title={"View Interested Handymen"}
              handlePress={() => router.push({
                pathname: './interestedHandymen',
                params: { jobId: jobId }
              })}
              containerStyles={"mx-5 mb-4 text-sm"}
              textStyles={"text-base"}
            />
            <CustomButton
              title={"Delete Post"}
              handlePress={() => handleDelete(job._id)}
              containerStyles={"mx-5 bg-red-800 mb-4"}
              textStyles={"text-base"}
            />
          </View>
        }
      </ScrollView>
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
    </SafeAreaView>
  );
}

export default JobPost;
