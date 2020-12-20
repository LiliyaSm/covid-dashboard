import React, { useContext } from 'react';
import { GeoJSON } from 'react-leaflet';
import PropTypes from 'prop-types';
import L from 'leaflet';
import * as countries from '../../data/countries.json';
import * as constants from '../../data/constants';
import { CommonContext } from '../../Providers/CommonProvider';

const GeojsonView = ({ currShowingData, responseData }) => {
  const { selectCountry: setCurrentCountry, isFor100 } = useContext(CommonContext);

  const handleGeojson = (code) => {
    const isCountryExists = responseData.find((el) => el.countryInfo.iso3 === code).country;
    if (isCountryExists) {
      setCurrentCountry({ code, name: isCountryExists });
    }
  };

  const geojsonStyle = { weight: 0, fillOpacity: 0 };

  return (
    <GeoJSON
      key="my-geojson"
      data={countries.features}
      style={geojsonStyle}
      onEachFeature={(feature, layer) => {
        // eslint-disable-next-line no-param-reassign
        feature.properties.tooltipText = `${constants.VARIANTS_FOR_DISPLAYING[currShowingData]} ${
          isFor100 ? 'per 100K' : ''
        } <br> for: ${feature.properties.name} `;

        layer.on({
          click: () => {
            handleGeojson(feature.properties.ISO_A3);
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
  responseData: PropTypes.arrayOf(PropTypes.object).isRequired,
  currShowingData: PropTypes.string,
};

GeojsonView.defaultProps = {
  currShowingData: '',
};

export default GeojsonView;
