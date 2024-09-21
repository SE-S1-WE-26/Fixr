import { ScrollView } from "react-native";
import { React} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeHeader from "../../components/worker/home/HomeHeader";
import EOMCard from "../../components/worker/home/EOMCard";
import NearbyJobs from "../../components/worker/home/NearbyJobs";
import RecommendedJobs from "../../components/worker/home/RecommendedJobs";
import Heading from '../../components/common/Heading';

const Home = () => {
  return (
    <SafeAreaView className="h-full bg-white pt-4">
      <ScrollView>
        <HomeHeader />
        <EOMCard />
        <Heading name='Nearby Jobs' link='/' />
        <NearbyJobs />
        <Heading name="Recommended Jobs" link="/" />
        <RecommendedJobs />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
