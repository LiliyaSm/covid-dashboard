import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Table from "react-bootstrap/Table";
import TableForm from "./TableForm";
import * as constants from "../../data/constants";

const DashboardTable = ({ countriesList, responseData, isDataReady, country }) => {
  const [selectedPeriod, setSelectedPeriod] = useState(
    constants.PERIODS.wholePeriod
  );
  const [isFor100, setIsFor100] = useState(false);

  const getTotalPopulation = (currentCountry) => {
    let totalPopulation;
    if (currentCountry === "Whole world") {
      totalPopulation = countriesList.reduce(
        (acc, el) => el.population + acc,
        0
      );
    } else {
      totalPopulation = countriesList.find(
        (country) => country.name === currentCountry
      ).population;
    }
    return totalPopulation;
  };
  // console.log(totalPopulation);

  const countFor100 = (data, population) =>
    Math.round((data * 100000) / population);

  const getDataForPeriod = (period, data) => {
    const result = {};
    if (period === constants.PERIODS.wholePeriod) {
      result.confirmed = data.TotalConfirmed;
      result.deaths = data.TotalDeaths;
      result.recovered = data.TotalRecovered;
    } else {
      result.confirmed = data.NewConfirmed;
      result.deaths = data.NewDeaths;
      result.recovered = data.NewRecovered;
    }
    return result;
  };

  const updateError = () => {
    setConfirmed(constants.ERROR_MESSAGE);
    setDeaths(constants.ERROR_MESSAGE);
    setRecovered(constants.ERROR_MESSAGE);
  };

  const handleSelectedPeriod = (period) => {
    setSelectedPeriod(period);
  };

  const handleIsFor100 = () => {
    setIsFor100(!isFor100);
  };

  const getTableData = (country, data) => {
    if (country === "Whole world") {
      return data.Global;
    } else {
      let dataForCountry = data.Countries.find((el) => el.Country === country);
      return dataForCountry;
    }
  };

  const renderTableRows = () => {
    let data = getTableData(country, responseData);
    let periodData = getDataForPeriod(selectedPeriod, data);
    let totalPopulation = getTotalPopulation(country);
    if (isFor100) {
      periodData.confirmed = countFor100(periodData.confirmed, totalPopulation);
      periodData.deaths = countFor100(periodData.deaths, totalPopulation);
      periodData.recovered = countFor100(periodData.recovered, totalPopulation);
    }
    return(
      <tr>
        <td>{periodData.confirmed}</td>
        <td>{periodData.deaths}</td>
        <td>{periodData.recovered}</td>
      </tr>
    )
  }

  return (
    <div>
      <h1>
        info displayed for
        {country}
      </h1>
      <Table responsive>
        <thead>
          <tr>
            {constants.HEADINGS.map((heading) => (
              <th key={heading}>{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isDataReady ? (
            renderTableRows()
          ) : (
            <tr> Data is loading...</tr>
          )}
        </tbody>
      </Table>
      <TableForm
        handleSelectedPeriod={handleSelectedPeriod}
        handleIsFor100={handleIsFor100}
        selectedPeriod={selectedPeriod}
      />
    </div>
  );
};

DashboardTable.propTypes = {
  countriesList: PropTypes.arrayOf(PropTypes.object).isRequired,
  responseData: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default DashboardTable;
