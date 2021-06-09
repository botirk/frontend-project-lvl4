/* eslint-disable no-param-reassign */
import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import i18n from 'i18next';
import socketAbstraction from '../../socketAbstraction.js';
import * as currentChannelIdActions from '../../slices/currentChannelId.js';

const onSubmitNewChannel = (e, channels, dispatch) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const name = formData.get('input').trim();
  if (name.length === 0 || name.length > 10) {
    if (alert) alert(i18n.t('channelNameShouldContainFrom1to10Symbols'));
    return true;
  }
  if (channels.allIds.find((id) => channels.byId[id].name === name) !== undefined) {
    if (alert) alert(`${name}: ${i18n.t('suchChannelAlreadyExists')}`);
    return true;
  }
  e.target.reset();
  dispatch(currentChannelIdActions.wait(name));
  socketAbstraction().newChannel(name);
  return false;
};

const ChannelAddModal = ({
  channels, isShown, setShown, channelNameInputRef,
}) => {
  const dispatch = useDispatch();

  return (
    <Modal show={isShown} onHide={() => setShown(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{i18n.t('addingChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Form onSubmit={(e) => setShown(onSubmitNewChannel(e, channels, dispatch))} style={{ width: '100%' }} inline>
          <Form.Control
            data-testid="add-channel"
            ref={channelNameInputRef}
            name="input"
            type="text"
            placeholder={i18n.t('nameOfChannel')}
            style={{ width: '20rem' }}
          />
        &nbsp;
          <Button variant="primary" type="submit">{i18n.t('addChannel')}</Button>
        </Form>
      </Modal.Footer>
    </Modal>
  );
};
const ChannelAddButton = ({ setShown, channelNameInputRef }) => {
  const onClick = () => {
    setShown(true);
    setTimeout(() => channelNameInputRef.current.focus(), 1);
  };

  const style = { display: 'flex' };
  const child = { flex: '1 1 auto' };
  return (
    <div style={style}>
      <Button style={child} variant="info" onClick={onClick}>
        +
      </Button>
    </div>
  );
};
export default ({ channels }) => {
  const [isShown, setShown] = useState(false);
  const channelNameInputRef = useRef();

  return (
    <>
      <ChannelAddButton setShown={setShown} channelNameInputRef={channelNameInputRef} />
      <ChannelAddModal
        channels={channels}
        isShown={isShown}
        setShown={setShown}
        channelNameInputRef={channelNameInputRef}
      />
    </>
  );
};
