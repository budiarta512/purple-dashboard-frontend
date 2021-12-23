import React, { useEffect, useState } from 'react';
import api from './api';

const useAuth = ()=> {
  const [user, setUser] = useState([]);
  useEffect(() => {
    const ac = new AbortController();
    api().get('/api/user', { headers: { Authorization: 'Bearer' + localStorage.getItem('token')} })
      .then(res => {
        setUser(res.data);
        console.log(res.data.user)
      })
      .catch(error => {
        console.log(error);
      })
      return () => ac.abort();
  }, []);
  return {
    user: user
  }
}

export default useAuth;