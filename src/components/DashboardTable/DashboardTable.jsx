import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import RadioBtns from './RadioBtns';

const DashboardTable = () => {
  const [wholePeriod, setIsWholePeriod] = useState(true);

  const [confirmed, setConfirmed] = useState();
  const [deaths, setDeaths] = useState();
  const [recovered, setRecovered] = useState();

  const headings = ['confirmed', 'deaths', 'recovered'];
  const errorMessage = 'Try later...';

  const updateWholePeriod = (response) => {
    setConfirmed(response.data.Global.TotalConfirmed);
    setDeaths(response.data.Global.TotalDeaths);
    setRecovered(response.data.Global.TotalRecovered);
  };

  const updateLastDay = (response) => {
    setConfirmed(response.data.Global.NewConfirmed);
    setDeaths(response.data.Global.NewDeaths);
    setRecovered(response.data.Global.NewRecovered);
  };

  const updateError = () => {
    setConfirmed(errorMessage);
    setDeaths(errorMessage);
    setRecovered(errorMessage);
  };

  const handleIsWholePeriod = () => {
    setIsWholePeriod(!wholePeriod);
  };

  useEffect(() => {
    axios.get('https://api.covid19api.com/summary').then((response) => {
      if (response.data.Message === 'Caching in progress') {
        updateError();
      }
      console.log(response);
      if (wholePeriod) {
        updateWholePeriod(response);
      } else {
        updateLastDay(response);
      }
    });
  }, [wholePeriod]);

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
        wholePeriod={wholePeriod}
        handleIsWholePeriod={handleIsWholePeriod}
      />
    </div>
  );
};

export default DashboardTable;
