import React from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';

const RadioButtonGroup = ({ handleOnChange, options, selected }) => {
  const handleCheckChange = (event) => {
    const { id } = event.target;
    handleOnChange(id);
  };

  return (
    <div>
      {options.map((radiobtn) => (
        <Form.Check
          key={radiobtn.id}
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
