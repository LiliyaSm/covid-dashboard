import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import * as constants from '../data/constants';

export const CommonContext = React.createContext({
  currentCountry: { name: null, code: null, population: 0 },
  selectCountry: () => {},
  showingData: 'cases',
  changeShowingData: () => {},
  isFor100: false,
  changeIsFor100: () => {},
  isFullScreenOptions: false,
  changeIsFullScreenOptions: () => {},
  selectedPeriod: constants.PERIODS.wholePeriod,
  changeSelectedPeriod: () => {},
  population: 0,
  changePopulation: () => {},
});

export default function CommonProvider({ children }) {
  const [currentCountry, setCurrentCountry] = useState({
    name: constants.WHOLE_WORLD_NAME,
    code: constants.WHOLE_WORLD_NAME,
    population: 0,
  });
  const selectCountry = useCallback(({ name, code, population }) => setCurrentCountry({ name, code, population }), [
    setCurrentCountry,
  ]);

  const [showingData, setShowingData] = useState('cases');
  const changeShowingData = useCallback((data) => setShowingData(data), [setShowingData]);

  const [isFor100, setIsFor100] = useState(false);
  const changeIsFor100 = useCallback((status) => setIsFor100(status), [setIsFor100]);

  const [selectedPeriod, setSelectedPeriod] = useState(constants.PERIODS.wholePeriod);
  const changeSelectedPeriod = useCallback((period) => setSelectedPeriod(period), [setSelectedPeriod]);

  const [isFullScreenOptions, setIsFullScreenOptions] = useState(false);
  const changeIsFullScreenOptions = useCallback((status) => setIsFullScreenOptions(status), [setIsFullScreenOptions]);

  const [population, setPopulation] = useState(0);
  const changePopulation = useCallback((count) => setPopulation(count), [setPopulation]);

  const contextValue = {
    currentCountry,
    selectCountry,
    selectedPeriod,
    changeSelectedPeriod,
    showingData,
    changeShowingData,
    isFor100,
    changeIsFor100,
    isFullScreenOptions,
    changeIsFullScreenOptions,
    population,
    changePopulation,
  };

  return <CommonContext.Provider value={contextValue}>{children}</CommonContext.Provider>;
}

CommonProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
