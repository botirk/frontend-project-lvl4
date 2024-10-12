/* eslint-disable
no-param-reassign */
import i18n from 'i18next';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { logout, useIsLogin } from '../redux/auth';
import { useWindowBig } from '../utils';
import { toggleSidebar } from '../redux/chat';

const Header = () => {
  const isLogin = useIsLogin();
  const dispatch = useDispatch();
  const nav = useNavigate();
  const big = useWindowBig();

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <div className="d-flex gap-2">
          {!big && (
            <button type="button" aria-label="sidebar" className="btn" onClick={() => dispatch(toggleSidebar())}>
              <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" fill="currentColor" viewBox="0 0 16 16">
                <path d="M14 2a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zM2 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2z" />
                <path d="M3 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
              </svg>
            </button>
          )}
          <Link className="navbar-brand" to="/">Hexlet Chat</Link>
        </div>
        {isLogin
          ? <button type="button" onClick={() => dispatch(logout())} className="btn btn-primary">{i18n.t('logout')}</button>
          : <button type="button" onClick={() => nav('/login')} className="btn btn-primary">{i18n.t('login')}</button>}
      </div>
    </nav>
  );
};

export default Header;
