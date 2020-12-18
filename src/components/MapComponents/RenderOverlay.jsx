import Legend from './Legend';
import * as constants from '../../data/constants';
import { divIcon } from 'leaflet';
import { Marker } from 'react-leaflet';

const RenderOverlay = ({ responseData, isFor100, currShowingData, setCurrentCountry }) => {
  let covidData;

  let boundaries = { firstBoundary: 0, secondBoundary: 0 };

  const countFor100 = (data, population) => {
    if (population) {
      return Math.round((data * constants.PER_100_THOUSANDS) / population);
    }
    return 0;
  };

  const getBoundary = (covidData) => {
    const min = covidData.reduce((acc, curr) => (acc < curr ? acc : curr));
    const max = covidData.reduce((acc, curr) => (acc > curr ? acc : curr));
    const difference = max - min;
    const firstBoundary = Math.floor(difference * constants.FIRST_DIVISION);
    const secondBoundary = Math.floor(difference * constants.SECOND_DIVISION);
    return { firstBoundary, secondBoundary };
  };

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
              setCurrentCountry(element.country);
            },
          }}
        />
      ))}
      <Legend boundaries={boundaries} />
    </>
  );
};

export default RenderOverlay;
