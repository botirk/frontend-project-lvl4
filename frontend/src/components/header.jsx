import i18n from "i18next";
import { useDispatch, useSelector } from 'react-redux';

import { logout, useIsLogin } from '../redux/auth';
import { useNavigate } from "react-router-dom";

const Header = () => {
  const isLogin = useIsLogin()
  const dispatch = useDispatch();
  const nav = useNavigate();

  return <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <div class="navbar-brand">Hexlet Chat</div>
      {isLogin 
        ? <div onClick={() => dispatch(logout())} class="btn btn-primary">{i18n.t("logout")}</div> 
        : <div onClick={() => nav('/login')} class="btn btn-primary">{i18n.t("login")}</div>
      }
    </div>
  </nav>
}

export default Header;