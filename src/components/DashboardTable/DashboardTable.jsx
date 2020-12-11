import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';
import TableForm from './TableForm';
import * as constants from '../../data/constants';

const DashboardTable = ({ countriesList, responseData }) => {
  const [selectedPeriod, setSelectedPeriod] = useState(
    constants.PERIODS.wholePeriod,
  );
  const [isFor100, setIsFor100] = useState(false);
  const [confirmed, setConfirmed] = useState();
  const [deaths, setDeaths] = useState();
  const [recovered, setRecovered] = useState();
  const [tableData, setTableData] = useState({});

  const totalPopulation = countriesList.reduce(
    (acc, el) => el.population + acc,
    0,
  );
  // console.log(totalPopulation);

  const countFor100 = (data, population) => Math.round((data * 100000) / population);

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

  const updateForPeriod = (period, data) => {
    const periodData = getDataForPeriod(period, data);
    if (isFor100) {
      periodData.confirmed = countFor100(periodData.confirmed, totalPopulation);
      periodData.deaths = countFor100(periodData.deaths, totalPopulation);
      periodData.recovered = countFor100(periodData.recovered, totalPopulation);
    }
    setConfirmed(periodData.confirmed);
    setDeaths(periodData.deaths);
    setRecovered(periodData.recovered);
  };

  const updateError = () => {
    setConfirmed(constants.ERROR_MESSAGE);
    setDeaths(constants.ERROR_MESSAGE);
    setRecovered(constants.ERROR_MESSAGE);
  };

  const handleSelectedPeriod = (period) => {
    setSelectedPeriod(period);
  };

  const handleIsFor100 = () => {
    setIsFor100(!isFor100);
  };

  useEffect(() => {
    setTableData(responseData);
    // come with 200 status without data
    if (responseData.isNoData) {
      updateError();
    } else {
      updateForPeriod(selectedPeriod, responseData);
    }
  }, [selectedPeriod, isFor100]);

  return (
    <div>
      <h1>
        info displayed for
        {tableData.currentCountry}
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
          <tr>
            <td>{confirmed}</td>
            <td>{deaths}</td>
            <td>{recovered}</td>
          </tr>
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
};

export default DashboardTable;
