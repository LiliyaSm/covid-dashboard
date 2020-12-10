import React from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';

const RadioBtns = ({ wholePeriod, handleIsWholePeriod }) => (
  <Form inline>
    <div>
      <Form.Check
        custom
        type="radio"
        label="For the whole period"
        checked={wholePeriod}
        onChange={handleIsWholePeriod}
        id="radio"
      />

      <Form.Check
        custom
        type="radio"
        label="For the last day"
        checked={!wholePeriod}
        onChange={handleIsWholePeriod}
        id="radio2"
      />
    </div>

    <Form.Check type="switch" id="custom-switch" label="For 100 000" />
  </Form>
);

RadioBtns.propTypes = {
  wholePeriod: PropTypes.bool.isRequired,
  handleIsWholePeriod: PropTypes.func.isRequired,
};

export default RadioBtns;
