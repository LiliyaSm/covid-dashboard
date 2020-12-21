import React, { useState, useEffect, useContext } from 'react';
import './App.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { NotifyContext } from './Providers/NotifyProvider';
import { CommonContext } from './Providers/CommonProvider';
import DashboardTable from './components/TableComponents/DashboardTable';
import InteractiveMap from './components/MapComponents/InteractiveMap';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import requestService from './services/requests';
import * as constants from './data/constants';
import Alerts from './components/Alerts/Alerts';
import Loader from './components/Loader/Loader';
import CountryList from './components/CountryList/CountryList';
import Charts from './components/Charts/Charts';
import FilterCommon from './components/FilterCommon/FilterCommon';

const App = () => {
  const { notify, addNotify } = useContext(NotifyContext);
  const { currentCountry, changePopulation } = useContext(CommonContext);
  const [info, setInfo] = useState(null);
  const [infoWorld, setInfoWorld] = useState(null);
  const [history, setHistory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getCovidInfo = async () => {
    const covidInfo = await requestService.getCovidInfo();
    setInfo(covidInfo);
  };

  const getCovidInfoWorld = async () => {
    const covidInfoWorld = await requestService.getCovidInfoWorld();
    setInfoWorld(covidInfoWorld);
    changePopulation(covidInfoWorld.population);
  };

  const getCovidHistory = async (country) => {
    const data = await requestService.getCovidHistory(country);
    const covidHistory = country === 'all' ? data : data.timeline;
    const arrayForChart = Object.entries(covidHistory).reduce((acc, item) => {
      Object.entries(item[1]).forEach((el) => {
        const obj = acc.find((i) => i.data === el[0]);
        if (obj) {
          [, obj[item[0]]] = el;
        } else {
          const day = {};
          [, day[item[0]]] = el;
          [day.data] = el;
          acc.push(day);
        }
      }, []);

      return acc;
    }, []);
    setHistory(arrayForChart);
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

  useEffect(async () => {
    try {
      const country = currentCountry.name === constants.WHOLE_WORLD_NAME ? 'all' : currentCountry.name;
      await getCovidHistory(country);
    } catch (exception) {
      addNotify(constants.NOTIFY_TYPES.error, constants.ERROR_HEADER, constants.ERROR_MESSAGE);
    }
  }, [currentCountry]);

  useEffect(() => {
    getAllData();
  }, []);

  const renderTable = () => <DashboardTable responseData={info} responseDataWorld={infoWorld} />;

  return isLoading ? (
    <Loader />
  ) : (
    <Container fluid className="main-wrapper">
      {notify ? <Alerts /> : null}
      <Header />
      <FilterCommon />
      <Row>
        <Col>
          <CountryList countriesList={info} />
        </Col>
        <Col>
          <InteractiveMap responseData={info} />
        </Col>
        <Col>
          <Row>{renderTable()}</Row>
          <Row>
            <Charts chartsList={history} />
          </Row>
        </Col>
      </Row>

      <Footer />
    </Container>
  );
};

export default App;
