import React, {createContext, useEffect, useState} from 'react';

export const UserContext = createContext();

export const UserProvider = (props)=> {
  const [user, setUser] = useState([]);
  // useEffect(()=> {
  //   api().get('/api/user', {headers: {Authorization: 'Bearer' + token}})
  //   .then(res => {
  //     setUser(res.data.user);
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   })
  // }, [token]);
  useEffect(()=> {
    setUser(JSON.parse(localStorage.getItem('user')));
  }, [])
  return (
    <UserContext.Provider value={user}>
      {props.children}
    </UserContext.Provider>
  )
}