import React, { useMemo } from 'react';
import { divIcon } from 'leaflet';
import { Marker } from 'react-leaflet';
import PropTypes from 'prop-types';
import Legend from './Legend';
import { countFor100, getBoundary, getDataForPeriod } from '../../helpers/helpers';

const RenderOverlay = React.memo(({ responseData, showingData, selectCountry, isFor100, selectedPeriod }) => {
  let boundaries = useMemo(() => ({ firstBoundary: 0, secondBoundary: 0 }), []);

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

  const currShowingDataForPeriod = useMemo(() => getDataForPeriod(selectedPeriod, showingData), [
    selectedPeriod,
    showingData,
  ]);

  const covidData = useMemo(() => {
    if (isFor100) {
      return responseData.map((el) => ({
        value: countFor100(el[currShowingDataForPeriod], el.population),
        countryInfo: el.countryInfo,
        country: el.country,
        population: el.population,
      }));
    }
    return responseData.map((el) => ({
      value: el[currShowingDataForPeriod],
      countryInfo: el.countryInfo,
      country: el.country,
      population: el.population,
    }));
  }, [isFor100, responseData]);

  boundaries = useMemo(() => getBoundary(covidData.map((el) => el.value)), [covidData]);

  return (
    <>
      {covidData.map((element) => (
        <Marker
          key={element.country}
          position={[element.countryInfo.lat, element.countryInfo.long]}
          icon={customMarkerIcon(element.value)}
          eventHandlers={{
            click: () => {
              selectCountry({ code: element.countryInfo.iso3, name: element.country, population: element.population });
            },
          }}
        />
      ))}
      <Legend boundaries={boundaries} />
    </>
  );
});

RenderOverlay.propTypes = {
  responseData: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectCountry: PropTypes.func.isRequired,
  showingData: PropTypes.string.isRequired,
  isFor100: PropTypes.bool.isRequired,
  selectedPeriod: PropTypes.string.isRequired,
};

export default RenderOverlay;
