import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import i18n from 'i18next';
import axios from 'axios';
import classnames from 'classnames';

import { makeFullScreen } from '../utils';
import { useDispatch } from 'react-redux';
import { login as loginAction } from '../redux/auth';

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
    onSubmit: async (form) => {
      try {
        const result = await axios.post('/api/v1/login', { username: form.username, password: form.password });
        const { username, token } = result.data;
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        dispatch(loginAction({ token, username }));
        nav("/");
      } catch(e) {
        console.error(e)
        if (e.state < 500) {
          setError(i18n.t('failedLoginPassword'));
        } else {
          setError(i18n.t('networkErrorAfterAuth'));
        }
      }
    },
  });

  return (
    <form className="row g-2 needs-validation" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mt-4">
        {i18n.t('login')}
      </h1>
      <div className="form-group">
        <label className="form-label" htmlFor="username">
          {i18n.t('yourNick')}
        </label>
        <input
          autoComplete="off"
          autoFocus
          disabled={formik.isSubmitting}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="username"
          type="text"
          className={classnames('form-control', {'is-invalid': formik.touched.username && formik.errors.username})}
          value={formik.values.username}
        />
        {formik.touched.username && formik.errors.username && <div className="invalid-feedback">{formik.errors.username}</div>}
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="passowrd"> 
          {i18n.t('password')}
        </label>
        <input
          autoComplete="off"
          disabled={formik.isSubmitting}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="password"
          type="password"
          value={formik.values.password}
          className={classnames('form-control', {'is-invalid': formik.touched.password && formik.errors.password})}
        />
        {formik.touched.password && formik.errors.password && <div className="invalid-feedback" role="alert">{formik.errors.password}</div>}
      </div>
      <button title={i18n.t('login')} disabled={formik.isSubmitting} type="submit" className="w-100 mb-3 btn btn-outline-primary">
        {i18n.t('login')}
      </button>
      {error && <div class="alert alert-warning" role="alert">{error}</div>}
      <div className="d-flex flex-column align-items-center">
        <span className="small mb-2">
          {i18n.t('noAccount?')}
        </span>
        <Link to="/signup">
          {i18n.t('registration')}
        </Link>
      </div>
    </form>
  );
};

const Login = () => {
  const ref = useRef();
  useEffect(() => { if (ref.current) makeFullScreen(ref.current); });

  return <div className="py-2">
    <div ref={ref} className="d-flex flex-column justify-content-center align-items-center">
      <div className="col-sm-2"><LoginInner /></div>
    </div>
  </div>;
};

export default Login;