import React, { useContext, useCallback } from 'react';
import Form from 'react-bootstrap/Form';
import { useTranslation } from 'react-i18next';

import Switcher from './Switcher';
import { CommonContext } from '../../Providers/CommonProvider';

const FilterForm = () => {
  const { t } = useTranslation();
  const { isFor100, changeIsFor100, isLastDay, changeSelectedPeriod } = useContext(CommonContext);
  const periodSwitcher = { label: t('switcher.periodLabel'), id: 'periodSwitcher' };
  const switcherFor100 = { label: t('switcher.for100Label'), id: 'tableSwitcher' };

  const handleIsFor100 = useCallback(() => {
    changeIsFor100(!isFor100);
  });

  const handleSelectedPeriod = useCallback(() => {
    changeSelectedPeriod(!isLastDay);
  });

  return (
    <Form className="filter-form">
      <Switcher
        className="period-switcher"
        handleOnChange={handleSelectedPeriod}
        label={periodSwitcher.label}
        id={periodSwitcher.id}
        checked={isLastDay}
      />
      <Switcher
        handleOnChange={handleIsFor100}
        label={switcherFor100.label}
        id={switcherFor100.id}
        checked={isFor100}
      />
    </Form>
  );
};

export default FilterForm;
