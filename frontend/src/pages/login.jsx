/* eslint-disable
no-param-reassign */
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import i18n from 'i18next';
import axios from 'axios';
import classnames from 'classnames';

import { useDispatch } from 'react-redux';
import { makeFullScreen } from '../utils';
import { login as loginAction } from '../redux/auth';
import routes from '../routes';

const LoginInner = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(undefined);

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: Yup.object({
      username: Yup.string().required(i18n.t('required')),
      password: Yup.string().required(i18n.t('required')),
    }),
    onSubmit: (form) => axios.post(
      routes.apiLogin,
      { username: form.username, password: form.password },
    ).then((result) => {
      dispatch(loginAction(result.data));
      nav(routes.index);
    }).catch((e) => {
      console.error(e);
      if (e.status < 500) {
        setError(i18n.t('failedLoginPassword'));
      } else {
        setError(i18n.t('networkErrorAfterAuth'));
      }
    }),
  });

  return (
    <form className="row g-2 needs-validation" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mt-4">
        {i18n.t('login')}
      </h1>
      <div className="form-floating">
        <input
          id="username"
          autoComplete="off"
          disabled={formik.isSubmitting}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="username"
          type="text"
          placeholder={i18n.t('yourNick')}
          className={classnames('form-control', { 'is-invalid': formik.touched.username && formik.errors.username })}
          value={formik.values.username}
        />
        <label htmlFor="username">
          {i18n.t('yourNick')}
        </label>
        {formik.touched.username && formik.errors.username && <div className="invalid-feedback">{formik.errors.username}</div>}
      </div>
      <div className="form-floating">
        <input
          autoComplete="off"
          disabled={formik.isSubmitting}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          id="password"
          name="password"
          type="password"
          placeholder={i18n.t('password')}
          value={formik.values.password}
          className={classnames('form-control', { 'is-invalid': formik.touched.password && formik.errors.password })}
        />
        <label htmlFor="password">
          {i18n.t('password')}
        </label>
        {formik.touched.password && formik.errors.password && <div className="invalid-feedback" role="alert">{formik.errors.password}</div>}
      </div>
      <button title={i18n.t('login')} disabled={formik.isSubmitting} type="submit" className="w-100 mb-3 btn btn-outline-primary">
        {i18n.t('login')}
      </button>
      {error && <div className="alert alert-warning" role="alert">{error}</div>}
      <div className="d-flex flex-column align-items-center">
        <span className="small mb-2">
          {i18n.t('noAccount?')}
        </span>
        <Link to={routes.signup}>
          {i18n.t('registration')}
        </Link>
      </div>
    </form>
  );
};

const Login = () => {
  const ref = useRef();
  useEffect(() => { if (ref.current) makeFullScreen(ref.current); });

  return (
    <div className="py-2">
      <div ref={ref} className="d-flex flex-column justify-content-center align-items-center">
        <div className="col-sm-2"><LoginInner /></div>
      </div>
    </div>
  );
};

export default Login;
