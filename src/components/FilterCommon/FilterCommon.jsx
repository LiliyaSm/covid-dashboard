import React, { useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import './FilterCommon.scss';
import * as constants from '../../data/constants';
import DropdownDisplayOptions from '../DropdownDisplayOptions/DropdownDisplayOptions';
import FilterForm from './FilterForm';
import { CommonContext } from '../../Providers/CommonProvider';

const FilterCommon = () => {
  const { showingData, changeShowingData, isFullScreenOptions } = useContext(CommonContext);
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const VARIANTS_FOR_DISPLAYING = useMemo(
    () => ({
      cases: t('dropdown.variants.cases'),
      deaths: t('dropdown.variants.deaths'),
      recovered: t('dropdown.variants.recovered'),
    }),
    [t],
  );

  const DROPDOWN_TITLES = useMemo(
    () => ({
      options: t('dropdown.titles.options'),
      translations: t('dropdown.titles.language'),
    }),
    [t],
  );

  return (
    <div className={isFullScreenOptions ? 'filter filter__full' : 'filter'}>
      <DropdownDisplayOptions
        setCurrShowingData={changeShowingData}
        options={VARIANTS_FOR_DISPLAYING}
        selectedKey={showingData}
        title={DROPDOWN_TITLES.options}
      />
      <DropdownDisplayOptions
        setCurrShowingData={changeLanguage}
        options={constants.LANGUAGES}
        title={DROPDOWN_TITLES.translations}
      />
      <FilterForm />
    </div>
  );
};

export default FilterCommon;
