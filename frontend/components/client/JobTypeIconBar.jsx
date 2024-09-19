import { View, Text, Image } from 'react-native'
import React from 'react'
import images from '../../constants/images'

const JobTypeIconBar = ({type, containerStyle}) => {
  return (
    <View className={`bg-white rounded-full border border-gray-300 ${containerStyle} w-20 h-20 items-center mx-auto`}>
      <Image
      source={images[type]}
      className="w-12 h-12 my-auto"
      resizeMode='contain'
      />
    </View>
  )
}

export default JobTypeIconBar