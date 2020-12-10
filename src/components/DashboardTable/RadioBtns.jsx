import React from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';

const RadioBtns = ({
  wholePeriod: isWholePeriod,
  handleIsWholePeriod,
  handleIsFor100,
}) => (
  <Form inline>
    <div>
      <Form.Check
        custom
        type="radio"
        label="For the whole period"
        checked={isWholePeriod}
        onChange={handleIsWholePeriod}
        id="radio"
      />

      <Form.Check
        custom
        type="radio"
        label="For the last day"
        checked={!isWholePeriod}
        onChange={handleIsWholePeriod}
        id="radio2"
      />
    </div>

    <Form.Check
      onChange={handleIsFor100}
      type="switch"
      id="custom-switch"
      label="per 100,000 population"
    />
  </Form>
);

RadioBtns.propTypes = {
  wholePeriod: PropTypes.bool.isRequired,
  handleIsWholePeriod: PropTypes.func.isRequired,
  handleIsFor100: PropTypes.func.isRequired,
};

export default RadioBtns;
