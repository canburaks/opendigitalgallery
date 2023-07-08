import React, { FC } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Icon } from 'leaflet';

interface MapProps {
  lat: number | undefined;
  lon: number | undefined;
}

const Map: FC<MapProps> = ({ lat, lon }) => {
  return (
    <MapContainer
      center={[lat || 0, lon || 0]}
      zoom={20}
      scrollWheelZoom={false}
      className="h-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={[lat || 0, lon || 0]}
        icon={
          new Icon({
            iconUrl: '/images/glossary.webp',
            iconSize: [30, 30],
            iconAnchor: [30, 30],
          })
        }
      >
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
