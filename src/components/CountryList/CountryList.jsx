import React, { useEffect, useState, useCallback, useMemo, useContext } from 'react';
import Table from 'react-bootstrap/Table';
import PropTypes from 'prop-types';
import ExpandBtn from '../ExpandBtn/ExpandBtn';
import Input from '../Input/Input';
import DropdownDisplayOptions from '../DropdownDisplayOptions/DropdownDisplayOptions';
import * as constants from '../../data/constants';
import './CountryList.scss';
import Switcher from '../TableComponents/Switcher';
import { countFor100 } from '../../helpers/helpers';
import { CommonContext } from '../../Providers/CommonProvider';

const CountryList = ({ countriesList }) => {
  const { currentCountry, selectCountry, showingData, changeShowingData, isFor100, changeIsFor100 } = useContext(
    CommonContext,
  );
  const [isFullScreenSize, setIsFullScreenSize] = useState(false);
  const [countries, setCountries] = useState([]);

  const sortedCountries = useMemo(() => {
    const countriesSort = [...countriesList];
    countriesSort.sort((a, b) => b[showingData] - a[showingData]);
    return countriesSort;
  }, [countriesList, showingData]);

  useEffect(() => {
    if (isFor100) {
      setCountries(
        sortedCountries
          .map((el) => ({ ...el, for100Data: countFor100(el[showingData], el.population) }))
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
    changeIsFor100((prevValue) => !prevValue);
  });

  const onCountryClick = useCallback((el) => {
    if (currentCountry.code === el.countryInfo.iso3) {
      selectCountry({ name: null, code: null });
    } else {
      selectCountry({ name: el.country, code: el.countryInfo.iso3 });
    }
  });

  return (
    <div className={isFullScreenSize ? 'wrapper full-container' : 'wrapper'}>
      <ExpandBtn setIsFullScreenSize={setIsFullScreenSize} isFullScreenSize={isFullScreenSize} />
      <div className="country-list__header">
        <DropdownDisplayOptions
          setCurrShowingData={changeShowingData}
          options={constants.VARIANTS_FOR_DISPLAYING}
          selectedKey={showingData}
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
              <tr
                key={el.country}
                onClick={() => onCountryClick(el)}
                className={currentCountry.name === el.country ? 'country_selected' : ''}
              >
                <td>
                  <img src={el.countryInfo.flag} alt={el.country} className="country__flag" />
                </td>
                <td className="country__cases">
                  {isFor100 ? el.for100Data.toLocaleString('ru') : el[showingData].toLocaleString('ru')}
                </td>
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
