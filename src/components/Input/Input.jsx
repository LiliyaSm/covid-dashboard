import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import './Input.scss';
import useScript from '../../hooks/useScript';
import * as constants from '../../data/constants';

const Input = ({ filterCountries, placeholder }) => {
  useScript(constants.KEYBOARD_URL);
  const textRef = useRef();

  const inputHandler = () => {
    filterCountries(textRef.current.value);
  };

  return (
    <div className="input__container">
      <input
        ref={textRef}
        type="text"
        className="use-keyboard-input"
        placeholder={placeholder}
        onChange={inputHandler}
      />
      <span className="input__keyboard" />
    </div>
  );
};

Input.propTypes = {
  filterCountries: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default Input;
