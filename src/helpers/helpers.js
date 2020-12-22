import * as constants from '../data/constants';

export const countFor100 = (data, population) => {
  if (population) {
    return Math.round((data * constants.PER_100_THOUSANDS) / population);
  }
  return 0;
};

const getRoundField = (data) => {
  if (data < 10) return data;
  const rank = Math.floor(Math.log10(data));
  const number = 10 ** rank;
  const roundedData = Math.round(data / number) * number;
  return roundedData;
};

export const getBoundary = (covidData) => {
  const min = covidData.reduce((acc, curr) => (acc < curr ? acc : curr));
  const max = covidData.reduce((acc, curr) => (acc > curr ? acc : curr));
  const difference = max - min;
  let firstBoundary = Math.floor(difference * constants.FIRST_DIVISION);
  let secondBoundary = Math.floor(difference * constants.SECOND_DIVISION);

  firstBoundary = getRoundField(firstBoundary);
  secondBoundary = getRoundField(secondBoundary);
  return { firstBoundary, secondBoundary };
};

export const getDataForPeriod = (selectedPeriod, currShowingData) => {
  let currShowingDataForPeriod;
  if (selectedPeriod === constants.PERIODS.lastDay) {
    currShowingDataForPeriod = constants.TODAY[currShowingData];
  } else {
    currShowingDataForPeriod = currShowingData;
  }

  return currShowingDataForPeriod;
};

export const getDataForPeriodDashboard = (period, data) => {
  const result = {};
  if (period === constants.PERIODS.wholePeriod) {
    result.confirmed = data.cases;
    result.deaths = data.deaths;
    result.recovered = data.recovered;
  } else {
    result.confirmed = data.todayCases;
    result.deaths = data.todayDeaths;
    result.recovered = data.todayRecovered;
  }
  return result;
};
