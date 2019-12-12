import '@reshuffle/code-transform/macro';
import React from 'react';
import { Route, Redirect, Link } from 'react-router-dom';
import { useAuth } from '@reshuffle/react-auth';

/**
 * Standard React-router route that requires a userToken
 */
const PrivateRoute = ({ props: Props, component: Component, ...rest }) => {
  const { authenticated, getLoginURL } = useAuth();
  return (
    <Route
      {...rest}
      render={routeProps => {
        if (authenticated) {
          return <Component {...routeProps} {...Props} />;
        } else {
          // if userToken is not found, show auth page
          return routeProps.history.push('/login');
        }
      }}
    />
  );
};

export default PrivateRoute;
