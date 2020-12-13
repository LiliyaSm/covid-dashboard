import React, { useState, useEffect, useContext } from 'react';
import './App.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { NotifyContext } from './Providers/NotifyProvider';
import DashboardTable from './components/TableComponents/DashboardTable';
import InteractiveMap from './components/MapComponents/InteractiveMap';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import requestService from './services/requests';
import * as constants from './data/constants';
import Alerts from './components/Alerts/Alerts';
import Loader from './components/Loader/Loader';

const App = () => {
  const { notify, addNotify } = useContext(NotifyContext);
  const [info, setInfo] = useState(null);
  // Страну можно выбрать:

  // кликом по пункту списка(2)
  // кликом по интерактивной карте(3)
  // найти при помощи поиска (в списке?)

  // и она отображается в таблице(1)
  const [currentCountry, setCurrentCountry] = useState({
    name: constants.WHOLE_WORLD_NAME,
    alpha2Code: constants.WHOLE_WORLD_NAME,
  });
  const [countriesList, setCountriesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      addNotify(constants.NOTIFY_TYPES.error, constants.ERROR_HEADER, constants.ERROR_MESSAGE);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  const renderTable = () => (
    // TODO
    // если info нет, рендерить какую-нибудь заглушку или дефолтные данные
    <DashboardTable countriesList={countriesList} responseData={info} currentCountry={currentCountry} />
  );

  return isLoading ? (
    <Loader />
  ) : (
    <Container fluid>
      {notify ? <Alerts /> : null}
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
