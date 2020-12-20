import React, { useContext, useCallback } from 'react';
import './FilterCommon.scss';
import * as constants from '../../data/constants';
import DropdownDisplayOptions from '../DropdownDisplayOptions/DropdownDisplayOptions';
import Switcher from '../TableComponents/Switcher';
import { CommonContext } from '../../Providers/CommonProvider';

const FilterCommon = () => {
  const { showingData, changeShowingData, isFor100, changeIsFor100, isFullScreenOptions } = useContext(CommonContext);
  const handleIsFor100 = useCallback(() => {
    changeIsFor100((prevValue) => !prevValue);
  });

  return (
    <div className={isFullScreenOptions ? 'filter filter__full' : 'filter'}>
      <DropdownDisplayOptions
        setCurrShowingData={changeShowingData}
        options={constants.VARIANTS_FOR_DISPLAYING}
        selectedKey={showingData}
      />
      <Switcher
        handleOnChange={handleIsFor100}
        label={constants.COUNTRY_SWITCHER.label}
        id={constants.COUNTRY_SWITCHER.id}
        checked={isFor100}
      />
    </div>
  );
};

export default FilterCommon;
