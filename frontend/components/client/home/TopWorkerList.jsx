import { View, Text, FlatList } from 'react-native'
import React from 'react'
import TopWorkerCard from './TopWorkerCard'
import { TopWorkers } from '../../../constants/constants'

const TopWorkerList = () => {
  return (
    <FlatList
      className="py-2 pl-6"
      data={TopWorkers}
      renderItem={({ item }) => (
        <TopWorkerCard data={item}/>
      )}
      keyExtractor={(item) => item.title}
      horizontal // This makes the list scroll horizontally
      showsHorizontalScrollIndicator={false} // Hides the scrollbar for a cleaner UI
      contentContainerStyle={{columnGap:10,paddingRight: 40}} // Optional: Adds padding to the left and right
    />
  )
}

export default TopWorkerList