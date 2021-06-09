/* eslint-disable no-param-reassign */
import React from 'react';
import { Form, Button } from 'react-bootstrap';
import i18n from 'i18next';
import Login from '../Login.jsx';
import socketAbstraction from '../../socketAbstraction.js';

const onSubmitNewMessage = (currentChannelId) => (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const body = formData.get('input').trim();
  if (body.length === 0) {
    if (alert) alert(i18n('cantSendEmptyMessages'));
    return;
  }
  e.target.reset(); // document.getElementsByName('input')[0].value = '';
  const { username } = Login.getJWT();
  socketAbstraction().newMessage(username, body, currentChannelId);
};

const formStyle = {
  position: 'absolute', bottom: '1.25rem', left: '8,35%', width: '100%',
};
const controlStyle = { width: '80%' };
const buttonStyle = { width: '15%' };
export default ({ currentChannelId }) => (
  <Form onSubmit={onSubmitNewMessage(currentChannelId)} style={formStyle} inline>
    <Form.Control
      data-testid="new-message"
      autoFocus
      style={controlStyle}
      name="input"
      type="text"
      placeholder="Сообщение"
    />
    &nbsp;
    <Button style={buttonStyle} variant="primary" type="submit">{i18n.t('send')}</Button>
  </Form>
);
