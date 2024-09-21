import { ScrollView } from "react-native";
import { React} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeHeader from "../../components/worker/home/HomeHeader";
import EOMCard from "../../components/worker/home/EOMCard";
import TopWorkerList from "../../components/client/home/TopWorkerList";
import PopualrCategoriesList from "../../components/client/home/PopularCategoriesList";
import Heading from '../../components/common/Heading';

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
    </SafeAreaView>
  );
};

export default Home;
