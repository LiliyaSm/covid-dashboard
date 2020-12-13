import React, { useEffect, useState, useCallback, useMemo } from 'react';
import Table from 'react-bootstrap/Table';
import PropTypes from 'prop-types';
import ExpandBtn from '../ExpandBtn/ExpandBtn';
import Input from '../Input/Input';
import './CountryList.scss';

const CountryList = ({ countriesList }) => {
  const [isFullScreenSize, setIsFullScreenSize] = useState(false);
  const [countries, setCountries] = useState([]);

  const sortedCountries = useMemo(() => {
    const countriesSort = [...countriesList];
    countriesSort.sort((a, b) => b.population - a.population);
    return countriesSort;
  }, [countriesList]);

  useEffect(() => {
    setCountries(sortedCountries);
  }, [sortedCountries]);

  const filterCountries = useCallback((value) => {
    setCountries(sortedCountries.filter((country) => country.name.toLowerCase().includes(value.toLowerCase())));
  });

  return (
    <div className={isFullScreenSize ? 'dashboard-table full-container' : 'dashboard-table'}>
      <ExpandBtn setIsFullScreenSize={setIsFullScreenSize} isFullScreenSize={isFullScreenSize} />
      <Input filterCountries={filterCountries} />
      <div className="country-list">
        <Table striped bordered hover size="sm" variant="dark">
          <tbody>
            {countries.map((country) => (
              <tr key={country.name}>
                <td>{country.population}</td>
                <td>{country.name}</td>
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
