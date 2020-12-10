import React, { useState, useEffect } from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import DashboardTable from './components/DashboardTable/DashboardTable';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

const App = () => {
  const [countriesList, setCountriesList] = useState([]);

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all?fields=name;population;flag')
      .then((response) => {
        setCountriesList(response.data);
        console.log(response.data);
      });
  }, []);

  return (
    <Container fluid>
      <Header />

      <Row>
        <Col>List</Col>
        <Col>Map</Col>
        <Col>
          <Row>
            <DashboardTable countriesList={countriesList} />
          </Row>
          <Row>Chart</Row>
        </Col>
      </Row>

      <Footer />
    </Container>
  );
};

export default App;
