import { LineLayer, ShapeSource } from "@rnmapbox/maps";

type Position = [number, number]; // Define Position type

export default function LineRoute({ coordinates }: { coordinates: Position[] }) {
  return (
    <ShapeSource
      id='routeSource'
      lineMetrics
      shape={{
        properties: {},
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates,
        },
      }}
    >
      <LineLayer
        id='exampleLine'
        style={{
          lineColor: 'yellow',
          lineCap: 'round',
          lineJoin: 'round',
          lineWidth: 7,
        }}
      />
    </ShapeSource>
  );
}
