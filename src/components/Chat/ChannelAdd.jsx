import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import socketAbstraction from '../../socketAbstraction.js';
import * as currentChannelIdActions from '../../slices/currentChannelId.js';

const onSubmitNewChannel = (e, channels, dispatch) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const name = formData.get('input').trim();
  if (name.length === 0 || name.length > 10) {
    alert('Название канала должно содержать от 1 до 10 символов');
    return true;
  }
  if (channels.allIds.find((id) => channels.byId[id].name === name) !== undefined) {
    alert(`${name}: Такой канал уже существует`);
    return true;
  }
  e.target.reset();
  socketAbstraction().newChannel(name);
  dispatch(currentChannelIdActions.wait(name));
  return false;
}

const ChannelAddModal = ({ channels, isShown, setShown }) => {
  const dispatch = useDispatch();

  return <Modal show={isShown} onHide={() => setShown(false)}>
    <Modal.Header closeButton>
      <Modal.Title>Добавление канала</Modal.Title>
    </Modal.Header>
    <Modal.Footer>
      <Form onSubmit={(e) => setShown(onSubmitNewChannel(e, channels, dispatch)) } style={{ width: '100%'}} inline>
        <Form.Control ref={null} name="input" type="text" placeholder="Название канала" style={{ width: '20rem'}} />
        &nbsp;
        <Button variant="primary" type="submit">Добавить канал</Button>
      </Form>
    </Modal.Footer>
  </Modal>
}
const ChannelAddButton = ({ setShown }) => {
  const onClick = () => {
    setShown(true);
    //setTimeout(() => this.addChannelModalRef.current.focus(), 1);
  }

  const style = { display: "flex" };
  const child = { flex: '1 1 auto' };
  return (<div style={style}>
    <Button style={child}  variant="info" onClick={onClick}>
      +
    </Button>
  </div>)
}
export default ({ channels }) => {
  const [isShown, setShown] = useState(false);
  return <>
    <ChannelAddButton setShown={setShown} />
    <ChannelAddModal channels={channels} isShown={isShown} setShown={setShown}/>
  </>
}