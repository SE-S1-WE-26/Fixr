import { ScrollView, Touchable, TouchableOpacity, StyleSheet, View } from "react-native";
import { React} from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeHeader from "../../components/worker/home/HomeHeader";
import EOMCard from "../../components/worker/home/EOMCard";
import TopWorkerList from "../../components/client/home/TopWorkerList";
import PopualrCategoriesList from "../../components/client/home/PopularCategoriesList";
import Heading from '../../components/common/Heading';
import ScanIcon from "../../components/client/home/ScanIcon";
import { icons } from "../../constants";

const Home = () => {
  const router = useRouter();
  // const handleNavigation = () => {
  //   // Navigate to Scanner screen
  //   router.push("/pages/client/home/Scanner");
  // }

  return (
    <SafeAreaView className="h-full bg-white pt-4">
      <ScrollView>
        <HomeHeader />
        <EOMCard />
        <Heading name='Top Workers' link='/' />
        <TopWorkerList />
        <Heading name="Popular Categories" link="/" />
        <PopualrCategoriesList />
        <View style={styles.paddingBottom} />
      </ScrollView>
      {/* <TouchableOpacity style={styles.scanner} onPress={handleNavigation}>
        <ScanIcon icon={icons.scanner}/>
      </TouchableOpacity> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // scanner: {
  //   position: "absolute",
  //   bottom: 10, 
  //   right: 15, 
  //   zIndex: 10, 
  // },
  paddingBottom: {
    paddingBottom: 10, // Add padding below the PopularCategoriesList
  },
});

export default Home;
