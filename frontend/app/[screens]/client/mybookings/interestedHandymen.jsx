import { View, Text, ScrollView, Image } from 'react-native'
import { React, useState, useEffect } from 'react'
import Header from '../../../../components/common/Header'
import { SafeAreaView } from 'react-native-safe-area-context'
import JobTypeIconBar from '../../../../components/client/JobTypeIconBar'
import InterestedHandyman from '../../../../components/client/InterestedHandyman'
import { router, useRouter, useGlobalSearchParams  } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'

const InterestedHandymen = () => {
    const params = useGlobalSearchParams();
    const { jobId } = params; // Destructure jobId directly from params
    const router = useRouter(); // Use router outside useEffect

    const [job, setJob] = useState(null);

    useEffect(() => {
        console.log("Params in interested handymen: ", params); // Log to check params structure
        console.log("Job Id in interested handymen: ", jobId);   // Log jobId
    
        if (jobId) {  // Ensure jobId exists before making the request
          const fetchJob = async () => {
            try {
              const response = await axios.get(`http://192.168.1.3:8010/job/${jobId}`);
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
                {/* Header */}
                <View className="w-full px-4 md:px-6">
                    <Text className="text-3xl md:text-4xl font-bold">Interested Handymen</Text>
                </View>
                <JobTypeIconBar
                type={"repair"}
                />
                <Text className="text-center mt-2 text-lg font-medium">Roof Shingle Replacement</Text>
                
                {/* Interested Handymen */}
                <View className="flex-col mt-2">
                    {job.interestedHandymen && job.interestedHandymen.length > 0 ? (
                        job.interestedHandymen.map((handyman, index) => (
                            <InterestedHandyman
                                key={index}
                                handyman={handyman.userId?.name || "Job Details: "}
                                isFavourite={handyman.isFavourite || false}
                                jobTitle={handyman.category || "Handyman"}
                                rate={handyman.hourlyRate || "0.00"}
                                rating={handyman.userId?.rating || 0}
                                viewProfileHandlePress={() => router.push(`/profile/${handyman._id}`)}
                                scheduleAppointmentHandlePress={() => router.push(`/scheduleAppointment/${handyman._id}`)}
                            />
                        ))
                    ) : (
                        <Text className="text-center mt-4">No interested handymen yet.</Text>
                    )}
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default InterestedHandymen