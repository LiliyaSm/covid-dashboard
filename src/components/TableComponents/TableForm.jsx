import React from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import RadioButtonGroup from './RadioButtonGroup';
import Switcher from './Switcher';
import * as constants from '../../data/constants';

const TableForm = ({ selectedPeriod, handleSelectedPeriod, handleIsFor100 }) => {
  const switcher = { label: 'per 100,000 population', id: 'tableSwitcher' };
  const radioBtns = [
    {
      label: 'For the whole period',
      id: constants.PERIODS.wholePeriod,
      type: 'radio',
    },
    { label: 'For the last day', id: constants.PERIODS.lastDay, type: 'radio' },
  ];

  return (
    <Form className="table-form">
      <RadioButtonGroup
        handleOnChange={handleSelectedPeriod}
        options={radioBtns}
        selected={selectedPeriod}
      />
      <Switcher
        handleOnChange={handleIsFor100}
        label={switcher.label}
        id={switcher.id}
      />
    </Form>
  );
};

TableForm.propTypes = {
  selectedPeriod: PropTypes.string.isRequired,
  handleSelectedPeriod: PropTypes.func.isRequired,
  handleIsFor100: PropTypes.func.isRequired,
};

export default TableForm;
