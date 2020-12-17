import * as constants from '../data/constants';

export const countFor100 = (data, population) => {
  if (population) {
    return Math.round((data * constants.PER_100_THOUSANDS) / population);
  }
  return 0;
};

export const getIntensity = (data, covidData) => {
  const min = covidData.reduce((acc, curr) => (acc < curr ? acc : curr));
  const max = covidData.reduce((acc, curr) => (acc > curr ? acc : curr));
  const difference = max - min;
  const firstBoundary = Math.floor(difference * constants.FIRST_DIVISION);
  const secondBoundary = Math.floor(difference * constants.SECOND_DIVISION);

  if (data <= firstBoundary) {
    return 'low';
  }
  if (data > firstBoundary && data <= secondBoundary) {
    return 'medium';
  }
  return 'hight';
};
