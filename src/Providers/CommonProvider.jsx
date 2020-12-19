import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import * as constants from '../data/constants';

export const CommonContext = React.createContext({
  currentCountry: null,
  selectCountry: () => {},
  showingData: 'cases',
  changeShowingData: () => {},
  isFor100: false,
  changeIsFor100: () => {},
});

export default function CommonProvider({ children }) {
  const [currentCountry, setCurrentCountry] = useState(constants.WHOLE_WORLD_NAME);
  const selectCountry = useCallback((code) => setCurrentCountry(code), [setCurrentCountry]);

  const [showingData, setShowingData] = useState('cases');
  const changeShowingData = useCallback((data) => setShowingData(data), [setShowingData]);

  const [isFor100, setIsFor100] = useState(false);
  const changeIsFor100 = useCallback((status) => setIsFor100(status), [setIsFor100]);

  const contextValue = {
    currentCountry,
    selectCountry,
    showingData,
    changeShowingData,
    isFor100,
    changeIsFor100,
  };

  return <CommonContext.Provider value={contextValue}>{children}</CommonContext.Provider>;
}

CommonProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
