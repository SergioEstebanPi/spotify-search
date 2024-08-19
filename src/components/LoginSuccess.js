import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchForm from './SearchForm';
import { BASEURL } from '../constants/constants';

const LoginSuccess = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(BASEURL + 'api/user')
      .then(response => setUser(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
        <SearchForm />
    </div>
  );
};

export default LoginSuccess;
