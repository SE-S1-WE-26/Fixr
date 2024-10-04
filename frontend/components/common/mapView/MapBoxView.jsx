import React, { useEffect, useState } from 'react';
import Mapbox, { Camera, LocationPuck, MapView } from "@rnmapbox/maps";
import { StyleSheet, ActivityIndicator, View } from 'react-native';
import { useWorker } from './WorkerProvider';
import LineRoute from './LineRoute';
import WorkerMarker from './WorkerMarker';
import * as Location from 'expo-location';

Mapbox.setAccessToken("pk.eyJ1IjoiamFrYWRwIiwiYSI6ImNtMWxvZWozNjBhZHQya3M4NTBpZm93c3YifQ.jbGHVjEN5SxeSbWbn8VMiw");

const Map = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [locationError, setLocationError] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    (async () => {      
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setLocationError("Permission to access location was denied");
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
    })();
  }, []);

  const { directionCoordinate, duration, distance } = useWorker();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (locationError) {
    return (
      <View style={styles.errorContainer}>
        <Text>{locationError}</Text>
      </View>
    );
  }

  return (
    <MapView style={styles.map} styleURL="mapbox://styles/mapbox/dark-v11" geoLocationControll>
      <Camera centerCoordinate={[79.973763, 6.914744]} followUserLocation followZoomLevel={10} />
      <LocationPuck puckBearingEnabled puckBearing="heading" pulsing={{ isEnabled: true }} />

      {/* Render the worker marker */}
      <WorkerMarker />

      {/* Render the line route if direction coordinates are available */}
      {directionCoordinate && <LineRoute coordinates={directionCoordinate} />}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default Map;
