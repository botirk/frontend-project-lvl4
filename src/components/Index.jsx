import React from 'react';
import {
  Redirect,
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';
import Index from './Chat/Index';
import Login from './Login.jsx';
import Code404 from './Code404.jsx';
import Signup from './Signup.jsx';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route
        exact
        path="/"
        render={() => ((Login.isThereJWT() === false)
          ? <Redirect to="/login" />
          : <Index />)}
      />
      <Route path="/login"><Login /></Route>
      <Route path="/signup"><Signup /></Route>
      <Route path="/404"><Code404 /></Route>
      <Route path="*"><Redirect to="/404" /></Route>
    </Switch>
  </BrowserRouter>
);
App.displayName = 'App';
export default App;
