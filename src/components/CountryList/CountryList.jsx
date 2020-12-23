import React, { useEffect, useState, useCallback, useMemo } from 'react';
import Table from 'react-bootstrap/Table';
import PropTypes from 'prop-types';
import ExpandBtn from '../ExpandBtn/ExpandBtn';
import Input from '../Input/Input';
import * as constants from '../../data/constants';
import { countFor100, getDataForPeriod } from '../../helpers/helpers';
import './CountryList.scss';
// import FilterCommon from '../FilterCommon/FilterCommon';

const CountryList = React.memo(
  ({ countriesList, countryCode, selectCountry, showingData, isFor100, isLastDay, population }) => {
    const [isFullScreenSize, setIsFullScreenSize] = useState(false);
    const [countries, setCountries] = useState([]);

    const currShowingDataForPeriod = useMemo(() => getDataForPeriod(isLastDay, showingData), [isLastDay, showingData]);

    const sortedCountries = useMemo(() => {
      const countriesSort = [...countriesList];
      countriesSort.sort((a, b) => b[currShowingDataForPeriod] - a[currShowingDataForPeriod]);
      return countriesSort;
    }, [countriesList, currShowingDataForPeriod]);

    useEffect(() => {
      if (isFor100) {
        setCountries(
          sortedCountries
            .map((el) => ({ ...el, for100Data: countFor100(el[currShowingDataForPeriod], el.population) }))
            .sort((a, b) => b.for100Data - a.for100Data),
        );
      } else {
        setCountries(sortedCountries);
      }
    }, [sortedCountries, isFor100]);

    const filterCountries = useCallback((value) => {
      setCountries(sortedCountries.filter((el) => el.country.toLowerCase().includes(value.toLowerCase())));
    });

    const onCountryClick = useCallback((el) => {
      if (countryCode === el.countryInfo.iso3) {
        selectCountry({ name: constants.WHOLE_WORLD_NAME, code: constants.WHOLE_WORLD_NAME, population });
      } else {
        selectCountry({ name: el.country, code: el.countryInfo.iso3, population: el.population });
      }
    });

    return (
      <div className={isFullScreenSize ? 'wrapper full-container' : 'wrapper'}>
        <ExpandBtn setIsFullScreenSize={setIsFullScreenSize} isFullScreenSize={isFullScreenSize} />
        {/* <FilterCommon /> */}
        <Input filterCountries={filterCountries} placeholder="Country Enter" />
        <div className={isFullScreenSize ? 'country-list__fullscreen' : 'country-list'}>
          <Table striped hover size="sm" variant="dark">
            <tbody>
              {countries.map((el) => (
                <tr
                  key={el.country}
                  onClick={() => onCountryClick(el)}
                  className={countryCode === el.countryInfo.iso3 ? 'country_selected' : ''}
                >
                  <td>
                    <img src={el.countryInfo.flag} alt={el.country} className="country__flag" />
                  </td>
                  <td className="country__cases">
                    {isFor100
                      ? el.for100Data?.toLocaleString('ru')
                      : el[currShowingDataForPeriod]?.toLocaleString('ru')}
                  </td>
                  <td className="country__name">{el.country}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  },
);

CountryList.propTypes = {
  countriesList: PropTypes.arrayOf(PropTypes.object).isRequired,
  countryCode: PropTypes.string.isRequired,
  selectCountry: PropTypes.func.isRequired,
  showingData: PropTypes.string.isRequired,
  isFor100: PropTypes.bool.isRequired,
  isLastDay: PropTypes.bool.isRequired,
  population: PropTypes.number.isRequired,
};

export default CountryList;
