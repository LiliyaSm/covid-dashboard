import React from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DashboardTable from './components/DashboardTable';
import Footer from './components/Footer';
import Header from './components/Header';

function App() {
  return (
    <Container fluid>
      <Header />

      <Row>
        <Col>List</Col>
        <Col>Map</Col>
        <Col>
          <Row>
            <DashboardTable />
          </Row>
          <Row>Chart</Row>
        </Col>
      </Row>

      <Footer />
    </Container>
  );
}

export default App;
