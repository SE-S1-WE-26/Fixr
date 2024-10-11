import { View, Text, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { React, useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import JobTypeIconBar from '../../../../components/client/JobTypeIconBar';
import InterestedHandyman from '../../../../components/client/InterestedHandyman';
import { router, useGlobalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';

const InterestedHandymen = () => {
    const params = useGlobalSearchParams();
    const { jobId } = params; // Destructure jobId directly from params
    const router = useRouter(); // Use router outside useEffect

    const [job, setJob] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const [refreshing, setRefreshing] = useState(false); // Refreshing state

    const fetchJob = async () => {
        if (jobId) {
            try {
                setIsLoading(true);
                const response = await axios.get(`http://192.168.8.103:8010/job/${jobId}`);
                setJob(response.data);
                console.log("Job data fetched:", response.data);
                const clientFavorites = response.data.clientId?.favorites || [];
                setFavorites(clientFavorites);
                console.log("Client favorites:", clientFavorites);
            } catch (error) {
                console.error('Error fetching job:', error.response?.data || error.message);
            } finally {
                setIsLoading(false); // Stop loading after fetching
                setRefreshing(false); // Stop refreshing
            }
        }
    };

    useEffect(() => {
        console.log("Params in interested handymen: ", params); // Log to check params structure
        console.log("Job Id in interested handymen: ", jobId);   // Log jobId
        fetchJob(); // Fetch job data when component mounts or jobId changes
    }, [jobId]); // Only run when jobId changes

    const onRefresh = () => {
        setRefreshing(true);
        fetchJob(); // Fetch job data again when refreshing
    };

    // Loading indicator
    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="orange" />
                <Text>Loading handyman details...</Text>
            </View>
        );
    }

    // If jobId is not available
    if (!jobId) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>Job ID is missing.</Text>
            </View>
        );
    }

    // If job data is not available
    if (!job) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>Loading job data...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView className="bg-white h-full">
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['orange']} />
                }
            >
                {/* Header */}
                <View className="w-full px-4 md:px-6">
                    <Text className="text-3xl md:text-4xl font-bold">Interested Handymen</Text>
                </View>
                <JobTypeIconBar type={job.category.toLowerCase()} />
                <Text className="text-center mt-2 text-lg font-medium">{job.title}</Text>

                {/* Interested Handymen */}
                <View className="flex-col mt-2">
                    {job.interestedHandymen && job.interestedHandymen.length > 0 ? (
                        job.interestedHandymen.map((handyman, index) => {
                            // Check if this handyman's ID is in the client's favorites
                            const isFavourite = favorites.includes(handyman._id);
                            console.log("isFav: ", isFavourite);

                            return (
                                <InterestedHandyman
                                    key={index}
                                    clientId={job.clientId?._id || ''}
                                    handymanId={handyman._id}
                                    handyman={handyman.userId?.name || "Job Details: "}
                                    isFavourite={isFavourite} // Set based on favorites check
                                    jobTitle={handyman.category || "Handyman"}
                                    rate={handyman.hourlyRate || "0.00"}
                                    rating={handyman.userId?.rating || 0}
                                    handymanImage={{ uri: handyman.userId.profilePic }}
                                    viewProfileHandlePress={() => router.push({
                                        pathname: '/profile',
                                        params: { handymanId: handyman._id }
                                    })}
                                    scheduleAppointmentHandlePress={() => router.push({
                                        pathname: './scheduleAppointment',
                                        params: { handymanId: handyman._id, jobId: job._id }
                                    })}
                                />
                            );
                        })
                    ) : (
                        <Text className="text-center mt-4">No interested handymen yet.</Text>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default InterestedHandymen;
