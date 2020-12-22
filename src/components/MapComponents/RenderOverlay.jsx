import React, { useContext } from 'react';
import { divIcon } from 'leaflet';
import { Marker } from 'react-leaflet';
import PropTypes from 'prop-types';
import Legend from './Legend';
import { countFor100, getBoundary, getDataForPeriod } from '../../helpers/helpers';
import { CommonContext } from '../../Providers/CommonProvider';

const RenderOverlay = ({ responseData }) => {
  const { selectCountry, isFor100, isLastDay, showingData } = useContext(CommonContext);

  let boundaries = { firstBoundary: 0, secondBoundary: 0 };

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

  const currShowingDataForPeriod = getDataForPeriod(isLastDay, showingData);

  let covidData;
  if (isFor100) {
    covidData = responseData.map((el) => ({
      value: countFor100(el[currShowingDataForPeriod], el.population),
      countryInfo: el.countryInfo,
      country: el.country,
      population: el.population,
    }));
  } else {
    covidData = responseData.map((el) => ({
      value: el[currShowingDataForPeriod],
      countryInfo: el.countryInfo,
      country: el.country,
      population: el.population,
    }));
  }

  boundaries = getBoundary(covidData.map((el) => el.value));

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
};

RenderOverlay.propTypes = {
  responseData: PropTypes.arrayOf(PropTypes.object),
};

RenderOverlay.defaultProps = {
  responseData: '',
};

export default RenderOverlay;
