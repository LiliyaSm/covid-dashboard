import React, { useState, useEffect, useContext, useCallback } from 'react';
import { MapContainer } from 'react-leaflet';
import PropTypes from 'prop-types';
import L from 'leaflet';
import ExpandBtn from '../ExpandBtn/ExpandBtn';
import Switcher from '../TableComponents/Switcher';
import DropdownDisplayOptions from '../DropdownDisplayOptions/DropdownDisplayOptions';
import './InteractiveMap.scss';
import 'leaflet-fullscreen/dist/Leaflet.fullscreen';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
import * as constants from '../../data/constants';
import 'mapbox-gl-leaflet';
import RenderOverlay from './RenderOverlay';
import GeojsonView from './GeojsonView';
import { CommonContext } from '../../Providers/CommonProvider';

const InteractiveMap = ({ responseData }) => {
  const { currentCountry, isFor100, changeIsFor100 } = useContext(CommonContext);

  const [isFullScreenSize, setIsFullScreenSize] = useState(false);
  const [currShowingData, setCurrShowingData] = useState('cases');
  const [style, setStyle] = useState('');
  const [map, setMap] = useState('');

  const WhenMapCreated = (mapInstance) => {
    setMap(mapInstance);
  };

  const positionCalc = () => {
    if (currentCountry === constants.WHOLE_WORLD_NAME) {
      return [constants.DEFAULT_LAT, constants.DEFAULT_LONG];
    }
    const position = responseData.find((el) => el.countryInfo.iso3 === currentCountry);
    if (!position) {
      return [constants.DEFAULT_LAT, constants.DEFAULT_LONG];
    }
    return [position.countryInfo.lat, position.countryInfo.long];
  };

  useEffect(() => {
    const mapStyle = L.mapboxGL({
      style: constants.MAPBOX_STYLE,
      accessToken: constants.MAPBOX_KEY,
    });
    setStyle(mapStyle);
  }, []);

  useEffect(() => {
    if (map) {
      map.invalidateSize();
    }
  }, [isFullScreenSize]);

  const handleIsFor100 = useCallback(() => {
    changeIsFor100(!isFor100);
  });

  const StyleView = () => {
    if (map) {
      const position = positionCalc();
      map.setView(position, map.getZoom() || constants.DEFAULT_ZOOM);
      style.addTo(map);
    }
    return null;
  };

  return responseData ? (
    <div className={isFullScreenSize ? 'interactive-map full-container' : 'interactive-map'}>
      <ExpandBtn setIsFullScreenSize={setIsFullScreenSize} isFullScreenSize={isFullScreenSize} />
      <div className="switchGroup">
        <DropdownDisplayOptions setCurrShowingData={setCurrShowingData} options={constants.VARIANTS_FOR_DISPLAYING} />
        <Switcher
          handleOnChange={handleIsFor100}
          label={constants.MAP_SWITCHER.label}
          id={constants.MAP_SWITCHER.id}
          checked={isFor100}
        />
      </div>
      <MapContainer
        id="someID"
        fullscreenControl
        attributionControl
        zoomControl
        doubleClickZoom
        scrollWheelZoom
        dragging
        animate
        whenCreated={WhenMapCreated}
      >
        <GeojsonView responseData={responseData} currShowingData={currShowingData} />
        <StyleView />
        <RenderOverlay responseData={responseData} currShowingData={currShowingData} />
      </MapContainer>
    </div>
  ) : (
    <div>{constants.ERROR_MESSAGE}</div>
  );
};

InteractiveMap.propTypes = {
  responseData: PropTypes.arrayOf(PropTypes.object),
};

InteractiveMap.defaultProps = {
  responseData: '',
};

export default InteractiveMap;
