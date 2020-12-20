import React, { useContext, useCallback } from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import RadioButtonGroup from './RadioButtonGroup';
import Switcher from './Switcher';
import * as constants from '../../data/constants';
import { CommonContext } from '../../Providers/CommonProvider';

const TableForm = ({ selectedPeriod, handleSelectedPeriod }) => {
  const { isFor100, changeIsFor100 } = useContext(CommonContext);
  const switcher = { label: 'per 100,000 population', id: 'tableSwitcher' };
  const radioBtns = [
    {
      label: 'For the whole period',
      id: constants.PERIODS.wholePeriod,
      type: 'radio',
    },
    { label: 'For the last day', id: constants.PERIODS.lastDay, type: 'radio' },
  ];

  const handleIsFor100 = useCallback(() => {
    changeIsFor100(!isFor100);
  });

  return (
    <Form className="table-form">
      <RadioButtonGroup handleOnChange={handleSelectedPeriod} options={radioBtns} selected={selectedPeriod} />
      <Switcher handleOnChange={handleIsFor100} label={switcher.label} id={switcher.id} checked={isFor100} />
    </Form>
  );
};

TableForm.propTypes = {
  selectedPeriod: PropTypes.string.isRequired,
  handleSelectedPeriod: PropTypes.func.isRequired,
};

export default TableForm;
