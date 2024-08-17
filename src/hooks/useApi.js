import instance from '../api/axiosApi'
import { useDispatch } from 'react-redux';
import { fetchTrackFailure, fetchTrackRequest, fetchTrackSuccess } from '../features/Track/TrackSlice';

const useApi = (endpoint, method = 'GET', headers = {}) => {

  const dispatch = useDispatch();
  instance.defaults.headers = headers;

  const fetchData = async (params = {}, body = null) => {
    dispatch(fetchTrackRequest())
    try {
      const response = await instance({
        url: endpoint,
        method: method,
        params: method === 'GET' || method === 'POST' ? params : {},
        data: body,
      });
      console.log(response.data)
      dispatch(fetchTrackSuccess(response.data))
    } catch (err) {
      console.log(err)
      if(err && err.response){
        dispatch(fetchTrackFailure(err.response.data))
      }
    }
  };

  return { fetchData };
};

export default useApi;
