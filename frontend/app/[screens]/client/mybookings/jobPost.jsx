import { View, Text, ScrollView, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import JobTypeIconBar from '../../../../components/client/JobTypeIconBar'
import CustomButton from '../../../../components/common/CustomButton'
import icons from '../../../../constants/icons'
import { router, useRouter, useGlobalSearchParams } from 'expo-router'
import { React, useState, useEffect } from 'react'
import axios from 'axios';
import { useRoute } from "@react-navigation/native";

const JobPost = () => {
  const params = useGlobalSearchParams();
  const { jobId } = params; // Destructure jobId directly from params
  const router = useRouter(); // Use router outside useEffect

  const [job, setJob] = useState(null);

  useEffect(() => {
    console.log("Params: ", params); // Log to check params structure
    console.log("Job Id: ", jobId);   // Log jobId
    
    if (jobId) {  // Ensure jobId exists before making the request
      const fetchJob = async () => {
        try {
          const response = await axios.get(`http://192.168.8.103:8010/job/${jobId}`);
          setJob(response.data);
          console.log("Job data fetched:", response.data);
          console.log()
        } catch (error) {
          console.error('Error fetching job:', error.response?.data || error.message);
        }
      };

      fetchJob();
    }
  }, [jobId]);  // Only run when jobId changes

  if (!jobId) {
    return <Text>Loading job details...</Text>;  // Show loading while waiting for jobId
  }

  if (!job) {
    return <Text>Loading job...</Text>;  // Show loading while waiting for jobId
  }

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <JobTypeIconBar 
        type={job.category.toLowerCase()} 
        />
        <View className="relative w-full h-[120px] -mb-11 -mt-2">
          <CustomButton
            title={
              <View className="flex-row items-center">
                <Image source={icons.edit} tintColor={"black"} className="w-6 h-6" resizeMode='contain' />
                <Text className="font-semibold">  Edit Post</Text>
              </View>
            }
            handlePress={() => router.push("./addJob")}
            containerStyles={"absolute right-4 top-4 px-4 h-12 rounded-full"}
          />
        </View>

        {/* Job Info */}
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
            handlePress={() => router.push('./interestedHandymen')}
            containerStyles={"mx-5 mb-4 text-sm"}
            textStyles={"text-base"}
          />
          <CustomButton
            title={"Delete Post"}
            handlePress={() => router.push('./interestedHandymen')}
            containerStyles={"mx-5 bg-red-800 mb-4"}
            textStyles={"text-base"}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default JobPost;
