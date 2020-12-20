import React, { useContext } from 'react';
import { divIcon } from 'leaflet';
import { Marker } from 'react-leaflet';
import PropTypes from 'prop-types';
import Legend from './Legend';
import { countFor100, getBoundary } from '../../helpers/helpers';
import { CommonContext } from '../../Providers/CommonProvider';

const RenderOverlay = ({ responseData, currShowingData }) => {
  const { selectCountry: setCurrentCountry, isFor100 } = useContext(CommonContext);

  let covidData;

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

  if (isFor100) {
    covidData = responseData.map((el) => ({
      value: countFor100(el[currShowingData], el.population),
      countryInfo: el.countryInfo,
      country: el.country,
    }));
  } else {
    covidData = responseData.map((el) => ({
      value: el[currShowingData],
      countryInfo: el.countryInfo,
      country: el.country,
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
              setCurrentCountry({ code: element.countryInfo.iso3, name: element.country });
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
  currShowingData: PropTypes.string,
};

RenderOverlay.defaultProps = {
  responseData: '',
  currShowingData: '',
};

export default RenderOverlay;
