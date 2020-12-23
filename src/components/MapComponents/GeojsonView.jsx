import React, { useCallback, useMemo } from 'react';
import { GeoJSON } from 'react-leaflet';
import PropTypes from 'prop-types';
import L from 'leaflet';
import { useTranslation } from 'react-i18next';

const GeojsonView = React.memo(({ currShowingData, responseData, selectCountry, isFor100, isLastDay, countries }) => {
  const { t } = useTranslation();
  const handleGeojson = useCallback(
    (code) => {
      const isCountryExists = responseData.find((el) => el.countryInfo.iso3 === code);
      if (isCountryExists && isCountryExists.country) {
        selectCountry({ code, name: isCountryExists.country, population: isCountryExists.population });
      }
    },
    [responseData, selectCountry],
  );

  const geojsonStyle = useMemo(() => ({ weight: 0, fillOpacity: 0 }), []);

  return (
    <GeoJSON
      key="my-geojson"
      data={countries.features}
      style={geojsonStyle}
      onEachFeature={(feature, layer) => {
        // eslint-disable-next-line no-param-reassign
        feature.properties.tooltipText = `${t(`map.tooltip.${currShowingData}`)}
        ${isLastDay ? t('map.tooltip.lastDay') : t('map.tooltip.wholePeriod')}
        ${isFor100 ? t('map.tooltip.per100') : ''} <br> ${t('map.tooltip.for')}: ${feature.properties.name}`;

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
});

GeojsonView.propTypes = {
  responseData: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectCountry: PropTypes.func.isRequired,
  currShowingData: PropTypes.string.isRequired,
  isFor100: PropTypes.bool.isRequired,
  isLastDay: PropTypes.bool.isRequired,
  countries: PropTypes.objectOf(PropTypes.any),
};

GeojsonView.defaultProps = {
  countries: {},
};

export default GeojsonView;
