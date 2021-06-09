import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Form, FormGroup, FormControl, FormLabel,
} from 'react-bootstrap';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import i18n from 'i18next';
import Header from './Header.jsx';

// callbacks
const onSubmit = (history) => async (values, actions) => {
  try {
    const result = await axios.post('/api/v1/login', values);
    // console.log(result);
    Login.setJWT(result.data);
    history.push('/');
  } catch (e) {
    // console.error(e);
    if (e.message.toLowerCase().includes('network') === true) {
      actions.setFieldError('username', i18n.t('networkErrorAfterAuth'));
      actions.setFieldError('password', i18n.t('networkErrorAfterAuth'));
      alert(i18n.t('networkErrorAfterAuth'));
    } else {
      actions.setFieldError('username', i18n.t('failedLoginPassword'));
      actions.setFieldError('password', i18n.t('failedLoginPassword'));
      alert(i18n.t('failedLoginPassword'));
    }
  }
};
// rendering
const LoginInner = () => {
  const history = useHistory();

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={Yup.object({
        username: Yup.string().required(i18n.t('required')),
        password: Yup.string().required(i18n.t('required')),
      })}
      onSubmit={onSubmit(history)}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <Form onSubmit={handleSubmit} className="p-3">
          <h1 className="text-center mb-4">
            {i18n.t('login')}
          </h1>
          <FormGroup>
            <FormLabel htmlFor="username">
              {i18n.t('yourNick')}
            </FormLabel>
            <FormControl
              autoFocus
              disabled={isSubmitting}
              onChange={handleChange}
              onBlur={handleBlur}
              name="username"
              type="text"
              value={values.username}
              isValid={touched.username && !errors.username}
              isInvalid={touched.username && errors.username}
            />
            {(touched.username && errors.username)
              ? (
                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
              )
              : null}
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="password">
              {i18n.t('password')}
            </FormLabel>
            <FormControl
              disabled={isSubmitting}
              onChange={handleChange}
              onBlur={handleBlur}
              name="password"
              type="password"
              value={values.password}
              isValid={touched.password && !errors.password}
              isInvalid={touched.password && errors.password}
            />
            {(touched.password && errors.password)
              ? <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
              : null}
          </FormGroup>
          <button disabled={isSubmitting} type="submit" className="w-100 mb-3 btn btn-outline-primary">
            {i18n.t('login')}
          </button>
          <div className="d-flex flex-column align-items-center">
            <span className="small mb-2">
              {i18n.t('noAccount?')}
            </span>
            <Link to="/signup">
              {i18n.t('registration')}
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
};
const Login = () => (
  <>
    <Header />
    <div className="d-flex flex-column h-100">
      <div className="container-fluid">
        <div className="row justify-content-center pt-5">
          <div className="col-sm-4"><LoginInner /></div>
        </div>
      </div>
    </div>
  </>
);
// login extra logic
Login.setJWT = (value) => {
  localStorage.setItem('JWT', JSON.stringify(value));
};
Login.getJWT = () => {
  const result = localStorage.getItem('JWT');
  if (result === null) throw new Error('no JWT');
  return JSON.parse(result);
};
Login.removeJWT = () => localStorage.removeItem('JWT');
Login.isThereJWT = () => localStorage.getItem('JWT') !== null;
// manage some errors
Login.isAuthError = (e) => {
  const message = e.message.toLowerCase();
  return (message.includes('401') === true || message.includes('jwt'));
};
Login.handleAuthError = (history) => {
  Login.removeJWT();
  history.push('/login');
};

export default Login;
