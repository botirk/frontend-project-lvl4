import i18n from "i18next";
import { useDispatch, useSelector } from 'react-redux';

import { logout } from '../redux/auth';
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { username, token } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const nav = useNavigate();

  return <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <div class="navbar-brand">Hexlet Chat</div>
      {username && token 
        ? <div onClick={() => dispatch(logout())} class="btn btn-primary">{i18n.t("logout")}</div> 
        : <div onClick={() => nav('/login')} class="btn btn-primary">{i18n.t("login")}</div>
      }
    </div>
  </nav>
}

export default Header;