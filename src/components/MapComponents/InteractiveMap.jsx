import React, { useState, useEffect, useContext } from 'react';
import { MapContainer } from 'react-leaflet';
import PropTypes from 'prop-types';
import L from 'leaflet';
import ExpandBtn from '../ExpandBtn/ExpandBtn';
import './InteractiveMap.scss';
import 'leaflet-fullscreen/dist/Leaflet.fullscreen';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
import * as constants from '../../data/constants';
import 'mapbox-gl-leaflet';
import RenderOverlay from './RenderOverlay';
import GeojsonView from './GeojsonView';
import { CommonContext } from '../../Providers/CommonProvider';

const InteractiveMap = ({ responseData, geoJson }) => {
  const { currentCountry, showingData } = useContext(CommonContext);

  const [isFullScreenSize, setIsFullScreenSize] = useState(false);
  const [style, setStyle] = useState('');
  const [map, setMap] = useState('');

  mapboxgl.accessToken = constants.MAPBOX_KEY;

  const WhenMapCreated = (mapInstance) => {
    style.addTo(mapInstance);
    setMap(mapInstance);
  };

  const positionCalc = () => {
    if (currentCountry.code === constants.WHOLE_WORLD_NAME) {
      return [constants.DEFAULT_LAT, constants.DEFAULT_LONG];
    }
    const position = responseData.find((el) => el.countryInfo.iso3 === currentCountry.code);
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

  const StyleView = () => {
    if (map) {
      const position = positionCalc();
      map.setView(position, map.getZoom() || constants.DEFAULT_ZOOM);
    }
    return null;
  };

  return responseData ? (
    <div className={isFullScreenSize ? 'interactive-map full-container' : 'interactive-map'}>
      <ExpandBtn setIsFullScreenSize={setIsFullScreenSize} isFullScreenSize={isFullScreenSize} />
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
        preferCanvas
      >
        <GeojsonView responseData={responseData} currShowingData={showingData} countries={geoJson} />
        <StyleView />
        <RenderOverlay responseData={responseData} currShowingData={showingData} />
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
