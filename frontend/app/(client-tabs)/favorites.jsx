import { View, ScrollView, ActivityIndicator, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/common/Header";
import PopularCategoriesList from "../../components/client/home/PopularCategoriesList";
import SearchBar from "../../components/client/favourites/SearchBarComponent";
import FavouriteWorkersGrid from "../../components/client/favourites/FavouriteWorkersGrid";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native';
import Heading from "../../components/common/Heading";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State to hold any error messages
  const [myData, setMyData] = useState(null);

  const fetchMyData = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      console.log("Token:", token);
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
      setFavorites(data.favorites || []); // Set favorites if available
    } catch (error) {
      console.error('Error:', error);
      setError(error.message); // Capture the error message
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchMyData(); // Fetch data whenever the screen is focused
    }, [])
  );

  if (loading) {
    return (
      <SafeAreaView className="h-full bg-white">
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView>
        <View>
          <Header title={"Favorites"} />
        </View>
        <PopularCategoriesList />
        {/* <SearchBar /> */}
        <Heading name="Favourite Workers" />
        <FavouriteWorkersGrid workers={favorites} /> 
      </ScrollView>
    </SafeAreaView>
  );
};

export default Favorites;
