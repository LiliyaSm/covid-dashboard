import React from 'react';
import PropTypes from 'prop-types';
import './Input.scss';

const Input = ({ filterCountries, placeholder }) => (
  <div className="input__container">
    <input
      type="text"
      onChange={(event) => {
        filterCountries(event.target.value);
      }}
      className="input"
      placeholder={placeholder}
    />
    <span className="input__keyboard" />
  </div>
);

Input.propTypes = {
  filterCountries: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default Input;
