import Dropdown from 'react-bootstrap/Dropdown';
import * as constants from '../../data/constants';

const DropdownDisplayOptions = ({ setCurrShowingData }) => {
  const handleSelect = (e) => {
    console.log(e)
    setCurrShowingData(e);
  };
  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle className="btn btn-primary dropdown-toggle" key={'info'} variant={'info'.toLowerCase()} title={'info'}>
        Variants for displaying
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {Object.keys(constants.VARIANTS_FOR_DISPLAYING).map((key) => (
          <Dropdown.Item key={`dropdown-variants-${key}`} id={`dropdown-variants-${key}`} eventKey={key}>
            {constants.VARIANTS_FOR_DISPLAYING[key]}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownDisplayOptions;
