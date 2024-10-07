import i18next from "i18next";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import i18n from 'i18next';
import classNames from "classnames";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import axios from 'axios';

import { makeFullScreen } from "../utils";
import { login as loginAction } from '../redux/auth';
import { toast } from "react-toastify";



const SignupInner = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: Yup.object({
      username: Yup.string().required(i18n.t('required')).min(3, i18next.t('from3SymbolsUpTo20Symbols')).max(21, i18next.t('from3SymbolsUpTo20Symbols')),
      password1: Yup.string().required(i18n.t('required')).min(6, i18next.t('from6Symbols')),
      password2: Yup.string().required(i18n.t('required')).min(6, i18next.t('from6Symbols')).test('match', i18next.t('twoPasswordMustBeSame'), value => value === formik.values.password1),
    }),
    onSubmit: async (form) => {
      try {
        const result = await axios.post('/api/v1/signup', { username: form.username, password: form.password1 });
        const { username, token } = result.data;
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        dispatch(loginAction({ token, username }));
        nav("/");
      } catch(e) {
        console.error(e)
        if (e.status === 409) {
          toast(i18n.t('nickTaken'));
          setError(i18n.t('nickTaken'));
        } else {
          toast(i18n.t('browserError'));
          setError(i18n.t('browserError'));
        }
      }
    },
  });
  const [error, setError] = useState(undefined);

  return (
    <form className="row g-2 needs-validation" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mt-4">
        {i18n.t('registration')}
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
          className={classNames('form-control', {'is-invalid': formik.touched.username && formik.errors.username})}
          value={formik.values.username}
        />
        {formik.touched.username && formik.errors.username && <div className="invalid-feedback">{formik.errors.username}</div>}
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="password1"> 
          {i18n.t('createPassword')}
        </label>
        <input
          autoComplete="off"
          disabled={formik.isSubmitting}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="password1"
          type="password"
          value={formik.values.password1}
          className={classNames('form-control', {'is-invalid': formik.touched.password1 && formik.errors.password1})}
        />
        {formik.touched.password1 && formik.errors.password1 && <div className="invalid-feedback" role="alert">{formik.errors.password1}</div>}
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="password2">
          {i18n.t('repeatPassword')}
        </label>
        <input
          autoComplete="off"
          disabled={formik.isSubmitting}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="password2"
          type="password"
          value={formik.values.password2}
          className={classNames('form-control', {'is-invalid': formik.touched.password2 && formik.errors.password2})}
        />
        {formik.touched.password2 && formik.errors.password2 && <div className="invalid-feedback" role="alert">{formik.errors.password2}</div>}
      </div>
      <button title={i18n.t('registration')} disabled={formik.isSubmitting} type="submit" className="w-100 my-3 btn btn-outline-primary">
        {i18n.t('registration')}
      </button>
      {error && <div class="alert alert-warning" role="alert">{error}</div>}
    </form>
  );
}

const Signup = () => {
  const ref = useRef();
  useEffect(() => { if (ref.current) makeFullScreen(ref.current); });

  return <div ref={ref} className="d-flex flex-column justify-content-center align-items-center">
    <div className="col-sm-2"><SignupInner /></div>
  </div>
}

export default Signup;