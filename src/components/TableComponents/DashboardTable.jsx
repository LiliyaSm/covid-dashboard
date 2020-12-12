import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';
import TableForm from './TableForm';
// import ToggleBtn from '../ToggleBtn';
import * as constants from '../../data/constants';

const DashboardTable = ({ countriesList, responseData, currentCountry }) => {
  const [selectedPeriod, setSelectedPeriod] = useState(constants.PERIODS.wholePeriod);
  const [isFor100, setIsFor100] = useState(false);

  const getTotalPopulation = (country) => {
    let totalPopulation;
    if (country === constants.WHOLE_WORLD_NAME) {
      totalPopulation = countriesList.reduce((acc, el) => el.population + acc, 0);
    } else {
      totalPopulation = countriesList.find((el) => el.name === country).population;
    }
    return totalPopulation;
  };

  const countFor100 = (data, population) => Math.round((data * constants.PER_100_THOUSANDS) / population);

  const getDataForPeriod = (period, data) => {
    const result = {};
    if (period === constants.PERIODS.wholePeriod) {
      result.confirmed = data.TotalConfirmed;
      result.deaths = data.TotalDeaths;
      result.recovered = data.TotalRecovered;
    } else {
      result.confirmed = data.NewConfirmed;
      result.deaths = data.NewDeaths;
      result.recovered = data.NewRecovered;
    }
    return result;
  };

  const handleSelectedPeriod = (period) => {
    setSelectedPeriod(period);
  };

  const handleIsFor100 = () => {
    setIsFor100(!isFor100);
  };

  const getTableData = (country, data) => {
    if (country === constants.WHOLE_WORLD_NAME) {
      return data.Global;
    }
    const dataForCountry = data.Countries.find((el) => el.Country === country);
    return dataForCountry;
  };

  const renderTableRows = () => {
    const data = getTableData(currentCountry, responseData);
    const periodData = getDataForPeriod(selectedPeriod, data);
    const totalPopulation = getTotalPopulation(currentCountry);
    if (isFor100) {
      periodData.confirmed = countFor100(periodData.confirmed, totalPopulation);
      periodData.deaths = countFor100(periodData.deaths, totalPopulation);
      periodData.recovered = countFor100(periodData.recovered, totalPopulation);
    }
    return (
      <tr>
        <td>{periodData.confirmed}</td>
        <td>{periodData.deaths}</td>
        <td>{periodData.recovered}</td>
      </tr>
    );
  };

  return (
    <div className="dashboard-table">
      {/* <ToggleBtn /> */}
      <h1 className="table-header">
        Info displayed for:&nbsp;
        {currentCountry}
      </h1>
      <Table responsive>
        <thead>
          <tr>
            {constants.HEADINGS.map((heading) => (
              <th key={heading}>{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {responseData.isNoData ? (
            <tr>
              <td colSpan={constants.HEADINGS.length}>{constants.ERROR_MESSAGE}</td>
            </tr>
          ) : (
            renderTableRows()
          )}
        </tbody>
      </Table>
      <TableForm
        handleSelectedPeriod={handleSelectedPeriod}
        handleIsFor100={handleIsFor100}
        selectedPeriod={selectedPeriod}
      />
    </div>
  );
};

DashboardTable.propTypes = {
  countriesList: PropTypes.arrayOf(PropTypes.object).isRequired,
  responseData: PropTypes.objectOf(PropTypes.any).isRequired,
  currentCountry: PropTypes.string.isRequired,
};

export default DashboardTable;
