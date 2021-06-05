import React from 'react';
import { useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import Login from '../Login';

const onSubmitNewMessage = (props) => (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const body = formData.get('input').trim();
  if (body.length === 0) {
    alert('Нельзя отправлять пустые сообщения');
    return;
  }
  e.target.reset(); //document.getElementsByName('input')[0].value = '';
  const username = Login.getJWT().username;
  const channelId = useSelector((state) => state.currentChannelId.id);
  props.socket.newMessage(username, body, channelId);
}

const formStyle = {  position: 'absolute', bottom: '1rem', left: '8,35%', width: '100%' };
const controlStyle = {  width: '80%' };
const buttonStyle = {  width: '15%' };
const Input = (props) => {
  return <Form onSubmit={onSubmitNewMessage(props)} style={formStyle} inline>
    <Form.Control autoFocus={true} style={controlStyle} name="input" type="text" placeholder="Сообщение" />
    &nbsp;
    <Button style={buttonStyle} variant="primary" type="submit">Отправить</Button>
  </Form>
}

export default Input;