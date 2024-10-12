/* eslint-disable
functional/no-expression-statement,
functional/no-conditional-statement,
no-param-reassign */
import i18next from 'i18next';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { toast } from 'react-toastify';
import { makeFullScreen } from '../utils';
import { login as loginAction } from '../redux/auth';

const SignupInner = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(undefined);
  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: Yup.object({
      username: Yup.string().required(i18next.t('required')).min(3, i18next.t('from3SymbolsUpTo20Symbols')).max(21, i18next.t('from3SymbolsUpTo20Symbols')),
      password1: Yup.string().required(i18next.t('required')).min(6, i18next.t('from6Symbols')),
      password2: Yup.string().required(i18next.t('required')).test('match', i18next.t('twoPasswordMustBeSame'), (value) => value === formik.values.password1),
    }),
    onSubmit: (form) => axios.post('/api/v1/signup', { username: form.username, password: form.password1 }).then((result) => {
      const { username, token } = result.data;
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      dispatch(loginAction({ token, username }));
      nav('/');
    }).catch((e) => {
      console.error(e);
      if (e.status === 409) {
        setError(i18next.t('nickTaken'));
      } else {
        setError(i18next.t('browserError'));
      }
    }),
  });

  return (
    <form className="row g-2 needs-validation" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mt-4">
        {i18next.t('registration')}
      </h1>
      <div className="form-floating">
        <input
          id="username"
          autoComplete="off"
          disabled={formik.isSubmitting}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="username"
          placeholder={i18next.t('newNick')}
          type="text"
          className={classNames('form-control', { 'is-invalid': formik.touched.username && formik.errors.username })}
          value={formik.values.username}
        />
        <label htmlFor="username">
          {i18next.t('newNick')}
        </label>
        {formik.touched.username && formik.errors.username && <div className="invalid-feedback">{formik.errors.username}</div>}
      </div>
      <div className="form-floating">
        <input
          id="password1"
          autoComplete="off"
          disabled={formik.isSubmitting}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="password1"
          type="password"
          placeholder={i18next.t('createPassword')}
          value={formik.values.password1}
          className={classNames('form-control', { 'is-invalid': formik.touched.password1 && formik.errors.password1 })}
        />
        <label htmlFor="password1">
          {i18next.t('createPassword')}
        </label>
        {formik.touched.password1 && formik.errors.password1 && <div className="invalid-feedback" role="alert">{formik.errors.password1}</div>}
      </div>
      <div className="form-floating">
        <input
          id="password2"
          autoComplete="off"
          disabled={formik.isSubmitting}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="password2"
          type="password"
          placeholder={i18next.t('repeatPassword')}
          value={formik.values.password2}
          className={classNames('form-control', { 'is-invalid': formik.touched.password2 && formik.errors.password2 })}
        />
        <label htmlFor="password2">
          {i18next.t('repeatPassword')}
        </label>
        {formik.touched.password2 && formik.errors.password2 && <div className="invalid-feedback" role="alert">{formik.errors.password2}</div>}
      </div>
      <button title={i18next.t('registration')} disabled={formik.isSubmitting} type="submit" className="w-100 my-3 btn btn-outline-primary">
        {i18next.t('registration')}
      </button>
      {error && <div className="alert alert-warning" role="alert">{error}</div>}
    </form>
  );
};

const Signup = () => {
  const ref = useRef();
  useEffect(() => { if (ref.current) makeFullScreen(ref.current); });

  return (
    <div ref={ref} className="d-flex flex-column justify-content-center align-items-center">
      <div className="col-sm-2"><SignupInner /></div>
    </div>
  );
};

export default Signup;
