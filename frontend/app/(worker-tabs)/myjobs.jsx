import {React,useState,useEffect} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View,Text } from "react-native";
import Header from "../../components/common/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WorkerJobCard from "../../components/worker/myJobs/WorkerJobCard";

const MyJobs = () => {
  const [workerData, setWorkerData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [myId, setMyId] = useState(null);
  const [myJobs, setMyJobs] = useState([]);

  const fetchMyData = async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch('http://192.168.1.3:8010/worker/mydata', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch worker data');
      }

      const data = await response.json();
      setWorkerData(data);
      setMyId(data._id);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMyJobs = async (workerId) => {
    try {
      const response = await fetch(`http://192.168.1.3:8010/job/worker/${workerId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }
      const data = await response.json();
      setMyJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error.message);
    }
  };

  useEffect(() => {
    fetchMyData();
  }, []);

  useEffect(() => {
    // console.log("My Data:", myId);
    if (myId) {
      fetchMyJobs(myId);
      // console.log(myJobs);
    }
  }, [myId]);

  return (
    <SafeAreaView className="h-full bg-white">
      <Header title={"My Jobs"} />
      <ScrollView>
        <View className="w-full h-full">
          {/* Display jobs here */}
          {myJobs.map(job => (
            <WorkerJobCard key={job._id} job={job} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyJobs;
