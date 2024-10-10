import { View, Text, FlatList } from 'react-native'
import React,{useState,useEffect} from 'react'
import TopWorkerCard from './TopWorkerCard'
import { TopWorkers } from '../../../constants/constants'
import axios from 'axios'

const TopWorkerList = ({ favorites }) => {
  const[workers,setWorkers] = useState([]);
  const favoriteIds = favorites.map(favorite => favorite._id);

  const fetchWorkers = async () => {
    try {
      const response = await axios.get('http://192.168.1.3:8010/worker/');
      setWorkers(response.data);
    }
    catch (err) {
      console.error('Error fetching workers:', err);
    }
  }

  useEffect(() => {
    fetchWorkers();
  }
  ,[]);

  return (
    <View className='mx-6'>
      {workers.length > 0 ? (
        <FlatList
          data={workers}
          keyExtractor={(worker) => worker._id}
          renderItem={({ item }) => <TopWorkerCard worker={item} isFavorite={favoriteIds.includes(item._id)}/>}
          contentContainerStyle={{columnGap:12}}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      ) : (
        <Text>No workers found</Text>
      )}
    </View>
  )
}

export default TopWorkerList