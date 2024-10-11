import { View, Text, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { React, useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import JobTypeIconBar from '../../../../components/client/JobTypeIconBar';
import InterestedHandyman from '../../../../components/client/InterestedHandyman';
import { useGlobalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';

const InterestedHandymen = () => {
    const params = useGlobalSearchParams();
    const { jobId } = params;
    const router = useRouter();

    const [job, setJob] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const [refreshing, setRefreshing] = useState(false); // Refreshing state

    const fetchJob = async () => {
        if (jobId) {
            try {
                setIsLoading(true);
                const response = await axios.get(`https://fixerbackend.vercel.app/job/${jobId}`);
                setJob(response.data);
                const clientFavorites = response.data.clientId?.favorites || [];
                setFavorites(clientFavorites);
            } catch (error) {
                console.error('Error fetching job:', error.response?.data || error.message);
            } finally {
                setIsLoading(false); // Stop loading after fetching
                setRefreshing(false); // Stop refreshing
            }
        }
    };

    useEffect(() => {
        if (jobId) {
            fetchJob();
        }
    }, [jobId]);

    const onRefresh = () => {
        setRefreshing(true); // Start the refresh indicator
        fetchJob(); // Fetch the job details again
    };

    if (isLoading) {
        return (
            <SafeAreaView className="bg-white h-full justify-center items-center">
                <ActivityIndicator size="large" color="orange" />
                <Text>Loading handymen details...</Text>
            </SafeAreaView>
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
                            const isFavourite = favorites.includes(handyman._id);
                            const durationInHours_val = Math.ceil(parseFloat(job.estDuration));
                            const calculatedCost = durationInHours_val * handyman.hourlyRate;
                            return (
                                <InterestedHandyman
                                    key={index}
                                    clientId={job.clientId?._id || ''}
                                    estCost={calculatedCost}
                                    handymanId={handyman._id}
                                    handyman={handyman.userId?.name || "Job Details: "}
                                    isFavourite={isFavourite}
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
