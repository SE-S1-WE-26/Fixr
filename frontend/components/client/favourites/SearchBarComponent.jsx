import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SearchBar, Icon } from 'react-native-elements';

const SearchBarComponent = () => {
  const [search, setSearch] = useState('');

  const updateSearch = (searchValue) => {
    setSearch(searchValue);
  };

  const clearSearch = () => {
    setSearch('');
  };

  return (
    <View style={styles.container}>
      <SearchBar
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.inputContainer}
        placeholder="Type Here..."
        onChangeText={updateSearch}
        value={search}
        lightTheme // Enable light theme for the search bar
        round // Make the search bar rounded
        searchIcon={<Icon name="search" size={24} color="gray" />} // Left icon for search
        rightIcon={
          search ? (
            <Icon
              name="clear"
              size={24}
              color="gray"
              onPress={clearSearch} // Clear icon on the right
            />
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems:'center', // Align items to center
  },
  searchBarContainer: {
    backgroundColor: 'transparent', // Transparent background
    borderTopWidth: 0,
    borderBottomWidth: 0,
    width: 360, // Adjust width as needed
  },
  inputContainer: {
    backgroundColor: 'white',
    borderRadius: 20, // Make the input rounded
    borderWidth: 1,
    borderColor: 'gray',
  },
});

export default SearchBarComponent;
