import React, { useContext } from 'react';
import { GeoJSON } from 'react-leaflet';
import PropTypes from 'prop-types';
import L from 'leaflet';
import * as constants from '../../data/constants';
import { CommonContext } from '../../Providers/CommonProvider';

const GeojsonView = ({ currShowingData, responseData, countries }) => {
  const { selectCountry: setCurrentCountry, isFor100, isLastDay } = useContext(CommonContext);

  const handleGeojson = (code) => {
    const isCountryExists = responseData.find((el) => el.countryInfo.iso3 === code);
    if (isCountryExists.country) {
      setCurrentCountry({ code, name: isCountryExists.country, population: isCountryExists.population });
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
          isLastDay ? 'for last day' : 'for whole period'
        } ${isFor100 ? 'per 100K' : ''} <br> for: ${feature.properties.name} `;

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
  countries: PropTypes.objectOf(PropTypes.object),
  currShowingData: PropTypes.string,
};

GeojsonView.defaultProps = {
  currShowingData: '',
  countries: '',
};

export default GeojsonView;
