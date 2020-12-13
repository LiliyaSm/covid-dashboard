import React, { useState } from 'react';
import ExpandBtn from '../ExpandBtn/ExpandBtn';
import './InteractiveMap.scss';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import worldGeoJSON from 'geojson-world-map';

const InteractiveMap = () => {
  const [isFullScreenSize, setIsFullScreenSize] = useState(false);

  return (
    <div className={isFullScreenSize ? 'interactive-map full-container' : 'interactive-map'}>
      <ExpandBtn setIsFullScreenSize={setIsFullScreenSize} isFullScreenSize={isFullScreenSize} />
      <MapContainer
        center={[50, 10]}
        zoom={2}
        maxZoom={10}
        attributionControl
        zoomControl
        doubleClickZoom
        scrollWheelZoom
        dragging
        animate
        easeLinearity={0.35}
      >
        <GeoJSON
          data={worldGeoJSON}
          style={() => ({
            color: '#4a83ec',
            weight: 0.5,
            fillColor: '#1a1d62',
            fillOpacity: 0.9,
          })}
        />
        <Marker position={[50, 10]}>
          <Popup>Popup for any custom information.</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default InteractiveMap;
