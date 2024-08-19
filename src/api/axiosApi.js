import axios from 'axios';
import { BASEURL, BASIC, TIMEOUT } from '../constants/constants';

const instance = axios.create({
  baseURL: process.env.API_URL || BASEURL,
  timeout: TIMEOUT,
  withCredentials: true,
});

instance.interceptors.request.use(function (config) {
  config.headers.Authorization = BASIC + process.env.AUTH_BASIC;
  return config;
});

export default instance;
