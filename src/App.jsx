import React, { useState, useEffect, useContext, useMemo } from 'react';
import './App.scss';
import { Container, Row, Col } from 'react-bootstrap';
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
import GeojsonView from './components/MapComponents/GeojsonView';
import RenderOverlay from './components/MapComponents/RenderOverlay';

const App = () => {
  const { notify, addNotify } = useContext(NotifyContext);
  const {
    currentCountry,
    changePopulation,
    showingData,
    selectCountry,
    isFor100,
    selectedPeriod,
    population,
  } = useContext(CommonContext);
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

  const renderTable = useMemo(
    () => (
      <DashboardTable
        responseData={info}
        responseDataWorld={infoWorld}
        currentCountry={currentCountry}
        isFor100={isFor100}
        selectedPeriod={selectedPeriod}
      />
    ),
    [info, infoWorld, currentCountry, isFor100, selectedPeriod],
  );

  const renderGeoJsonView = useMemo(
    () => (
      <GeojsonView
        currShowingData={showingData}
        responseData={info ?? []}
        selectCountry={selectCountry}
        isFor100={isFor100}
        selectedPeriod={selectedPeriod}
      />
    ),
    [showingData, info, selectCountry, isFor100, selectedPeriod],
  );

  const renderOverlay = useMemo(
    () => (
      <RenderOverlay
        responseData={info ?? []}
        showingData={showingData}
        selectCountry={selectCountry}
        isFor100={isFor100}
        selectedPeriod={selectedPeriod}
      />
    ),
    [showingData, info, selectCountry, isFor100, selectedPeriod],
  );

  return isLoading ? (
    <Loader />
  ) : (
    <Container fluid className="main-wrapper">
      {notify ? <Alerts /> : null}
      <Header />
      <FilterCommon />
      <Row>
        <Col>
          <CountryList
            countriesList={info}
            countryCode={currentCountry.code}
            selectCountry={selectCountry}
            showingData={showingData}
            isFor100={isFor100}
            selectedPeriod={selectedPeriod}
            population={population}
          />
        </Col>
        <Col>
          <InteractiveMap
            responseData={info ?? []}
            countryCode={currentCountry.code}
            GeojsonView={renderGeoJsonView}
            renderOverlay={renderOverlay}
          />
        </Col>
        <Col>
          <Row>{renderTable}</Row>
          <Row>
            <Charts
              chartsList={history}
              countryName={currentCountry.name}
              isFor100={isFor100}
              population={population}
              countryPopulation={currentCountry.population}
            />
          </Row>
        </Col>
      </Row>

      <Footer />
    </Container>
  );
};

export default App;
