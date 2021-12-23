import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isLogin } from './auth';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if(isLogin()) {
          return <Component />;
        } else {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: {from: props.location}
              }}
            />
          )
        }
      }}
    />
  )
}

export default PrivateRoute;
