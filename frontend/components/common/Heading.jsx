import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const Heading = ({name,link}) => {
  return (
    <View className="flex-row justify-between items-center mx-6 mt-5">
        <Text className="text-2xl font-medium">{name}</Text>
        <TouchableOpacity>
          <Text className="text-lg text-gray-500 font-medium">View All</Text>
        </TouchableOpacity>
      </View>
  )
}

export default Heading