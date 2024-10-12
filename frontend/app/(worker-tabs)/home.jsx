import { ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeHeader from "../../components/worker/home/HomeHeader";
import EOMCard from "../../components/worker/home/EOMCard";
import NearbyJobs from "../../components/worker/home/NearbyJobs";
import RecommendedJobs from "../../components/worker/home/RecommendedJobs";
import Heading from "../../components/common/Heading";
import axios from "axios";

const Home = () => {
  const [eom, setEom] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCurentEom = async () => {
    try {
      const response = await axios.get('http://192.168.1.3:8010/eom/current');
      setEom(response.data[0]);
    } catch (err) {
      console.error("Error fetching EOM:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurentEom();
  }, []);
  return (
    <SafeAreaView className="h-full bg-white pt-4">
      <ScrollView>
        <HomeHeader />
        <EOMCard eom={eom} />
        <Heading name="Nearby Jobs" link="/" />
        {/* <NearbyJobs /> */}
        <Heading name="Recommended Jobs" link="/" />
        <RecommendedJobs />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
