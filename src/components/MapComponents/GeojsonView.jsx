import React from 'react';
import { GeoJSON } from 'react-leaflet';
import PropTypes from 'prop-types';
import L from 'leaflet';
import * as countries from '../../data/countries.json';
import * as constants from '../../data/constants';

const GeojsonView = ({ isFor100, currShowingData, setCurrentCountry }) => {
  const geojsonStyle = { weight: 0, fillOpacity: 0 };

  return (
    <GeoJSON
      key="my-geojson"
      data={countries.features}
      style={geojsonStyle}
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
  );
};

GeojsonView.propTypes = {
  setCurrentCountry: PropTypes.func,
  currShowingData: PropTypes.string,
  isFor100: PropTypes.bool,
};

GeojsonView.defaultProps = {
  setCurrentCountry: '',
  currShowingData: '',
  isFor100: 'false',
};

export default GeojsonView;
