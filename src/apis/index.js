import axios from 'axios';

const server = axios.create({
  baseURL: process.env.REACT_APP_BASENAME,
  'Content-Type': 'application/json',
});

export const getServer = () => server;
