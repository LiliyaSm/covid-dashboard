import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';
import RadioBtns from './RadioBtns';

const DashboardTable = ({ countriesList, responseData }) => {
  const [isWholePeriod, setIsWholePeriod] = useState(true);
  const [isFor100, setIsFor100] = useState(false);

  const [confirmed, setConfirmed] = useState();
  const [deaths, setDeaths] = useState();
  const [recovered, setRecovered] = useState();

  const [tableData, setTableData] = useState({});

  const headings = ['confirmed', 'deaths', 'recovered'];
  const errorMessage = 'Try later...';

  const totalPopulation = countriesList.reduce(
    (acc, el) => el.population + acc,
    0,
  );
  // console.log(totalPopulation);

  const countFor100 = (data, population) => Math.round((data * 100000) / population);

  const updateWholePeriod = (data) => {
    const newTotalConfirmed = isFor100
      ? countFor100(data.TotalConfirmed, totalPopulation)
      : data.TotalConfirmed;
    const newTotalDeaths = isFor100
      ? countFor100(data.TotalDeaths, totalPopulation)
      : data.TotalDeaths;
    const newTotalRecovered = isFor100
      ? countFor100(data.TotalRecovered, totalPopulation)
      : data.TotalRecovered;

    setConfirmed(newTotalConfirmed);
    setDeaths(newTotalDeaths);
    setRecovered(newTotalRecovered);
  };

  const updateLastDay = (data) => {
    const newConfirmed = isFor100
      ? countFor100(data.NewConfirmed, totalPopulation)
      : data.NewConfirmed;
    const newDeaths = isFor100
      ? countFor100(data.NewDeaths, totalPopulation)
      : data.NewDeaths;
    const newRecovered = isFor100
      ? countFor100(data.NewRecovered, totalPopulation)
      : data.NewRecovered;

    setConfirmed(newConfirmed);
    setDeaths(newDeaths);
    setRecovered(newRecovered);
  };

  const updateError = () => {
    setConfirmed(errorMessage);
    setDeaths(errorMessage);
    setRecovered(errorMessage);
  };

  const handleIsWholePeriod = () => {
    setIsWholePeriod(!isWholePeriod);
  };

  const handleIsFor100 = () => {
    setIsFor100(!isFor100);
    // console.log(isFor100);
  };

  useEffect(() => {
    setTableData(responseData);
    // come with 200 status without data
    if (responseData.isNoData) {
      updateError();
    }
    console.log(responseData);

    if (isWholePeriod) {
      updateWholePeriod(responseData);
    } else {
      updateLastDay(responseData);
    }
  }, [isWholePeriod, isFor100]);

  return (

    <div>
      <h1>
        info displayed for
        {tableData.currentCountry}
      </h1>
      <Table responsive>
        <thead>
          <tr>
            {headings.map((heading) => (
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
      <RadioBtns
        wholePeriod={isWholePeriod}
        handleIsWholePeriod={handleIsWholePeriod}
        handleIsFor100={handleIsFor100}
      />
    </div>
  );
};

DashboardTable.propTypes = {
  countriesList: PropTypes.arrayOf(PropTypes.object).isRequired,
  responseData: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default DashboardTable;
