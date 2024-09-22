import { ScrollView, Touchable, TouchableOpacity, StyleSheet } from "react-native";
import { React} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeHeader from "../../components/worker/home/HomeHeader";
import EOMCard from "../../components/worker/home/EOMCard";
import TopWorkerList from "../../components/client/home/TopWorkerList";
import PopualrCategoriesList from "../../components/client/home/PopularCategoriesList";
import Heading from '../../components/common/Heading';
import ScanIcon from "../../components/client/home/ScanIcon";
import { icons } from "../../constants";

const Home = () => {
  return (
    <SafeAreaView className="h-full bg-white pt-4">
      <ScrollView>
        <HomeHeader />
        <EOMCard />
        <Heading name='Top Workers' link='/' />
        <TopWorkerList />
        <Heading name="Popular Categories" link="/" />
        <PopualrCategoriesList />
      </ScrollView>

      <TouchableOpacity style={styles.scanner}>
        <ScanIcon icon={icons.scanner}/>
      </TouchableOpacity>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scanner: {
    position: "absolute",
    bottom: 10, 
    right: 15, 
    zIndex: 10, 
  },
});

export default Home;
