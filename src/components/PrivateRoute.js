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
  ...rest
}) => {
  return (
    <>
      <LoginNav />
      <Route
        {...rest}
        render={routeProps => {
          if (authenticated) {
            return (
              <Component
                authenticated={authenticated}
                profile={profile}
                {...routeProps}
                {...props}
              />
            );
          } else {
            return (
              <div className='jumbotron' style={{ textAlign: 'center' }}>
                <h1 className='display-4'>
                  Please login to access for edit the site
                </h1>
              </div>
            );
          }
        }}
      />
    </>
  );
};

export default PrivateRoute;
