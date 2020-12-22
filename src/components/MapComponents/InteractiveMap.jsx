import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { MapContainer } from 'react-leaflet';
import PropTypes from 'prop-types';
import {} from 'mapbox-gl-leaflet';
import L from 'leaflet';
import ExpandBtn from '../ExpandBtn/ExpandBtn';
import './InteractiveMap.scss';
import 'leaflet-fullscreen/dist/Leaflet.fullscreen';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
import * as constants from '../../data/constants';

const InteractiveMap = React.memo(({ responseData, GeojsonView, renderOverlay, countryCode }) => {
  const [isFullScreenSize, setIsFullScreenSize] = useState(false);
  const [style, setStyle] = useState('');
  const [map, setMap] = useState('');

  const WhenMapCreated = useCallback(
    (mapInstance) => {
      style.addTo(mapInstance);
      setMap(mapInstance);
    },
    [style, setMap],
  );

  const positionCalc = useMemo(() => {
    if (countryCode === constants.WHOLE_WORLD_NAME) {
      return [constants.DEFAULT_LAT, constants.DEFAULT_LONG];
    }
    const position = responseData.find((el) => el.countryInfo.iso3 === countryCode);
    if (!position) {
      return [constants.DEFAULT_LAT, constants.DEFAULT_LONG];
    }
    return [position.countryInfo.lat, position.countryInfo.long];
  }, [countryCode, responseData]);

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
      map.setView(positionCalc, map.getZoom() || constants.DEFAULT_ZOOM);
    }
    return null;
  };

  return responseData.length ? (
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
        <StyleView />
        {GeojsonView}
        {renderOverlay}
      </MapContainer>
    </div>
  ) : (
    <div>{constants.ERROR_MESSAGE}</div>
  );
});

InteractiveMap.propTypes = {
  responseData: PropTypes.arrayOf(PropTypes.object).isRequired,
  GeojsonView: PropTypes.element.isRequired,
  renderOverlay: PropTypes.element.isRequired,
  countryCode: PropTypes.string.isRequired,
};

export default InteractiveMap;
