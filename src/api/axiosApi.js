import axios from 'axios';
import { BASEURL, BASIC, TIMEOUT } from '../constants/constants';

const instance = axios.create({
  baseURL: BASEURL,
  timeout: TIMEOUT,
});

instance.interceptors.request.use(function (config) {
  config.headers.Authorization = BASIC + '';
  return config;
});

export default instance;
