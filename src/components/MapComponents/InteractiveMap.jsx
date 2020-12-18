import React, { useState, useEffect } from 'react';
import { MapContainer, GeoJSON } from 'react-leaflet';
import PropTypes from 'prop-types';
import L from 'leaflet';
import ExpandBtn from '../ExpandBtn/ExpandBtn';
import Switcher from '../TableComponents/Switcher';
import DropdownDisplayOptions from '../DropdownDisplayOptions/DropdownDisplayOptions';
import './InteractiveMap.scss';
import 'leaflet-fullscreen/dist/Leaflet.fullscreen';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
import * as constants from '../../data/constants';
import * as countries from '../../data/countries.json';
import {} from 'mapbox-gl-leaflet';
import RenderOverlay from './RenderOverlay';

const InteractiveMap = ({ responseData, setCurrentCountry, currentCountry }) => {
  const [isFullScreenSize, setIsFullScreenSize] = useState(false);
  const [isFor100, setIsFor100] = useState(false);
  const [map, setMap] = useState('');
  const [currShowingData, setCurrShowingData] = useState('cases');

  const WhenMapCreated = (mapInstance) => {
    setMap(mapInstance);
  };

  const positionCalc = () => {
    if (currentCountry === constants.WHOLE_WORLD_NAME) {
      return [constants.DEFAULT_LAT, constants.DEFAULT_LONG];
    }
    const position = responseData.find((el) => el.country === currentCountry);
    if (!position) {
      return [constants.DEFAULT_LAT, constants.DEFAULT_LONG];
    }
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

  const style = { weight: 0, fillOpacity: 0 };

  return responseData ? (
    <div className={isFullScreenSize ? 'interactive-map full-container' : 'interactive-map'}>
      <ExpandBtn setIsFullScreenSize={setIsFullScreenSize} isFullScreenSize={isFullScreenSize} />
      <div className="switchGroup">
        <DropdownDisplayOptions setCurrShowingData={setCurrShowingData} options={constants.VARIANTS_FOR_DISPLAYING} />
        <Switcher handleOnChange={handleIsFor100} label={constants.MAP_SWITCHER.label} id={constants.MAP_SWITCHER.id} />
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
        <GeoJSON
          key="my-geojson"
          data={countries.features}
          style={style}
          onEachFeature={(feature, layer) => {
            // eslint-disable-next-line no-param-reassign
            feature.properties.tooltipText = `${constants.VARIANTS_FOR_DISPLAYING[currShowingData]} ${
              isFor100 ? 'for 100K' : ''
            } <br> for: ${feature.properties.name} `;

            layer.on({
              click: () => {
                if (feature.properties.name) {
                  setCurrentCountry(feature.properties.name);
                }
              },
              mouseover(e) {
                const activeFeature = e.target.feature;
                layer
                  .bindTooltip(activeFeature.properties.tooltipText, {
                    closeButton: false,
                    offset: L.point(0, -20),
                    sticky: true,
                    className: 'toolTip',
                  })
                  .openTooltip();
              },
              mouseout() {
                layer.unbindTooltip(feature.properties.name);
              },
            });
          }}
        />

        <StyleView />

        <RenderOverlay
          responseData={responseData}
          isFor100={isFor100}
          currShowingData={currShowingData}
          setCurrentCountry={setCurrentCountry}
        />
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
