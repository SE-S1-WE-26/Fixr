import { ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeHeader from "../../components/worker/home/HomeHeader";
import EOMCard from "../../components/worker/home/EOMCard";
import TopWorkerList from "../../components/client/home/TopWorkerList";
import PopualrCategoriesList from "../../components/client/home/PopularCategoriesList";
import Heading from '../../components/common/Heading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

const Home = () => {
  const [eom, setEom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [myData, setMyData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const fetchMyData = async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      // console.log("Token:", token);
      const response = await fetch('http://192.168.1.3:8010/client/mydata', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch my data');
      }

      const data = await response.json();
      setMyData(data);
      // console.log("My Data:", data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMyData();
  }, []);

  const fetchCurentEom = async () => {
    try {
      const response = await axios.get('http://192.168.1.3:8010/eom/current');
      setEom(response.data[0]);
    } catch (err) {
      console.error('Error fetching EOM:', err);
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
        <Heading name='Top Workers' link='/' />
        <TopWorkerList favorites={myData ? myData.favorites : []} />
        <Heading name="Popular Categories" link="/" />
        <PopualrCategoriesList />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
