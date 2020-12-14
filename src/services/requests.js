import axios from 'axios';

const urlCovid = 'https://corona.lmao.ninja/v2/countries';
const urlCovidWorld = 'https://disease.sh/v3/covid-19/all';

const getCovidInfo = async () => {
  const covidInfo = await axios.get(urlCovid);
  return covidInfo.data;
};

const getCovidInfoWorld = async () => {
  const covidInfoWorld = await axios.get(urlCovidWorld);
  return covidInfoWorld.data;
};

export default { getCovidInfo, getCovidInfoWorld };
