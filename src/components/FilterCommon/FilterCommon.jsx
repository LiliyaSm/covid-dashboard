import React, { useContext } from 'react';
import './FilterCommon.scss';
import * as constants from '../../data/constants';
import DropdownDisplayOptions from '../DropdownDisplayOptions/DropdownDisplayOptions';
import FilterForm from './FilterForm';
import { CommonContext } from '../../Providers/CommonProvider';

const FilterCommon = () => {
  const {
    showingData,
    changeShowingData,
    isFullScreenOptions,
    selectedPeriod,
    changeSelectedPeriod,
  } = useContext(CommonContext);

  return (
    <div className={isFullScreenOptions ? 'filter filter__full' : 'filter'}>
      <DropdownDisplayOptions
        setCurrShowingData={changeShowingData}
        options={constants.VARIANTS_FOR_DISPLAYING}
        selectedKey={showingData}
      />
      <FilterForm handleSelectedPeriod={changeSelectedPeriod} selectedPeriod={selectedPeriod} />
    </div>
  );
};

export default FilterCommon;
