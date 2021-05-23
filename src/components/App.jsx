import React from 'react';
import {
  Redirect,
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Index from './Index.jsx';
import Login from './Login.jsx';
import Code404 from './Code404.jsx';

export default () => {
  return <Router>
  <Switch>
    <Route path="/login">
      <Login />
    </Route>
    <Route path="/">
      <Index />
    </Route>
    <Route path="/404">
      <Code404 />
    </Route>
    <Route path="*">
      <Redirect to="/404" />
    </Route>
  </Switch>
  </Router>;
};