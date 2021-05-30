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

const checkLogin = (option) => () => (Login.isThereJWT() === false) ? <Redirect to="/login" /> : option;

const App = () => {
  return <Router>
  <Switch>
    <Route exact path="/" render={checkLogin(<Index />)} />
    <Route path="/login"><Login /></Route>
    <Route path="/404" render={checkLogin(<Code404 />)} />
    <Route path="*">
      <Redirect to="/404" />
    </Route>
  </Switch>
  </Router>
};

export default App;