import { View, FlatList } from "react-native";
import React from "react";
import { Categories } from "../../../constants/constants";
import CategoryCard from "./CategoryCard";

const PopularCategoriesList = () => {
  return (
    <FlatList
      className="py-2 pl-6"
      data={Categories}
      renderItem={({ item }) => (
        <CategoryCard data={item}/>
      )}
      keyExtractor={(item) => item.title}
      horizontal // This makes the list scroll horizontally
      showsHorizontalScrollIndicator={false} // Hides the scrollbar for a cleaner UI
      contentContainerStyle={{columnGap:10,paddingRight: 40}} // Optional: Adds padding to the left and right
    />
  );
};

export default PopularCategoriesList;
