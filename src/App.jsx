import React, { useState, useEffect } from "react";
import "./App.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DashboardTable from "./components/DashboardTable/DashboardTable";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import requestService from "./services/requests";

const App = () => {
  const [info, setInfo] = useState({ loadingEnded: false });
  // Страну можно выбрать:

  // кликом по пункту списка(2)
  // кликом по интерактивной карте(3)
  // найти при помощи поиска (в списке?)

  // и она отображается в таблице(1)
  const [currentCountry, setCurrentCountry] = useState("Whole world");
  const [tableData, setTableData] = useState("");
  const [isDataReady, setIsDataReady] = useState(false);
  const [countriesList, setCountriesList] = useState([]);

  const getAllCountriesInfo = () => {
    requestService.getAllCounties().then((contriesInfo) => {
      setCountriesList(contriesInfo);
    });
  };

  const getCovidInfo = () => {
    requestService.getCovidInfo().then((covidInfo) => {
      const isNoData = covidInfo.Message === "Caching in progress";
      setTableData({...covidInfo, isNoData});
      setIsDataReady(true);
      setInfo({ ...covidInfo, isNoData, loadingEnded: true });
      console.log({ currentCountry, ...covidInfo.Global });
    });
  };

  useEffect(() => {
    console.log("useEffect 1 time");
    getCovidInfo();
    // получаем список всех стран, он нужен и в таблице(1), и в списке(2)..
    getAllCountriesInfo();
  }, []);

  const findCountry = () => {
    const i = Math.floor(Math.random() * Math.floor(countriesList.length));
    setCurrentCountry(countriesList[i].name);
      console.log("findCountry");
  };

  return info.loadingEnded ? (
    <Container fluid>
      <Header />
      <button onClick={findCountry}> vkkfkfkf</button>

      <Row>
        <Col>List</Col>
        <Col>Map</Col>
        <Col>
          <Row>
            <DashboardTable
              countriesList={countriesList}
              responseData={tableData}
              isDataReady={isDataReady}
              country={currentCountry}
            />
          </Row>
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
