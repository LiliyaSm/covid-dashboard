import React, { useContext, useCallback } from 'react';
import Form from 'react-bootstrap/Form';
import Switcher from './Switcher';
import { CommonContext } from '../../Providers/CommonProvider';

const FilterForm = () => {
  const { isFor100, changeIsFor100, isLastDay, changeSelectedPeriod } = useContext(
    CommonContext,
  );
  const switcherFor100 = { label: 'per 100,000 population', id: 'tableSwitcher' };
  const periodSwitcher = { label: 'for the last day', id: 'periodSwitcher' };

  const handleIsFor100 = useCallback(() => {
    changeIsFor100(!isFor100);
  });

  const handleSelectedPeriod = useCallback(() => {
    changeSelectedPeriod(!isLastDay);
  });

  return (
    <Form className="filter-form">
      <div className="switcherForm">
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
      </div>
    </Form>
  );
};

export default FilterForm;
