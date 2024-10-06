import { CircleLayer, Images, ShapeSource, SymbolLayer } from "@rnmapbox/maps";
import pin from '../../../assets/images/locationPin.png';
import { useWorker } from "./WorkerProvider";
import { featureCollection, point } from '@turf/helpers';

import workers from './data.json';
import { getDirection } from './direction';

export default function WorkerMarker() {

    const { setSelectedWorker } = useWorker();

    const points = workers.map((worker) => point([worker.longitude, worker.latitude], { worker }));
    const workerCollection = featureCollection(points);

    const onPointsPress = async (event) => {
      console.log('onPointsPress');
      if (event.features[0].properties?.worker) {
        setSelectedWorker(event.features[0].properties.worker);
      }
    }

    return (
      <ShapeSource id="worker" cluster shape={workerCollection} onPress={onPointsPress}>

        <SymbolLayer
          id='cluster_count'
          style={{
            textField: ['get', 'point_count'],
            textColor: "white",
            textSize: 20,
            textPitchAlignment: 'map',
          }}
        />

        <CircleLayer
          id="cluster"
          filter={['has', 'point_count']}
          style={{
            circlePitchAlignment: 'map',
            circleColor: "#FFB627",
            circleRadius: 20,
            circleOpacity: .3,
            circleStrokeWidth: 2,
            circleStrokeColor: '#FFB627'
          }}
        />

        <Images  images={{ foo: pin }} />
        <SymbolLayer
          id="worker-icon"
          filter={['!', ['has', 'point_count']]}
          style={{
            iconImage: 'foo',
            iconSize: 0.15,
            iconAllowOverlap: true,
            iconAnchor: 'bottom'
          }}
        />

      </ShapeSource>
    );
}
