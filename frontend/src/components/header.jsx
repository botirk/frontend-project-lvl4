/* eslint-disable
functional/no-expression-statement,
functional/no-conditional-statement,
no-param-reassign */
import i18n from 'i18next';
import { useDispatch } from 'react-redux';

import { Link, useNavigate } from 'react-router-dom';
import { logout, useIsLogin } from '../redux/auth';

const Header = () => {
  const isLogin = useIsLogin();
  const dispatch = useDispatch();
  const nav = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Hexlet Chat</Link>
        {isLogin
          ? <button type="button" onClick={() => dispatch(logout())} className="btn btn-primary">{i18n.t('logout')}</button>
          : <button type="button" onClick={() => nav('/login')} className="btn btn-primary">{i18n.t('login')}</button>}
      </div>
    </nav>
  );
};

export default Header;
