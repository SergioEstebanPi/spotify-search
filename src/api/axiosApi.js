import axios from 'axios';
import { BASEURL, BASIC, TIMEOUT } from '../constants/constants';

const instance = axios.create({
  baseURL: BASEURL,
  timeout: TIMEOUT,
  withCredentials: true, // Allow sending cookies with requests
});

instance.interceptors.request.use(function (config) {
  config.headers.Authorization = BASIC + 'dXNlcjpwYXNzd29yZA==';
  return config;
});

export default instance;
