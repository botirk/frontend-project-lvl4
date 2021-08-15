/* eslint-disable no-param-reassign */
import React from 'react';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import i18n from 'i18next';
import Login from '../Login.jsx';
import socketAbstraction from '../../socketAbstraction.js';

const onSubmit = (currentChannelId) => ({ input }, { resetForm }) => {
  const { username } = Login.getJWT();
  resetForm();
  socketAbstraction().newMessage(username, input, currentChannelId);
};

const Input = ({ className }) => {
  const currentChannelId = useSelector((state) => state.currentChannelId.id);
  const formik = useFormik({
    initialValues: { input: '' },
    validationSchema: Yup.object({
      input: Yup.string().required(i18n.t('required')),
    }),
    onSubmit: onSubmit(currentChannelId),
  });

  return (
    <Form onSubmit={formik.handleSubmit} className={className} inline>
      <Form.Control
        autoComplete="off"
        className="flex-grow-1"
        data-testid="new-message"
        autoFocus
        name="input"
        type="text"
        placeholder={i18n.t('message')}
        disabled={formik.isSubmitting}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.input}
        isInvalid={formik.touched.input && formik.errors.input}
      />
    &nbsp;
      <Button disabled={formik.isSubmitting} variant="primary" type="submit" className="btn-grow">
        {i18n.t('send')}
      </Button>
    </Form>
  );
};
Input.displayName = 'Input';
export default Input;
