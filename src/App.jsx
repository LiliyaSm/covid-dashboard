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
import CountryList from './components/CountryList/CountryList';

const App = () => {
  const { notify, addNotify } = useContext(NotifyContext);
  const [info, setInfo] = useState(null);
  const [infoWorld, setInfoWorld] = useState(null);
  const [currentCountry, setCurrentCountry] = useState(constants.WHOLE_WORLD_NAME);
  const [isLoading, setIsLoading] = useState(true);

  const getCovidInfo = async () => {
    const covidInfo = await requestService.getCovidInfo();
    // console.log(covidInfo);
    setInfo(covidInfo);
  };

  const getCovidInfoWorld = async () => {
    const covidInfoWorld = await requestService.getCovidInfoWorld();
    // console.log(covidInfo);
    setInfoWorld(covidInfoWorld);
  };

  const getAllData = async () => {
    try {
      await getCovidInfo();
      await getCovidInfoWorld();
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
    <DashboardTable responseData={info} responseDataWorld={infoWorld} currentCountry={currentCountry} />
  );

  return isLoading ? (
    <Loader />
  ) : (
    <Container fluid>
      {notify ? <Alerts /> : null}
      <Header />
      <Row>
        <Col>
          <CountryList countriesList={info} />
        </Col>
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
