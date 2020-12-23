import Dropdown from 'react-bootstrap/Dropdown';
import React from 'react';
import PropTypes from 'prop-types';

const DropdownDisplayOptions = ({ setCurrShowingData, options, selectedKey, title }) => {
  const handleSelect = (e) => {
    setCurrShowingData(e);
  };
  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle className="dropdown-toggle" key="info" variant="info" title={title}>
        {selectedKey ? options[selectedKey] : title}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {Object.keys(options).map((key) => (
          <Dropdown.Item key={`dropdown-variants-${key}`} id={`dropdown-variants-${key}`} eventKey={key}>
            {options[key]}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

DropdownDisplayOptions.propTypes = {
  options: PropTypes.objectOf(PropTypes.any).isRequired,
  setCurrShowingData: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  selectedKey: PropTypes.string,
};

DropdownDisplayOptions.defaultProps = {
  selectedKey: '',
};

export default DropdownDisplayOptions;
