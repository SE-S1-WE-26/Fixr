import { React, useState, useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import Header from "../../components/common/Header";
import Summary from "../../components/worker/earnings/Summary";
import EarningsCard from "../../components/worker/earnings/EarningsCard";
import axios from "axios";

const Earnings = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJobs = async () => {
    try {
      const response = await axios.get('http://192.168.1.3:8010/job/'); 
      setJobs(response.data);
    } catch (err) {
      setError('Error fetching jobs');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) {
    // Show a loading spinner while data is being fetched
    return (
      <SafeAreaView className="h-full bg-white flex justify-center items-center">
        <ActivityIndicator size="large" color="orange" />
      </SafeAreaView>
    );
  }

  if (error) {
    // Show an error message if something went wrong
    return (
      <SafeAreaView className="h-full bg-white flex justify-center items-center">
        <Text className="text-red-500">{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="h-full bg-white">
      <Header title={"My Earnings"} />
      <Summary data={jobs}/>
      <ScrollView className="mt-4">
        {jobs.map((item) => (
          <EarningsCard
            key={item.id} // Add a unique key for each item
            data={item}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Earnings;
