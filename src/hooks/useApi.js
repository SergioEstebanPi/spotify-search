import { useState } from 'react';
import instance from '../api/axiosApi'

const useApi = (endpoint, method = 'GET', headers = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  instance.defaults.headers = headers;

  const fetchData = async (params = {}, body = null) => {
    setLoading(true);
    setError(null);

    try {
      const response = await instance({
        url: endpoint,
        method: method,
        params: method === 'GET' || method === 'POST' ? params : {},
        data: body,
      });
      setData(response.data);
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
};

export default useApi;
