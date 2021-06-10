/* eslint-disable no-param-reassign */
import React from 'react';
import * as Yup from 'yup';
import { Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import i18n from 'i18next';
import Login from '../Login.jsx';
import socketAbstraction from '../../socketAbstraction.js';

const onSubmit = (currentChannelId) => async (values, actions) => {
  const body = values.input.trim();
  const { username } = Login.getJWT();
  socketAbstraction().newMessage(username, body, currentChannelId);
  actions.resetForm();
};

const formStyle = {
  position: 'absolute', bottom: '1.25rem', left: '8,35%', width: '100%',
};
const controlStyle = { width: '80%' };
const buttonStyle = { width: '15%' };
export default ({ currentChannelId }) => (
  <Formik
    initialValues={{ input: '' }}
    validationSchema={Yup.object({
      input: Yup.string().required(i18n.t('required')),
    })}
    onSubmit={onSubmit(currentChannelId)}
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
      <Form onSubmit={handleSubmit} style={formStyle} inline>
        <Form.Control
          data-testid="new-message"
          autoFocus
          style={controlStyle}
          name="input"
          type="text"
          placeholder={i18n.t('message')}
          disabled={isSubmitting}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.input}
          isInvalid={touched.input && errors.input}
        />
        &nbsp;
        <Button disabled={isSubmitting} style={buttonStyle} variant="primary" type="submit">
          {i18n.t('send')}
        </Button>
        {(touched.input && errors.input)
          ? <Form.Control.Feedback type="invalid">{errors.input}</Form.Control.Feedback>
          : null}
      </Form>
    )}
  </Formik>
);
