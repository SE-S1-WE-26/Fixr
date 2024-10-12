import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { COLORS } from '../../../constants/theme';

const CategoryCard = ({ data }) => {
  return (
    <TouchableOpacity
      key={data.title}
      className="flex max-w-[100px] items-center border-2 border-platinum justify-center px-5 py-3 shadow bg-powder rounded-lg"
    >
      <View className='bg-white p-4 rounded-full border border-1 border-platinum'>
      <Image source={data.icon} className="w-12 h-12" />
      </View>
      <Text style={styles.title} numberOfLines={1}>
        {data.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    maxWidth: 100,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    //backgroundColor: COLORS.powder, // Assuming powder is defined in COLORS
    // borderRadius: 10,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.3,
    // shadowRadius: 2,
    // elevation: 3, // For shadow on Android
  },
  iconContainer: {
    backgroundColor: COLORS.lightWhite, // Background color
    padding: 16,
    borderRadius: 50, // Fully rounded
    // Shadow for iOS (simulating blur)
    shadowColor: COLORS.gray, // Gray shadow color for the blurred border
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 6, // Higher value to create a blur effect
    // Shadow for Android
    elevation: 5, // Elevation for Android to mimic shadow/blur effect
  },
  
  icon: {
    width: 48,
    height: 48,
  },
  title: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 8,
  },
});

export default CategoryCard;
