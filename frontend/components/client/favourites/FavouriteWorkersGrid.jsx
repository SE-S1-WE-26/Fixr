import React from 'react';
import { View, FlatList, StyleSheet, Dimensions } from 'react-native';
import { FavouriteWorkers } from '../../../constants/constants';
import TopWorkerCard from '../home/TopWorkerCard';

const FavouriteWorkersGrid = () => {
  const numColumns = 2; // Define the number of columns
  const screenWidth = Dimensions.get('window').width; // Get screen width
  const itemWidth = (screenWidth - 40) / numColumns; // Calculate item width, with 40px total padding

  return (
    <FlatList
      data={FavouriteWorkers}
      renderItem={({ item }) => (
        <View style={[styles.item, { width: itemWidth }]}>
          <TopWorkerCard data={item} />
        </View>
      )}
      keyExtractor={(item) => item.title}
      numColumns={numColumns}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.gridContainer}
    />
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    paddingBottom: 16,
  },
  item: {
    margin: 10, // Adds margin between items for better spacing
    alignItems: 'center', // Centers items within each card
  },
});

export default FavouriteWorkersGrid;
