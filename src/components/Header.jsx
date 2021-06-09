import React from 'react';
import { Navbar, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import i18n from 'i18next';
import Login from './Login.jsx';

const onLogoutClick = (history) => () => Login.handleAuthError(history);

const LogoutButton = ({ history }) => {
  if (Login.isThereJWT() === false) return null;
  return (
    <Navbar.Collapse className="justify-content-end">
      <Button onClick={onLogoutClick(history)} className="justify-content-end">
        {i18n.t('logout')}
      </Button>
    </Navbar.Collapse>
  );
};

export default () => {
  const history = useHistory();

  return (
    <Navbar bg="light">
      <Navbar.Brand>
        <Link to="/">Hexlet-Chat</Link>
      </Navbar.Brand>
      <LogoutButton history={history} />
    </Navbar>
  );
};
