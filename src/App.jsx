import React, { useState, useEffect } from 'react';
import './App.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DashboardTable from './components/TableComponents/DashboardTable';
import InteractiveMap from './components/MapComponents/InteractiveMap';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import requestService from './services/requests';
import * as constants from './data/constants';

const App = () => {
  const [info, setInfo] = useState({ loadingEnded: false });
  // Страну можно выбрать:

  // кликом по пункту списка(2)
  // кликом по интерактивной карте(3)
  // найти при помощи поиска (в списке?)

  // и она отображается в таблице(1)
  const [currentCountry, setCurrentCountry] = useState(
    constants.WHOLE_WORLD_NAME,
  );
  const [countriesList, setCountriesList] = useState([]);

  const getAllCountriesInfo = () => {
    requestService.getAllCounties().then((contriesInfo) => {
      setCountriesList(contriesInfo);
    });
  };

  const getCovidInfo = () => {
    requestService.getCovidInfo().then((covidInfo) => {
      const isNoData = covidInfo.Message === constants.CACHING_DATA_MESSAGE;
      setInfo({ ...covidInfo, isNoData, loadingEnded: true });
    });
  };

  useEffect(() => {
    getCovidInfo();
    // получаем список всех стран, он нужен и в таблице(1), и в списке(2)..
    getAllCountriesInfo();
  }, []);

  const renderTable = () => (
    <DashboardTable
      countriesList={countriesList}
      responseData={info}
      currentCountry={currentCountry}
    />
  );

  return info.loadingEnded ? (
    <Container fluid>
      <Header />

      <Row>
        <Col>List</Col>
        <Col>
          <InteractiveMap setCurrentCountry={setCurrentCountry} />
        </Col>
        <Col>
          <Row>{renderTable()}</Row>
          <Row>Chart</Row>
        </Col>
      </Row>

      <Footer />
    </Container>
  ) : (
    <div>loading...</div>
  );
};

export default App;
