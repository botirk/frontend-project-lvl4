import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import i18n from 'i18next';
import Header from './Header.jsx';
import SignupLogic from './SignupLogic.js';

// rendering
const SignupInner = () => {
  const history = useHistory();
  const formik = useFormik({
    initialValues: { username: '', password: '', password2: '' },
    validationSchema: Yup.object({
      username: Yup.string().required(i18n.t('required'))
        .min(3, i18n.t('from3SymbolsUpTo20Symbols')).max(20, i18n.t('from3SymbolsUpTo20Symbols')),
      password: Yup.string().required(i18n.t('required'))
        .min(6, i18n.t('from6Symbols')),
      password2: Yup.string().required(i18n.t('required'))
        .min(6, i18n.t('from6Symbols'))
        .oneOf([Yup.ref('password'), null], i18n.t('twoPasswordMustBeSame')),
    }),
    onSubmit: (values, actions) => SignupLogic(history, values, actions),
  });

  return (
    <Form onSubmit={formik.handleSubmit} className="p-3">
      <h1 className="text-center mb-4">{i18n.t('registration')}</h1>
      <Form.Group controlId="username">
        <Form.Label>{i18n.t('newNick')}</Form.Label>
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
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>{i18n.t('createPassword')}</Form.Label>
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
      </Form.Group>
      <Form.Group controlId="password2">
        <Form.Label>{i18n.t('repeatPassword')}</Form.Label>
        <Form.Control
          autoComplete="off"
          disabled={formik.isSubmitting}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="password2"
          type="password"
          value={formik.values.password2}
          isInvalid={formik.touched.password2 && formik.errors.password2}
        />
        {(formik.touched.password2 && formik.errors.password2)
          ? <Form.Control.Feedback type="invalid">{formik.errors.password2}</Form.Control.Feedback>
          : null}
      </Form.Group>
      <button disabled={formik.isSubmitting} type="submit" className="w-100 mb-3 btn btn-outline-primary">
        {i18n.t('registrate')}
      </button>
    </Form>
  );
};

const Signup = () => (
  <div className="py-2">
    <Header />
    <div className="d-flex h-100 justify-content-center">
      <div className="col-sm-4"><SignupInner /></div>
    </div>
  </div>
);
Signup.displayName = 'Signup';

export default Signup;
