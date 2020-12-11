import React from 'react';

import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';

const Switcher = ({ handleOnChange, label, id }) => (
  <Form.Check onChange={handleOnChange} type="switch" id={id} label={label} />
);
export default Switcher;

Switcher.propTypes = {
  handleOnChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
