import '@reshuffle/code-transform/macro';
import React from 'react';
import { BrowserRouter as Switch, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import HtmlEditor from './components/HtmlEditor/HtmlEditor';
import AdminPanel from './components/AdminPanel/AdminPanel';
import SubscriptionList from './components/Subscriptions/SubscriptionList';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import './App.css';
import LoginNav from './components/LoginNav';

export default function App() {
  return (
    <>
      <Switch>
        {' '}
        {/* {<LoginNav />} */}
        <Route path='/' exact render={props => <HomePage {...props} />} />
        <PrivateRoute
          exact
          path='/editor'
          component={HtmlEditor}
          preview={false}
        />
        <PrivateRoute exact path='/dashboard' component={AdminPanel} />
        <PrivateRoute exact path='/subscription' component={SubscriptionList} />
      </Switch>
    </>
  );
}
