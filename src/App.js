import '@reshuffle/code-transform/macro';
import React from 'react';
import { BrowserRouter as Switch, Route } from 'react-router-dom';
import { useAuth } from '@reshuffle/react-auth';
import HomePage from './components/HomePage';
import HtmlEditor from './components/HtmlEditor';
import AdminPanel from './components/AdminPanel';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  const { loading, error, authenticated, profile } = useAuth();

  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    return (
      <div>
        <h1>{error.toString()}</h1>
      </div>
    );
  }
  const childProps = {
    authenticated,
    profile,
  };

  return (
    <Switch>
      <Route
        path='/dashboard'
        render={props => (
          <PrivateRoute component={AdminPanel} {...childProps} {...props} />
        )}
      />
      <Route
        path='/editor'
        render={props => (
          <PrivateRoute component={HtmlEditor} {...childProps} {...props} />
        )}
      />
      <Route path='/' exact component={HomePage} />
    </Switch>
  );
}
