import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/theme';

const FavouriteWorkersGrid = () => {
  return (
    <View className="grid grid-cols-2 gap-4 p-4">
        <TouchableOpacity className="bg-white rounded-lg shadow-md">
            <View className="p-4">
            <Text className="font-bold text-lg">John Doe</Text>
            <Text className="text-gray-500">Plumber</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity className="bg-white rounded-lg shadow-md">
            <View className="p-4">
            <Text className="font-bold text-lg">Jane Doe</Text>
            <Text className="text-gray-500">Electrician</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity className="bg-white rounded-lg shadow-md">
            <View className="p-4">
            <Text className="font-bold text-lg">John Doe</Text>
            <Text className="text-gray-500">Plumber</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity className="bg-white rounded-lg shadow-md">
            <View className="p-4">
            <Text className="font-bold text-lg">Jane Doe</Text>
            <Text className="text-gray-500">Electrician</Text>
            </View>
        </TouchableOpacity>
    </View>
  )
}

export default FavouriteWorkersGrid;