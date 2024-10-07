import i18n from "i18next";
import { useDispatch } from 'react-redux';

import { logout, useIsLogin } from '../redux/auth';
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const isLogin = useIsLogin()
  const dispatch = useDispatch();
  const nav = useNavigate();

  return <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">Hexlet Chat</Link>
      {isLogin 
        ? <div onClick={() => dispatch(logout())} className="btn btn-primary">{i18n.t("logout")}</div> 
        : <div onClick={() => nav('/login')} className="btn btn-primary">{i18n.t("login")}</div>
      }
    </div>
  </nav>
}

export default Header;