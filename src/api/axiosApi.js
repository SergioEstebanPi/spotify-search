import axios from 'axios';
import { BASEURL, BASIC, TIMEOUT } from '../constants/constants';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || BASEURL,
  timeout: TIMEOUT,
  withCredentials: true,
});

instance.interceptors.request.use(function (config) {
  config.headers.Authorization = BASIC + process.env.REACT_APP_AUTH_BASIC;
  return config;
});

export default instance;
