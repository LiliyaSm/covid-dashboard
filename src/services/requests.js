import axios from 'axios';

const urlCovid = 'https://api.covid19api.com/summary';
const urlCountries = 'https://restcountries.eu/rest/v2/all?fields=name;population;flag;alpha2Code';

const getAllCounties = async () => {
  const response = await axios.get(urlCountries);
  return response.data;
};

const getCovidInfo = async () => {
  const covidInfo = await axios.get(urlCovid);
  return covidInfo.data;
};

export default { getCovidInfo, getAllCounties };
