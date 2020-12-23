import React, { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';
import { useTranslation } from 'react-i18next';
import ExpandBtn from '../ExpandBtn/ExpandBtn';
import { countFor100, getDataForPeriodDashboard } from '../../helpers/helpers';
import './DashboardTable.scss';

const DashboardTable = React.memo(({ responseData, responseDataWorld, currentCountry, isFor100, isLastDay }) => {
  const { t } = useTranslation();
  const [isFullScreenSize, setIsFullScreenSize] = useState(false);

  const getTotalPopulation = useCallback(
    (country) => {
      if (country) {
        return responseData.find((el) => el.countryInfo.iso3 === country).population;
      }
      return responseDataWorld.population;
    },
    [responseDataWorld, responseData],
  );

  const getTableData = useCallback(
    (country, data) => {
      if (country) {
        return data.find((el) => el.countryInfo.iso3 === country);
      }
      return responseDataWorld;
    },
    [responseDataWorld],
  );

  const HEADINGS = useMemo(() => [t('heading.confirmed'), t('heading.deaths'), t('heading.recovered')], [t]);

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
        <h1 className="table-header">
          {t('dashboardTable')}
          &nbsp;
          {currentCountry.name ?? t('whole-world-name')}
        </h1>
        <Table>
          <thead>
            <tr>
              {HEADINGS.map((heading) => (
                <th key={heading}>{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {responseData ? (
              renderTableRows
            ) : (
              <tr>
                <td colSpan={HEADINGS.length}>{t('error.error-message')}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
});

DashboardTable.propTypes = {
  responseData: PropTypes.arrayOf(PropTypes.object),
  responseDataWorld: PropTypes.objectOf(PropTypes.any),
  currentCountry: PropTypes.objectOf(PropTypes.any).isRequired,
  isFor100: PropTypes.bool.isRequired,
  isLastDay: PropTypes.bool.isRequired,
};

DashboardTable.defaultProps = {
  responseDataWorld: '',
  responseData: '',
};

export default DashboardTable;
