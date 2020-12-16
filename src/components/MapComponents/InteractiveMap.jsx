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
import L from 'leaflet';
import {} from 'mapbox-gl-leaflet';
import Legend from './Legend';

const InteractiveMap = ({ responseData, setCurrentCountry, currentCountry }) => {
  mapboxgl.accessToken = 'pk.eyJ1Ijoic2l6YXlhIiwiYSI6ImNraW4zMGk2aDB6Y2kzMnFqM3k3dHd1cTEifQ.C4b5ctgb9K4koJwzcTycZw';

  const [isFullScreenSize, setIsFullScreenSize] = useState(false);
  const [isFor100, setIsFor100] = useState(false);
  const [map, setMap] = useState('');
  const [currShowingData, setCurrShowingData] = useState('cases');

  let boundaries = { firstBoundary: 0, secondBoundary: 0 };

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

  const getBoundary = (covidData) => {
    const min = covidData.reduce((acc, curr) => (acc < curr ? acc : curr));
    const max = covidData.reduce((acc, curr) => (acc > curr ? acc : curr));
    const difference = max - min;
    const firstBoundary = Math.floor(difference * constants.FIRST_DIVISION);
    const secondBoundary = Math.floor(difference * constants.SECOND_DIVISION);
    return { firstBoundary, secondBoundary };
  };

  const getIntensity = (data) => {
    if (data <= boundaries.firstBoundary) {
      return 'low';
    }
    if (data > boundaries.firstBoundary && data <= boundaries.secondBoundary) {
      return 'medium';
    }
    return 'hight';
  };

  const customMarkerIcon = (data) => {
    const intensity = getIntensity(data);
    return divIcon({
      html: `<span class="icon-marker-${intensity}">${data}</span>`,
    });
  };

  const renderMarkers = () => {
    let covidData;
    if (isFor100) {
      covidData = responseData.map((el) => ({
        value: countFor100(el[currShowingData], el.population),
        countryInfo: el.countryInfo,
        country: el.country,
      }));
    } else {
      covidData = responseData.map((el) => ({
        value: el[currShowingData],
        countryInfo: el.countryInfo,
        country: el.country,
      }));
    }

    boundaries = getBoundary(covidData.map((el) => el.value));

    return covidData.map((element) => (
      <Marker
        key={element.country}
        position={[element.countryInfo.lat, element.countryInfo.long]}
        icon={customMarkerIcon(element.value)}
        eventHandlers={{
          click: () => {
            setCurrentCountry(element.country);
          },
        }}
      />
    ));
  };

  const StyleView = () => {
    if (map) {
      const position = positionCalc();
      map.setView(position, map.getZoom() || constants.DEFAULT_ZOOM);
      L.mapboxGL({
        style: `${'mapbox://styles/sizaya/ckireok4h7hjv17nrqcxeyzkc'}`,
        accessToken: 'pk.eyJ1Ijoic2l6YXlhIiwiYSI6ImNraW4zMGk2aDB6Y2kzMnFqM3k3dHd1cTEifQ.C4b5ctgb9K4koJwzcTycZw',
      }).addTo(map);
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
        <Legend boundaries={boundaries} />
        <StyleView />

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
