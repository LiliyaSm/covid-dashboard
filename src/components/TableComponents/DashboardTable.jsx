import React, { useState, useContext } from 'react';
import './DashboardTable.scss';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';
import TableForm from './TableForm';
import ExpandBtn from '../ExpandBtn/ExpandBtn';
import * as constants from '../../data/constants';
import { countFor100 } from '../../helpers/helpers';
import { CommonContext } from '../../Providers/CommonProvider';

const DashboardTable = ({ responseData, responseDataWorld }) => {
  const [selectedPeriod, setSelectedPeriod] = useState(constants.PERIODS.wholePeriod);
  const [isFullScreenSize, setIsFullScreenSize] = useState(false);

  const { currentCountry, isFor100 } = useContext(CommonContext);

  const getTotalPopulation = (country) => {
    let totalPopulation;
    if (country === constants.WHOLE_WORLD_NAME) {
      totalPopulation = responseDataWorld.population;
    } else {
      totalPopulation = responseData.find((el) => el.countryInfo.iso3 === country).population;
    }
    return totalPopulation;
  };

  const getDataForPeriod = (period, data) => {
    const result = {};
    if (period === constants.PERIODS.wholePeriod) {
      result.confirmed = data.cases;
      result.deaths = data.deaths;
      result.recovered = data.recovered;
    } else {
      result.confirmed = data.todayCases;
      result.deaths = data.todayDeaths;
      result.recovered = data.todayRecovered;
    }
    return result;
  };

  const handleSelectedPeriod = (period) => {
    setSelectedPeriod(period);
  };

  const getTableData = (country, data) => {
    if (country === constants.WHOLE_WORLD_NAME) {
      return responseDataWorld;
    }
    const dataForCountry = data.find((el) => el.countryInfo.iso3 === country);
    return dataForCountry;
  };

  const renderTableRows = () => {
    const data = getTableData(currentCountry.code, responseData);
    const periodData = getDataForPeriod(selectedPeriod, data);
    const totalPopulation = getTotalPopulation(currentCountry.code);
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
    <div className={isFullScreenSize ? 'dashboard-table full-container' : 'dashboard-table'}>
      <ExpandBtn setIsFullScreenSize={setIsFullScreenSize} isFullScreenSize={isFullScreenSize} />
      <h1 className="table-header">
        Info displayed for:&nbsp;
        {currentCountry.name}
      </h1>
      <Table>
        <thead>
          <tr>
            {constants.HEADINGS.map((heading) => (
              <th key={heading}>{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {responseData ? (
            renderTableRows()
          ) : (
            <tr>
              <td colSpan={constants.HEADINGS.length}>{constants.ERROR_MESSAGE}</td>
            </tr>
          )}
        </tbody>
      </Table>
      <TableForm
        handleSelectedPeriod={handleSelectedPeriod}
        selectedPeriod={selectedPeriod}
      />
    </div>
  );
};

DashboardTable.propTypes = {
  responseData: PropTypes.arrayOf(PropTypes.object),
  responseDataWorld: PropTypes.objectOf(PropTypes.any),
};

DashboardTable.defaultProps = {
  responseDataWorld: '',
  responseData: '',
};

export default DashboardTable;
