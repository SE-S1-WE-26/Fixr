import { CircleLayer, Images, ShapeSource, SymbolLayer } from "@rnmapbox/maps";
import pin from "../../../assets/images/locationPin.png";
import { useWorker } from "./WorkerProvider";
import { featureCollection, point } from "@turf/helpers";

import workers from "./data.json";
import { fetchWorkerData } from "../../../utils/FetchMyData";
import { getDirection } from "./direction";
import { useEffect, useState } from "react";

export default function WorkerMarker() {
  const [workersNew, SetNewWorkers] = useState([]);
  


  const getAllWorkers = async () => {
    try {
      // Fetch all workers with their working and personal data
      const response = await fetch("https://fixerbackend.vercel.app/worker/", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch workers data");
      }
  
      const data = await response.json();
      SetNewWorkers(data); // Save the combined data in your state
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
  
  




  // const getWorkers = async () => {
  //   try {
  //     // Retrieve token from AsyncStorage
  //     const response = await fetch("http://192.168.174.210:8010/worker/", {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to fetch worker data");
  //     }

  //     const data = await response.json();
  //     SetNewWorkers(data);
  //   } catch (error) {
  //     console.error(error);
  //     throw error; // Re-throw the error for handling in the component
  //   }
  // };

  useEffect(() => {
    if (workersNew.length == 0) {
      getAllWorkers();
    }
  }, []);

  const { setSelectedWorker } = useWorker();

  const points = workersNew
  .filter(worker => worker.latitude !== null && worker.longitude !== null) // Filter out workers with null coordinates
  .map((worker) => point([worker.longitude,worker.latitude], { worker }));

const workerCollection = featureCollection(points);

const onPointsPress = async (event) => {
  console.log('onPointsPress');
  if (event.features[0].properties?.worker) {
    setSelectedWorker(event.features[0].properties.worker);
  }
};


  console.log("Worker data response:", workersNew);
  return (
    <ShapeSource
      id="worker"
      cluster
      shape={workerCollection}
      onPress={onPointsPress}
    >
      <SymbolLayer
        id="cluster_count"
        style={{
          textField: ["get", "point_count"],
          textColor: "white",
          textSize: 20,
          textPitchAlignment: "map",
        }}
      />

      <CircleLayer
        id="cluster"
        filter={["has", "point_count"]}
        style={{
          circlePitchAlignment: "map",
          circleColor: "#FFB627",
          circleRadius: 20,
          circleOpacity: 0.3,
          circleStrokeWidth: 2,
          circleStrokeColor: "#FFB627",
        }}
      />

      <Images images={{ foo: pin }} />
      <SymbolLayer
        id="worker-icon"
        filter={["!", ["has", "point_count"]]}
        style={{
          iconImage: "foo",
          iconSize: 0.15,
          iconAllowOverlap: true,
          iconAnchor: "bottom",
        }}
      />
    </ShapeSource>
  );
}
