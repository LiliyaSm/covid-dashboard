import React, { useEffect, useState, useCallback, useMemo } from 'react';
import Table from 'react-bootstrap/Table';
import PropTypes from 'prop-types';
import ExpandBtn from '../ExpandBtn/ExpandBtn';
import Input from '../Input/Input';
import './CountryList.scss';

const CountryList = ({ countriesList }) => {
  const [isFullScreenSize, setIsFullScreenSize] = useState(false);
  const [selectedCountry] = useState('India');
  const [countries, setCountries] = useState([]);

  const sortedCountries = useMemo(() => {
    const countriesSort = [...countriesList];
    countriesSort.sort((a, b) => b.cases - a.cases);
    return countriesSort;
  }, [countriesList]);

  useEffect(() => {
    setCountries(sortedCountries);
  }, [sortedCountries]);

  const filterCountries = useCallback((value) => {
    setCountries(sortedCountries.filter((el) => el.country.toLowerCase().includes(value.toLowerCase())));
  });

  return (
    <div className={isFullScreenSize ? 'wrapper full-container' : 'wrapper'}>
      <ExpandBtn setIsFullScreenSize={setIsFullScreenSize} isFullScreenSize={isFullScreenSize} />
      <Input filterCountries={filterCountries} placeholder="Country Enter" />
      <div className={isFullScreenSize ? 'country-list__fullscreen' : 'country-list'}>
        <Table striped hover size="sm" variant="dark">
          <tbody>
            {countries.map((el) => (
              <tr key={el.country} className={selectedCountry === el.country ? 'country_selected' : ''}>
                <td>
                  <img src={el.countryInfo.flag} alt={el.country} className="country__flag" />
                </td>
                <td className="country__cases">{el.cases}</td>
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
