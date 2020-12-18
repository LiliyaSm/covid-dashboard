import React, { useEffect, useState, useCallback, useMemo } from 'react';
import Table from 'react-bootstrap/Table';
import PropTypes from 'prop-types';
import ExpandBtn from '../ExpandBtn/ExpandBtn';
import Input from '../Input/Input';
import DropdownDisplayOptions from '../DropdownDisplayOptions/DropdownDisplayOptions';
import * as constants from '../../data/constants';
import './CountryList.scss';
import Switcher from '../TableComponents/Switcher';
import { countFor100 } from '../../helpers/helpers';

const CountryList = ({ countriesList }) => {
  const [isFullScreenSize, setIsFullScreenSize] = useState(false);
  const [selectedCountry] = useState('India');
  const [countries, setCountries] = useState([]);
  const [currShowingData, setCurrShowingData] = useState('cases');
  const [isFor100, setIsFor100] = useState(false);

  const sortedCountries = useMemo(() => {
    const countriesSort = [...countriesList];
    countriesSort.sort((a, b) => b[currShowingData] - a[currShowingData]);
    return countriesSort;
  }, [countriesList, currShowingData]);

  useEffect(() => {
    if (isFor100) {
      setCountries(
        sortedCountries
          .map((el) => ({ ...el, for100Data: countFor100(el[currShowingData], el.population) }))
          .sort((a, b) => b.for100Data - a.for100Data),
      );
    } else {
      setCountries(sortedCountries);
    }
  }, [sortedCountries, isFor100]);

  const filterCountries = useCallback((value) => {
    setCountries(sortedCountries.filter((el) => el.country.toLowerCase().includes(value.toLowerCase())));
  });

  const handleIsFor100 = useCallback(() => {
    setIsFor100((prevValue) => !prevValue);
  });

  return (
    <div className={isFullScreenSize ? 'wrapper full-container' : 'wrapper'}>
      <ExpandBtn setIsFullScreenSize={setIsFullScreenSize} isFullScreenSize={isFullScreenSize} />
      <div className="country-list__header">
        <DropdownDisplayOptions
          setCurrShowingData={setCurrShowingData}
          options={constants.VARIANTS_FOR_DISPLAYING}
          selectedKey={currShowingData}
        />
        <Switcher
          handleOnChange={handleIsFor100}
          label={constants.COUNTRY_SWITCHER.label}
          id={constants.COUNTRY_SWITCHER.id}
        />
      </div>
      <Input filterCountries={filterCountries} placeholder="Country Enter" />
      <div className={isFullScreenSize ? 'country-list__fullscreen' : 'country-list'}>
        <Table striped hover size="sm" variant="dark">
          <tbody>
            {countries.map((el) => (
              <tr key={el.country} className={selectedCountry === el.country ? 'country_selected' : ''}>
                <td>
                  <img src={el.countryInfo.flag} alt={el.country} className="country__flag" />
                </td>
                <td className="country__cases">{isFor100 ? el.for100Data : el[currShowingData]}</td>
                <td className="country__name">{el.country}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

CountryList.propTypes = {
  countriesList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CountryList;
