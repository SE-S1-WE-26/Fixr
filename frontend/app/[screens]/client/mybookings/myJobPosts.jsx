import { View, Text, ScrollView, Image } from 'react-native';
import Header from '../../../../components/common/Header';
import images from '../../../../constants/images';
import CustomButton from '../../../../components/common/CustomButton';
import icons from '../../../../constants/icons';
import JobPostsBox from '../../../../components/client/JobPostsBox';
import { router } from 'expo-router';
import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const MyJobPosts = () => {
  const [jobs, setJobs] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://192.168.8.103:8010/job/');
        setJobs(response.data); // Assuming jobs is the array in response
      } catch (error) {
        console.error('Error fetching jobs:', error.response?.data || error.message);
      }
    };

    fetchJobs(); // Call the function
  }, []);

  return (
    <ScrollView className="bg-white">
      <Header title={"My Job Posts"} />
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
            handlePress={() => router.push("./addJob")} // Correct usage of router.push
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
              // handlePressJob={() => router.push(`./jobPost`, {jobId: job._id})} 
              handlePressJob={() => router.push({
                pathname: './jobPost',
                params: { jobId: job._id }
              })} 
              handlePressHandymen={() => router.push(`./interestedHandymen?jobId=${job._id}`)} // Correctly passing jobId
            />
          )) 
        ) : (
          <Text className="text-center text-gray-500">No job posts found</Text>
        )}
      </View>
    </ScrollView>
  );
}

export default MyJobPosts;
