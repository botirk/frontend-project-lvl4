/* eslint-disable no-param-reassign */
export default (LoginComponent) => {
  LoginComponent.setJWT = (value) => {
    localStorage.setItem('JWT', JSON.stringify(value));
  };

  LoginComponent.getJWT = () => {
    const result = localStorage.getItem('JWT');
    if (result === null) throw new Error('no JWT');
    return JSON.parse(result);
  };

  LoginComponent.removeJWT = () => localStorage.removeItem('JWT');

  LoginComponent.isThereJWT = () => localStorage.getItem('JWT') !== null;

  // manage some errors
  LoginComponent.isAuthError = (e) => {
    const message = e.message.toLowerCase();
    return (message.includes('401') === true || message.includes('jwt'));
  };

  LoginComponent.handleAuthError = (history) => {
    LoginComponent.removeJWT();
    history.push('/login');
  };

  return LoginComponent;
};
