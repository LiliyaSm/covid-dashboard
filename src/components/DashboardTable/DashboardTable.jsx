import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import RadioBtns from './RadioBtns';

const DashboardTable = ({ countriesList }) => {
  const [isWholePeriod, setIsWholePeriod] = useState(true);
  const [isFor100, setIsFor100] = useState(false);

  const [confirmed, setConfirmed] = useState();
  const [deaths, setDeaths] = useState();
  const [recovered, setRecovered] = useState();

  const headings = ['confirmed', 'deaths', 'recovered'];
  const errorMessage = 'Try later...';

  const totalPopulation = countriesList.reduce(
    (acc, el) => el.population + acc,
    0,
  );
  // console.log(totalPopulation);

  const countFor100 = (data, population) => Math.round((data * 100000) / population);

  const updateWholePeriod = (response) => {
    const newTotalConfirmed = isFor100
      ? countFor100(response.data.Global.TotalConfirmed, totalPopulation)
      : response.data.Global.TotalConfirmed;
    const newTotalDeaths = isFor100
      ? countFor100(response.data.Global.TotalDeaths, totalPopulation)
      : response.data.Global.TotalDeaths;
    const newTotalRecovered = isFor100
      ? countFor100(response.data.Global.TotalRecovered, totalPopulation)
      : response.data.Global.TotalRecovered;

    setConfirmed(newTotalConfirmed);
    setDeaths(newTotalDeaths);
    setRecovered(newTotalRecovered);
  };

  const updateLastDay = (response) => {
    const newConfirmed = isFor100
      ? countFor100(response.data.Global.NewConfirmed, totalPopulation)
      : response.data.Global.NewConfirmed;
    const newDeaths = isFor100
      ? countFor100(response.data.Global.NewDeaths, totalPopulation)
      : response.data.Global.NewDeaths;
    const newRecovered = isFor100
      ? countFor100(response.data.Global.NewRecovered, totalPopulation)
      : response.data.Global.NewRecovered;

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
    console.log(isFor100);
  };

  useEffect(() => {
    axios.get('https://api.covid19api.com/summary').then((response) => {
      // come with 200 status without data
      const isNoData = response.data.Message === 'Caching in progress';
      if (isNoData) {
        updateError();
      }
      console.log(response);
      if (isWholePeriod) {
        updateWholePeriod(response);
      } else {
        updateLastDay(response);
      }
    });
  }, [isWholePeriod, isFor100]);

  return (
    <div>
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
};

export default DashboardTable;
