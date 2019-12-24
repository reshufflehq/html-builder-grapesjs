import '@reshuffle/code-transform/macro';
import React from 'react';
import { BrowserRouter as Switch, Route } from 'react-router-dom';
import { useAuth } from '@reshuffle/react-auth';
import HomePage from './components/HomePage';
import HtmlEditor from './components/HtmlEditor';
import AdminPanel from './components/AdminPanel';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  const { loading, error, authenticated, profile, getLoginURL } = useAuth();

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
    loading,
    getLoginURL,
  };

  return (
    <Switch>
      <PrivateRoute path='/dashboard' component={AdminPanel} {...childProps} />
      <PrivateRoute path='/editor' component={HtmlEditor} {...childProps} />
      <Route path='/' exact component={HomePage} />
    </Switch>
  );
}
