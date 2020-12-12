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
import Loader from './components/Loader/Loader';

const App = () => {
  const [info, setInfo] = useState();
  // Страну можно выбрать:

  // кликом по пункту списка(2)
  // кликом по интерактивной карте(3)
  // найти при помощи поиска (в списке?)

  // и она отображается в таблице(1)
  const [currentCountry, setCurrentCountry] = useState(
    constants.WHOLE_WORLD_NAME,
  );
  const [countriesList, setCountriesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const getAllCountriesInfo = async () => {
    const contriesInfo = await requestService.getAllCounties();
    setCountriesList(contriesInfo);
  };

  const getCovidInfo = async () => {
    const covidInfo = await requestService.getCovidInfo();
    const isNoData = covidInfo.Message === constants.CACHING_DATA_MESSAGE;
    setInfo({ ...covidInfo, isNoData });
  };

  const getAllData = async () => {
    try {
      await getCovidInfo();
      await getAllCountriesInfo();
    } catch (exception) {
      setIsError(true);
      // TODO
      //рендер компонента ошибки  
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  const renderTable = () => (
    <DashboardTable
      countriesList={countriesList}
      responseData={info}
      currentCountry={currentCountry}
    />
  );

  return isLoading ? (
    <Loader />
  ) : (
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
  );
};

export default App;
