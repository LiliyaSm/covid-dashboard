import React, { useState, useEffect } from 'react';
import { divIcon } from 'leaflet';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import PropTypes from 'prop-types';
import ExpandBtn from '../ExpandBtn/ExpandBtn';
import Switcher from '../TableComponents/Switcher';
import DropdownDisplayOptions from '../DropdownDisplayOptions/DropdownDisplayOptions';
import './InteractiveMap.scss';
import 'leaflet-fullscreen/dist/Leaflet.fullscreen';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
import * as constants from '../../data/constants';

const InteractiveMap = ({ responseData, setCurrentCountry, currentCountry }) => {
  const [isFullScreenSize, setIsFullScreenSize] = useState(false);
  const [isFor100, setIsFor100] = useState(false);
  const [map, setMap] = useState('');
  const [currShowingData, setCurrShowingData] = useState('cases');

  const positionCalc = () => {
    if (currentCountry === constants.WHOLE_WORLD_NAME) {
      return [constants.DEFAULT_LAT, constants.DEFAULT_LONG];
    }
    const position = responseData.find((el) => el.country === currentCountry);
    return [position.countryInfo.lat, position.countryInfo.long];
  };

  useEffect(() => {
    if (map) {
      map.invalidateSize();
    }
  }, [isFullScreenSize]);

  const handleIsFor100 = () => {
    setIsFor100(!isFor100);
  };
  const countFor100 = (data, population) => {
    if (population) {
      return Math.round((data * constants.PER_100_THOUSANDS) / population);
    }
    return 0;
  };

  const getIntensity = (data, covidData) => {
    const min = covidData.reduce((acc, curr) => (acc < curr ? acc : curr));
    const max = covidData.reduce((acc, curr) => (acc > curr ? acc : curr));
    const difference = max - min;
    const firstBoundary = Math.floor(difference * constants.FIRST_DIVISION);
    const secondBoundary = Math.floor(difference * constants.SECOND_DIVISION);

    if (data <= firstBoundary) {
      return 'low';
    }
    if (data > firstBoundary && data < secondBoundary) {
      return 'medium';
    }
    return 'hight';
  };

  const customMarkerIcon = (data, population) => {
    let covidData;
    let countryData = data;
    if (isFor100) {
      covidData = responseData.map((el) => countFor100(el[currShowingData], el.population));
      countryData = countFor100(data, population);
    } else {
      covidData = responseData.map((el) => el[currShowingData]);
    }
    const intensity = getIntensity(countryData, covidData);
    return divIcon({
      html: `<span class="icon-marker-${intensity}">${countryData}</span>`,
    });
  };

  const renderMarkers = () => responseData.map((element) => (
    <Marker
      key={element.country}
      position={[element.countryInfo.lat, element.countryInfo.long]}
      icon={customMarkerIcon(element[currShowingData], element.population)}
      eventHandlers={{
        click: () => {
          setCurrentCountry(element.country);
        },
      }}
    />
  ));

  const ChangeView = () => {
    if (map) {
      const position = positionCalc();
      map.setView(position, map.getZoom() || constants.DEFAULT_ZOOM);
    }
    return null;
  };

  const WhenMapCreated = (mapInstance) => {
    setMap(mapInstance);
  };

  return responseData ? (
    <div className={isFullScreenSize ? 'interactive-map full-container' : 'interactive-map'}>
      <ExpandBtn setIsFullScreenSize={setIsFullScreenSize} isFullScreenSize={isFullScreenSize} />
      <div className="switchGroup">
        <DropdownDisplayOptions setCurrShowingData={setCurrShowingData} options={constants.VARIANTS_FOR_DISPLAYING} />
        <Switcher handleOnChange={handleIsFor100} label={constants.MAP_SWITCHER.label} id={constants.MAP_SWITCHER.id} />
      </div>
      <MapContainer
        fullscreenControl
        attributionControl
        zoomControl
        doubleClickZoom
        scrollWheelZoom
        dragging
        animate
        whenCreated={WhenMapCreated}
      >
        <ChangeView />
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {renderMarkers()}
      </MapContainer>
    </div>
  ) : (
    <div>{constants.ERROR_MESSAGE}</div>
  );
};

InteractiveMap.propTypes = {
  responseData: PropTypes.arrayOf(PropTypes.object),
  setCurrentCountry: PropTypes.func,
  currentCountry: PropTypes.string,
};

InteractiveMap.defaultProps = {
  currentCountry: '',
  setCurrentCountry: '',
  responseData: '',
};

export default InteractiveMap;
