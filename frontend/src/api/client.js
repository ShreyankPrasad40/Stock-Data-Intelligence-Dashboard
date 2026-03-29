import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const client = axios.create({
  baseURL: API_BASE_URL,
});

export const getCompanies = () => client.get('/companies');
export const getStockData = (symbol) => client.get(`/data/${symbol}`);
export const getSummary = (symbol) => client.get(`/summary/${symbol}`);
export const compareStocks = (symbol1, symbol2) => client.get(`/compare`, { params: { symbol1, symbol2 } });
export const getPrediction = (symbol) => client.get(`/predict/${symbol}`);

export default client;
