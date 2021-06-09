import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Form, FormGroup, FormControl, FormLabel,
} from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import i18n from 'i18next';
import Login from './Login.jsx';
import Header from './Header.jsx';

// callbacks
const onSubmit = (history) => async (values, actions) => {
  try {
    const result = await axios.post('/api/v1/signup', values);
    // console.log(result);
    Login.setJWT(result.data);
    history.push('/');
  } catch (e) {
    const message = e.message.toLowerCase();
    if (message.includes('409') === true) {
      actions.setFieldError('username', i18n.t('nickTaken'));
      alert(i18n.t('nickTaken'));
    } else if (message.includes('network') === true) {
      actions.setFieldError('username', i18n.t('authNetoworkError'));
      actions.setFieldError('password', i18n.t('authNetoworkError'));
      alert(i18n.t('authNetoworkError'));
    } else {
      console.error(e);
      actions.setFieldError('username', i18n.t('wrongLoginPassword'));
      actions.setFieldError('password', i18n.t('wrongLoginPassword'));
      alert(i18n.t('wrongLoginPassword'));
    }
  }
};
// rendering
const SignupInner = () => {
  const history = useHistory();

  return (
    <Formik
      initialValues={{ username: '', password: '', password2: '' }}
      validationSchema={Yup.object({
        username: Yup.string().required(i18n.t('required')).min(3).max(20, i18n.t('from3SymbolsUpTo20Symbols')),
        password: Yup.string().required(i18n.t('required')).min(6, i18n.t('from6Symbols')),
        password2: Yup.string().required(i18n.t('required')).min(6, i18n.t('from6Symbols'))
          .oneOf([Yup.ref('password'), null], i18n.t('twoPasswordMustBeSame')),
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
          <h1 className="text-center mb-4">{i18n.t('registration')}</h1>
          <FormGroup controlId="username">
            <FormLabel>{i18n.t('newNick')}</FormLabel>
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
              ? <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
              : null}
          </FormGroup>
          <FormGroup controlId="password">
            <FormLabel>{i18n.t('createPassword')}</FormLabel>
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
          <FormGroup controlId="password2">
            <FormLabel>{i18n.t('repeatPassword')}</FormLabel>
            <FormControl
              disabled={isSubmitting}
              onChange={handleChange}
              onBlur={handleBlur}
              name="password2"
              type="password"
              value={values.password2}
              isValid={touched.password2 && !errors.password2}
              isInvalid={touched.password2 && errors.password2}
            />
            {(touched.password2 && errors.password2)
              ? <Form.Control.Feedback type="invalid">{errors.password2}</Form.Control.Feedback>
              : null}
          </FormGroup>
          <button disabled={isSubmitting} type="submit" className="w-100 mb-3 btn btn-outline-primary">
            {i18n.t('registrate')}
          </button>
        </Form>
      )}
    </Formik>
  );
};
export default () => (
  <>
    <Header />
    <div className="d-flex flex-column h-100">
      <div className="container-fluid">
        <div className="row justify-content-center pt-5">
          <div className="col-sm-4"><SignupInner /></div>
        </div>
      </div>
    </div>
  </>
);
