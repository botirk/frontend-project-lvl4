/* eslint-disable import/no-cycle, no-use-before-define */
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Form, FormGroup, FormLabel,
} from 'react-bootstrap';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import i18n from 'i18next';
import Header from './Header.jsx';
import LoginLogic from './LoginLogic.js';

// callbacks
const onSubmit = (history) => async (values, actions) => {
  try {
    const result = await axios.post('/api/v1/login', values);
    // console.log(result);
    Login.setJWT(result.data);
    history.push('/');
    // actions.resetForm();
  } catch (e) {
    // console.error(e);
    if (e.message.toLowerCase().includes('network') === true) actions.setFieldError('password', i18n.t('networkErrorAfterAuth'));
    else actions.setFieldError('password', i18n.t('failedLoginPassword'));
  }
};
// rendering
const LoginInner = ({ className }) => {
  const history = useHistory();
  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: Yup.object({
      username: Yup.string().required(i18n.t('required')),
      password: Yup.string().required(i18n.t('required')),
    }),
    onSubmit: onSubmit(history),
  });

  return (
    <Form onSubmit={formik.handleSubmit} className={className}>
      <h1 className="text-center mt-4">
        {i18n.t('login')}
      </h1>
      <FormGroup controlId="username">
        <FormLabel>
          {i18n.t('yourNick')}
        </FormLabel>
        <Form.Control
          autoComplete="off"
          autoFocus
          disabled={formik.isSubmitting}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="username"
          type="text"
          value={formik.values.username}
          isInvalid={formik.touched.username && formik.errors.username}
        />
        {(formik.touched.username && formik.errors.username)
          ? <Form.Control.Feedback type="invalid">{formik.errors.username}</Form.Control.Feedback>
          : null}
      </FormGroup>
      <FormGroup controlId="password">
        <FormLabel>
          {i18n.t('password')}
        </FormLabel>
        <Form.Control
          autoComplete="off"
          disabled={formik.isSubmitting}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="password"
          type="password"
          value={formik.values.password}
          isInvalid={formik.touched.password && formik.errors.password}
        />
        {(formik.touched.password && formik.errors.password)
          ? <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
          : null}
      </FormGroup>
      <button disabled={formik.isSubmitting} type="submit" className="w-100 mb-3 btn btn-outline-primary">
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
  );
};

const Login = () => (
  <div className="py-2">
    <Header />
    <div className="d-flex h-100 justify-content-center">
      <div className="col-sm-4"><LoginInner /></div>
    </div>
  </div>
);
Login.displayName = 'Login';

export default LoginLogic(Login);
