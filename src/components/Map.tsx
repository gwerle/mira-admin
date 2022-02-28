import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { LatLngExpression } from 'leaflet';
import { DefaultMarkerIcon } from '../config/icons';

const position = [-15.81, -47.9];
const mapStyle = { height: '50vh' };

type Props = {
  markerPosition: number[];
};

export default function Map({ markerPosition }: Props): JSX.Element {
  const [map, setMap] = useState<any>(null);

  useEffect(() => {
    if (!map) return;
    if (!markerPosition?.length) return;

    map.setView(markerPosition, 13);
  }, [markerPosition]);

  return (
    <MapContainer
      style={mapStyle}
      center={position as LatLngExpression}
      zoom={4}
      whenCreated={setMap}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {markerPosition?.length && (
        <Marker
          position={markerPosition as LatLngExpression}
          icon={DefaultMarkerIcon}
        />
      )}
    </MapContainer>
  );
}
