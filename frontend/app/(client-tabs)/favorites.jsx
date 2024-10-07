import React from "react";
import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/common/Header";
import PopularCategoriesList from "../../components/client/home/PopularCategoriesList";
import SearchBar from "../../components/client/favourites/SearchBarComponent";
import FavouriteWorkersGrid from "../../components/client/favourites/FavouriteWorkersGrid";

const Favorites = () => {
  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView>
        <View>
          <Header title={"Favorites"} />
        </View>
        <PopularCategoriesList/>
        <SearchBar/>
        <FavouriteWorkersGrid/>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Favorites;
