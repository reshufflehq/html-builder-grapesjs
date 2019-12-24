import React from 'react';
import { Route } from 'react-router-dom';
import LoginNav from './LoginNav';

/**
 * Standard React-router route that requires authentication
 */
const PrivateRoute = ({
  props,
  component: Component,
  authenticated,
  profile,
  loading,
  getLoginURL,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={routeProps => {
        if (authenticated === undefined) {
          return null;
        }
        if (authenticated) {
          return (
            <>
              <LoginNav />
              <Component
                authenticated={authenticated}
                profile={profile}
                {...routeProps}
                {...props}
              />
            </>
          );
        } else {
          window.location = getLoginURL();
        }
      }}
    />
  );
};

export default PrivateRoute;
