import Dropdown from 'react-bootstrap/Dropdown';
import React from 'react';
import PropTypes from 'prop-types';
import * as constants from '../../data/constants';

const DropdownDisplayOptions = ({ setCurrShowingData, options }) => {
  const handleSelect = (e) => {
    setCurrShowingData(e);
  };
  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle className="dropdown-toggle" key="info" variant="info" title="variants">
        Variants for displaying
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {Object.keys(options).map((key) => (
          <Dropdown.Item key={`dropdown-variants-${key}`} id={`dropdown-variants-${key}`} eventKey={key}>
            {constants.VARIANTS_FOR_DISPLAYING[key]}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

DropdownDisplayOptions.propTypes = {
  options: PropTypes.objectOf(PropTypes.any).isRequired,
  setCurrShowingData: PropTypes.func.isRequired,
};

export default DropdownDisplayOptions;
