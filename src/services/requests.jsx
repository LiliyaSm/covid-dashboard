import axios from 'axios';
// import React from "react";

const urlCovid = 'https://api.covid19api.com/summary';
const urlCountries = 'https://restcountries.eu/rest/v2/all?fields=name;population;flag';

const getAllCounties = () => {
  const request = axios.get(urlCountries);
  return request.then((response) => response.data);
};

const getCovidInfo = () => {
  const request = axios.get(urlCovid);
  return request.then((response) => response.data);
};

export default { getCovidInfo, getAllCounties };
