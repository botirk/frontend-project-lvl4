import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { Container, Row, Col, ListGroup, Form, Button } from 'react-bootstrap';
import { io } from 'socket.io-client';

import Login from './Login';
import * as channelsActions from '../slices/channels.js';
import * as currentChannelIdActions from '../slices/currentChannelId.js';
import * as messagesActions from '../slices/messages.js';

const mapStateToProps = (state) => ({
  channels: state.channels,
  currentChannelId: state.currentChannelId,
  messages: state.messages,
});

class Index extends React.Component {
  initSocket() {
    try {
      //const JWT = Login.getJWT();
      //console.log(JWT);
      this.socket = io();
      this.socket.on('newMessage',
        (message) => this.props.dispatch(messagesActions.add(message)));
      this.socket.onAny((...args) => console.log('this.socket.onAny',args));
    } catch (e) {
      if (this.isAuthFail(e)) this.onAuthFail();
      else console.error(e);
    }
  }
  fillStoreWithFakes() {
    console.log('development: init fake messages');
    const dummyMessages = [
      {
        "body": "dummy message 1",
        "channelId": 1,
        "username": "dummy author 1",
        "id": 5**5
      },
      {
        "body": "Hello World!",
        "channelId": 1,
        "username": "JS",
        "id": 6**6
      }
    ];
    this.props.dispatch(messagesActions.init({messages: dummyMessages}));
  }
  async fetchAndFillStore() {
    //Login.removeJWT();
    try {
      const JWT = Login.getJWT();
      //console.log(JWT);
      const { data } = await axios.get('/api/v1/data', { headers: { 'Authorization': `bearer ${JWT.token}` }});
      //console.log(data);
      this.props.dispatch(currentChannelIdActions.set({currentChannelId: data.currentChannelId}));
      this.props.dispatch(messagesActions.init({messages: data.messages}));
      this.props.dispatch(channelsActions.init({channels: data.channels}));
      if (data.messages.length === 0 && process.env.NODE_ENV !== 'production')
        this.fillStoreWithFakes();
    } catch (e) {
      if (this.isAuthFail(e)) this.onAuthFail();
      else console.error(e);
    }
  }
  isAuthFail(error) {
    const message = error.message.toLowerCase();
    return (message.includes('jwt') === true || message.includes('401') === true);
  }
  async componentDidMount() {
    await this.fetchAndFillStore(); 
    this.initSocket();
  }
  // SOME CALLBACKS
  onAuthFail = () => {
    Login.removeJWT();
    this.props.dispatch(channelsActions.reset());
    this.props.dispatch(currentChannelIdActions.reset());
    this.props.dispatch(messagesActions.reset());
    alert('Пожалуйста авторизуйтесь');
    this.props.history.push('/login');
  }
  onChannelClick = (id) => (e) => {
    e.preventDefault();
    this.props.dispatch(currentChannelIdActions.set({currentChannelId: id}));
  }
  onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const body = formData.get('input').trim();
    if (body.length === 0) {
      alert('Нельзя отправлять пустые сообщения');
      return;
    }
    e.target.reset();
    //document.getElementsByName('input')[0].value = '';
    try {
      const username = Login.getJWT().username;
      const socketMessage = { body, channelId: this.props.currentChannelId, username };
      this.socket.emit('newMessage', socketMessage, (response) => {
        if (response.status !== 'ok')
          console.error(new Error(`Server acknowledge was not expected:  ${response.status}`));
      });
    } catch(e) {
      if (this.isAuthFail(e)) this.onAuthFail();
      else console.error(e);
    }
    
    // todo
  }
  // GUI
  renderChannel(channel) {
    const active = (channel.id === this.props.currentChannelId);
    if (active) 
      return <ListGroup.Item key={channel.id} active>{channel.name}</ListGroup.Item>
    
    const onClick = this.onChannelClick(channel.id);
    return <ListGroup.Item key={channel.id} onClick={onClick} action variant="light">{channel.name}</ListGroup.Item>
  }
  renderChannels(channels) {
    return <ListGroup>
      {channels.allIds.map((id) => this.renderChannel(channels.byId[id]))}
    </ListGroup>
  }
  renderInput() {
    const formStyle = {  position: 'absolute', bottom: '1rem', left: '8,35%', width: '100%' }
    const controlStyle = {  width: '80%' }
    const buttonStyle = {  width: '15%' }

    return <Form onSubmit={this.onSubmit} style={formStyle} inline>
      <Form.Control style={controlStyle} name="input" type="text" placeholder="Сообщение" />
      <Button style={buttonStyle} variant="primary" type="submit">Отправить</Button>
    </Form>
  }
  renderMessage(message) {
    return <ListGroup.Item key={message.id}><b>{message.username}</b>: {message.body}</ListGroup.Item>
  }
  renderMessages(messages) {
    if (messages.byChannelId[this.props.currentChannelId] === undefined) 
      return null;
    const style = { overflow: 'auto', height: '74vh' }
    return <ListGroup style={style}>
      {messages.byChannelId[this.props.currentChannelId].map((message) => this.renderMessage(message))}
    </ListGroup>
  }
  renderChat() {
    //console.log(this.props);
    return <>{this.renderMessages(this.props.messages)}{this.renderInput()}</>
  }
  render() {
    const style = { height: '100%', padding: '1rem' }
    return <Container style={style}>
      <Row style={style}>
        <Col sm={2}>
          {this.renderChannels(this.props.channels)}
        </Col>
        <Col sm={10}>
          {this.renderChat()}
        </Col>
      </Row>
    </Container>
  }
}

export default withRouter(connect(mapStateToProps)(Index));