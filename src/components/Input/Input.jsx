import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ filterCountries }) => (
  <input
    type="text"
    onChange={(event) => {
      filterCountries(event.target.value);
    }}
  />
);

Input.propTypes = {
  filterCountries: PropTypes.func.isRequired,
};

export default Input;
