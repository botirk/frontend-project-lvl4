/* eslint-disable
no-param-reassign */
import { Navigate } from 'react-router-dom';
import { useIsLogin } from '../redux/auth';
import routes from '../routes';

export const ChatGuard = ({ children }) => {
  const isLogin = useIsLogin();

  if (!isLogin) return <Navigate to={routes.login} />;
  return children;
};

export const LoginGuard = ({ children }) => {
  const isLogin = useIsLogin();

  if (isLogin) return <Navigate to="/" />;
  return children;
};

export const SignupGuard = LoginGuard;
