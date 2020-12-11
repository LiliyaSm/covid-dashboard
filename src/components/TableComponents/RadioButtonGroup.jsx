import React from 'react';
import FormCheck from 'react-bootstrap/FormCheck';
import PropTypes from 'prop-types';

const RadioButtonGroup = ({ handleOnChange, options, selected }) => {
  const handleCheckChange = (event) => {
    const { id } = event.target;
    handleOnChange(id);
  };

  return (
    <div className="radio-buttons">
      {options.map((radiobtn) => (
        <FormCheck
          key={radiobtn.id}
          type={radiobtn.type}
          id={radiobtn.id}
          label={radiobtn.label}
          onChange={handleCheckChange}
          checked={radiobtn.id === selected}
        />
      ))}
    </div>
  );
};

RadioButtonGroup.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleOnChange: PropTypes.func.isRequired,
  selected: PropTypes.string,
};

RadioButtonGroup.defaultProps = {
  selected: false,
};

export default RadioButtonGroup;
