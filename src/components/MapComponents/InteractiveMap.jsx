import React, { useState, useEffect, useRef } from 'react';
import ExpandBtn from '../ExpandBtn/ExpandBtn';
import Switcher from '../TableComponents/Switcher';
import DropdownDisplayOptions from './DropdownDisplayOptions';
import './InteractiveMap.scss';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, useMap } from 'react-leaflet';
import { divIcon } from 'leaflet';
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
import * as constants from '../../data/constants';
// import L from 'leaflet';

const InteractiveMap = ({ responseData, setCurrentCountry, currentCountry }) => {
  const [isFullScreenSize, setIsFullScreenSize] = useState(false);
  const [isFor100, setIsFor100] = useState(false);
  const [latCenter, setLat] = useState(20.5937);
  const [lngCenter, setLng] = useState(78.9629);
  const [zoom, setZoom] = useState(3);
  const [map, setMap] = useState('');
  const [currShowingData, setCurrShowingData] = useState('cases');

  const positionCalc = () => {
    if (currentCountry === constants.WHOLE_WORLD_NAME) {
      console.log(currentCountry);
      return [latCenter, lngCenter];
    } else {
      const position = responseData.find((el) => el.country === currentCountry);
      console.log(position.countryInfo.lat, position.countryInfo.long);
      setLat(position.countryInfo.lat);
      setLng(position.countryInfo.long);
    }
  };

  const switcher = { label: 'per 100,000 population', id: 'mapSwitcher' };

  useEffect(() => {
    // console.log(map);
    // if (map.current) {
    // const map = map.current.leafletElement;
    // L.Util.requestAnimFrame(map.invalidateSize, map, !1, map._container);
    // setTimeout(() => {
    //   map.invalidateSize();
    // }, 250);
    // L.Map.invalidateSize();
    // }
    
  }, [isFullScreenSize]);

  const handleIsFor100 = () => {
    setIsFor100(!isFor100);
  };
  const countFor100 = (data, population) => {
    if (population) {
      return Math.round((data * constants.PER_100_THOUSANDS) / population);
    } else {
      return 0;
    }
  };

  const getIntensity = (data, population) => {
    let min = responseData.reduce(function (prev, curr) {
      return prev[currShowingData] < curr[currShowingData] ? prev : curr;
    });
    let max = responseData.reduce(function (prev, curr) {
      return prev[currShowingData] > curr[currShowingData] ? prev : curr;
    });
    if (isFor100) {
      min = countFor100(min[currShowingData], population);
      max = countFor100(max[currShowingData], population);
    } else {
      min = min[currShowingData];
      max = max[currShowingData];
    }
    let difference = max - min;
    let firstBoundary = Math.floor((difference * 5) / 100);
    let secondBoundary = Math.floor((difference * 50) / 100);

    if (data <= firstBoundary) {
      return 'low';
    } else if (data > firstBoundary && data < secondBoundary) {
      return 'medium';
    } else {
      return 'hight';
    }
  };

  const customMarkerIcon = (data, population) => {
    let markerData;
    if (isFor100) {
      markerData = countFor100(data, population);
    } else {
      markerData = data;
    }
    const intensity = getIntensity(markerData, population);
    return divIcon({
      html: `<span class="icon-marker-${intensity}">${markerData}</span>`,
    });
  };

  const renderMarkers = () => {
    return responseData.map((element) => {
      return (
        <Marker
          key={element.country}
          position={[element.countryInfo.lat, element.countryInfo.long]}
          icon={customMarkerIcon(element[currShowingData], element.population)}
          eventHandlers={{
            click: () => {
              setCurrentCountry(element.country);
            },
          }}
        >
          <Popup>{element.country}</Popup>
        </Marker>
      );
    });
  };

  function MyComponent() {
    const map = useMap();
    positionCalc();
    map.setView([latCenter, lngCenter], 7);
    map.invalidateSize();
    console.log('map center:', map.getCenter());
    return null;
  }

  return responseData ? (
    <div className={isFullScreenSize ? 'interactive-map full-container' : 'interactive-map'}>
      <ExpandBtn setIsFullScreenSize={setIsFullScreenSize} isFullScreenSize={isFullScreenSize} />
      <div className="switchGroup">
        <DropdownDisplayOptions setCurrShowingData={setCurrShowingData} />
        <Switcher handleOnChange={handleIsFor100} label={switcher.label} id={switcher.id} />
      </div>
      <MapContainer
        fullscreenControl={true}
        center={[latCenter, lngCenter]}
        zoom={zoom}
        maxZoom={10}
        attributionControl
        zoomControl
        doubleClickZoom
        scrollWheelZoom
        dragging
        animate
        easeLinearity={0.35}
      >
        <MyComponent />{' '}
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {renderMarkers()}
      </MapContainer>
    </div>
  ) : (
    <div>wait...</div>
  );
};

export default InteractiveMap;
