import React, { useState } from 'react';
import { SearchBar } from 'react-native-elements';
import { View, StyleSheet } from "react-native";

const SearchBarComponent = () => {
  const [search, setSearch] = useState('');

  const updateSearch = (searchValue) => {
    setSearch(searchValue);
  };

  return (
    <SearchBar
      placeholder="Type Here..."
      onChangeText={updateSearch}
      value={search}
    />
  );
};

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "transparent",
//     padding: 10,
//     borderRadius: 20,
//     justifyContent: "center",
//     alignItems: "flex-end", // Align everything to the right side
//   },
//   searchBarContainer: {
//     backgroundColor: "transparent",
//     borderTopWidth: 0,
//     borderBottomWidth: 0,
//     width: 250,
//     alignSelf: "flex-end", // Align to the right-hand side
//     marginRight: 15, // Add space from the right side of the screen
//   },
//   inputContainer: {
//     backgroundColor: "white",
//     borderRadius: 10,
//     borderWidth: 1, // Add a thin border
//     borderColor: "gray", // Set border color to gray
//   },
// });


export default SearchBarComponent;
