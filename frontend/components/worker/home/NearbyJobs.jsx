import { View, Text } from "react-native";
import React from "react";
import { Camera, MapView } from "@rnmapbox/maps";
import { Link } from 'expo-router';


const NearbyJobs = () => {
  return (
    <View className='mx-5'>
      <View className='flex border min-h-[140px] mt-2 rounded-xl items-center justify-center'>
      <Link href='/mapView'>

<View>

    <MapView style={{width:380 , height : 400}} compassFadeWhenNorth styleURL="mapbox://styles/mapbox/dark-v11" >
    
      <Camera zoomLevel={12} centerCoordinate={[79.973763,6.914744]} />
    </MapView>
</View>
</Link>
      </View>
    </View>
  );
};

export default NearbyJobs;
