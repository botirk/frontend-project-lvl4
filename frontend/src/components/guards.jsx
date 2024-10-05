import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useIsLogin } from "../redux/auth";


export const ChatGuard = ({ children }) => {
  const isLogin = useIsLogin();

  if (!isLogin) return <Navigate to={"/login"} />;
  return children;
}

export const LoginGuard = ({ children }) => {
  const isLogin = useIsLogin();

  if (isLogin) return <Navigate to={"/"} />;
  return children;
}