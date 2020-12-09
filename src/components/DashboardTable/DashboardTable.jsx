import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

const DashboardTable = () => {
  const [confirmed, setConfirmed] = useState('');
  const [deaths, setDeaths] = useState([]);
  const [recovered, setRecovered] = useState([]);

  const headings = ['confirmed', 'deaths', 'recovered'];

  useEffect(() => {
    axios.get('https://api.covid19api.com/world/total').then((response) => {
      setConfirmed(response.data.TotalConfirmed);
      setDeaths(response.data.TotalDeaths);
      setRecovered(response.data.TotalRecovered);
    });
  }, []);

  return (
    <Table table striped responsive>
      <thead>
        <tr>
          {headings.map((heading) => (
            <th>{heading}</th>
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
  );
};

export default DashboardTable;
