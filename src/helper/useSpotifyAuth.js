import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { useHistory } from 'react-router';

export default function useSpotifyAuth (code) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [ExpiresIn, setExpiresIn] = useState();
  const history = useHistory();
  
  useEffect(()=> {
    if(!code) return;
    api().post('/api/music', {code}, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
      .then(res => {
        console.log(res.data.data.scope);
        setAccessToken(res.data.data.access_token);
        setRefreshToken(res.data.data.refresh_token);
        setExpiresIn(res.data.data.expires_in);
        // window.history.pushState({}, null, '/music');
      })
      .catch(err => {
        console.log(err);
        history.push('/music');
      })
  }, [code]);

  useEffect(()=> {
    if(!refreshToken || !ExpiresIn) return;
    const interval = setInterval(()=> {
      api().post('/api/refresh', {refreshToken: refreshToken}, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
      .then(res => {
        console.log("data refresh token : " + res.data.data)
        setAccessToken(res.data.data.access_token);
        setExpiresIn(res.data.data.expires_in);
      })
      .catch(err => {
        console.log(err);
        history.push('/music');
      })
    }, (ExpiresIn - 60) * 1000)
    return ()=> clearInterval(interval);
  }, [refreshToken, ExpiresIn]);

  return accessToken;
}