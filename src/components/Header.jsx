/* eslint-disable import/no-cycle */
import React from 'react';
import { Navbar, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import i18n from 'i18next';
import Login from './Login.jsx';

const LogoutButton = () => {
  const history = useHistory();

  if (Login.isThereJWT() === false) return null;
  return (
    <Navbar.Collapse className="justify-content-end">
      <Button onClick={() => Login.handleAuthError(history)} className="justify-content-end">
        {i18n.t('logout')}
      </Button>
    </Navbar.Collapse>
  );
};

const Header = () => (
  <Navbar bg="light">
    <Navbar.Brand>
      <Link to="/">Hexlet Chat</Link>
    </Navbar.Brand>
    <LogoutButton />
  </Navbar>
);
Header.displayName = 'Header';

export default Header;
