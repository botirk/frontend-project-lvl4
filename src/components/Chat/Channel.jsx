import React from 'react';
import { Button, Dropdown, ButtonGroup, Modal } from 'react-bootstrap';
import { useState } from 'react';
import socketAbstraction from '../../socketAbstraction.js';

const StaticChannel = ({ channel, currentChannelId }) => {
  const active = (channel.id === currentChannelId);
  // css related
  const variant = (active) ? "success" : "primary";
  const style = { display: "flex" };
  const child = { flex: '1 1 auto', whiteSpace: "nowrap" };
  return <div key={channel.id} style={style}>
    <Button key={channel.id} onClick={undefined /* todo */} variant={variant} style={child}>
      {channel.name}
    </Button>
  </div>
}

const RemovableChannelRemoveModal = ({ channel, isShown, setShown }) => {
  return (<>
    <Modal show={isShown} onHide={() => setShown(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>Уверены?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShown(false)}>
          Отменить
        </Button>
        <Button variant="danger" onClick={() => {
          socketAbstraction().removeChannel(channel.id);
          setShown(false);
        }}>
          Удалить
        </Button>
      </Modal.Footer>
    </Modal>
  </>);
}
const RemovableChannel = ({ channel, currentChannelId }) => {
  // state
  const [isShown, setShown] = useState(false);
  // boolean logic
  const active = (channel.id === currentChannelId);
  // css related
  const variant = (active) ? "success" : "primary";
  const style = { display: "flex" };
  const child = { flex: '1 1 auto', maxWidth: "80%", whiteSpace: "nowrap" };
  return (<Dropdown key={channel.id} as={ButtonGroup} style={style}>
    <Button onClick={undefined /* todo */} variant={variant} style={child}>
      {channel.name}
    </Button>
    <Dropdown.Toggle variant={variant} split />
    <Dropdown.Menu>
      <Dropdown.Item onClick={() => this.setState({ removeChannelModal: true })}>
        Удалить
      </Dropdown.Item>
      <RemovableChannelRemoveModal channel={channel} isShown={isShown} setShown={setShown} />
      <Dropdown.Item>Переименовать</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>)
}

export default ({ channel, currentChannelId }) => {
  if (channel.removable === true) 
    return <RemovableChannel channel={channel} currentChannelId={currentChannelId} />;
  else
    return <StaticChannel channel={channel} currentChannelId={currentChannelId} />;
}