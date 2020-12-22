import React, { useContext, useCallback } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import Switcher from './Switcher';
import { CommonContext } from '../../Providers/CommonProvider';
import * as constants from '../../data/constants';

const FilterForm = ({ infoWorld }) => {
  const { isFor100, changeIsFor100, isLastDay, changeSelectedPeriod, selectCountry } = useContext(
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

  const handleReset = useCallback(() => {
    selectCountry({
      name: constants.WHOLE_WORLD_NAME,
      code: constants.WHOLE_WORLD_NAME,
      population: infoWorld.population,
    });
    changeSelectedPeriod(false);
    changeIsFor100(false);
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
      <Button variant="info" onClick={handleReset}>Reset filters</Button>
    </Form>
  );
};

export default FilterForm;

FilterForm.propTypes = {
  infoWorld: PropTypes.object.isRequired,
};
