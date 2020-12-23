import React, { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ExpandBtn from '../ExpandBtn/ExpandBtn';
import * as constants from '../../data/constants';
import { countFor100, getDataForPeriodDashboard } from '../../helpers/helpers';
import './DashboardTable.scss';
import FilterForm from '../FilterCommon/FilterForm';

const DashboardTable = React.memo(
  ({
    responseData,
    responseDataWorld,
    currentCountry,
    isFor100,
    isLastDay,
    selectCountry,
    changeSelectedPeriod,
    changeIsFor100,
  }) => {
    const [isFullScreenSize, setIsFullScreenSize] = useState(false);

    const getTotalPopulation = useCallback(
      (country) => {
        let totalPopulation;
        if (country === constants.WHOLE_WORLD_NAME) {
          totalPopulation = responseDataWorld.population;
        } else {
          totalPopulation = responseData.find((el) => el.countryInfo.iso3 === country).population;
        }
        return totalPopulation;
      },
      [responseDataWorld, responseData],
    );

    const getTableData = useCallback(
      (country, data) => {
        if (country === constants.WHOLE_WORLD_NAME) {
          return responseDataWorld;
        }
        const dataForCountry = data.find((el) => el.countryInfo.iso3 === country);
        return dataForCountry;
      },
      [responseDataWorld],
    );

    const handleReset = useCallback(() => {
      selectCountry({
        name: constants.WHOLE_WORLD_NAME,
        code: constants.WHOLE_WORLD_NAME,
        population: responseDataWorld.population,
      });
      changeSelectedPeriod(false);
      changeIsFor100(false);
    });

    const renderTableRows = useMemo(() => {
      const data = getTableData(currentCountry.code, responseData);
      const periodData = getDataForPeriodDashboard(isLastDay, data);
      const totalPopulation = getTotalPopulation(currentCountry.code);
      if (isFor100) {
        periodData.confirmed = countFor100(periodData.confirmed, totalPopulation);
        periodData.deaths = countFor100(periodData.deaths, totalPopulation);
        periodData.recovered = countFor100(periodData.recovered, totalPopulation);
      }
      return (
        <tr>
          <td>{periodData.confirmed.toLocaleString('ru')}</td>
          <td>{periodData.deaths.toLocaleString('ru')}</td>
          <td>{periodData.recovered.toLocaleString('ru')}</td>
        </tr>
      );
    }, [currentCountry.code, responseData, isLastDay, isFor100]);

    return (
      <div className={isFullScreenSize ? 'dashboard-table full-container' : 'dashboard-table'}>
        <div className="table-wrapper">
          <ExpandBtn setIsFullScreenSize={setIsFullScreenSize} isFullScreenSize={isFullScreenSize} />
          <Button className ="reset-btn" variant="info" onClick={handleReset}>
            Reset filters
          </Button>
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
                renderTableRows
              ) : (
                <tr>
                  <td colSpan={constants.HEADINGS.length}>{constants.ERROR_MESSAGE}</td>
                </tr>
              )}
            </tbody>
          </Table>
          <FilterForm />
        </div>
      </div>
    );
  },
);

DashboardTable.propTypes = {
  responseData: PropTypes.arrayOf(PropTypes.object),
  responseDataWorld: PropTypes.objectOf(PropTypes.any),
  currentCountry: PropTypes.objectOf(PropTypes.any).isRequired,
  isFor100: PropTypes.bool.isRequired,
  isLastDay: PropTypes.bool.isRequired,
  selectCountry: PropTypes.func.isRequired,
  changeSelectedPeriod: PropTypes.func.isRequired,
  changeIsFor100: PropTypes.func.isRequired,
};

DashboardTable.defaultProps = {
  responseDataWorld: '',
  responseData: '',
};

export default DashboardTable;
