import { View, Text, Image } from 'react-native'
import React from 'react'
import images from '../../constants/images'

const JobTypeIconBar = ({type, containerStyle, imageStyle}) => {
  return (
    <View
    className={`bg-white rounded-full border border-gray-300 ${containerStyle} w-20 h-20 items-center justify-center mx-auto`}
    style={{ overflow: 'hidden' }}
  >
    <Image
      source={images[type]}
      style={{ resizeMode: 'contain' }}
      className={`w-9/12 max-h-fit ${imageStyle}`}
    />
  </View>
  )
}

export default JobTypeIconBar