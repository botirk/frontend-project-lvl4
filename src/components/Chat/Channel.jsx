import React, { useRef, useState } from 'react';
import {
  Button, Dropdown, ButtonGroup, Modal, Form,
} from 'react-bootstrap';

import { useSelector } from 'react-redux';
import i18n from 'i18next';
import socketAbstraction from '../../socketAbstraction.js';
import * as currentChannelIdActions from '../../slices/currentChannelId.js';

// callback logic
const onChannelRename = (e, channel, channels) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const name = formData.get('input').trim();
  if (name.length === 0 || name.length > 10) {
    if (alert) alert(i18n.t('channelNameShouldContainFrom1to10Symbols'));
    return true;
  }
  if (channels.allIds.find((id) => channels.byId[id].name === name) !== undefined) {
    alert(`${name}: ${i18n.t('suchChannelAlreadyExists')}`);
    return true;
  }
  e.target.reset();
  socketAbstraction().renameChannel(name, channel.id);
  return false;
};
const onChannelClick = (dispatch, id, active) => (e) => {
  e.preventDefault();
  if (active === false) dispatch(currentChannelIdActions.set(id));
};
// render logic
const RemovableChannelRenameModal = ({
  channel, isShown, setShown, channelRenameInputRef,
}) => {
  const channels = useSelector((state) => state.channels);

  return (
    <Modal show={isShown} onHide={() => setShown(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{i18n.t('renamingChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Form onSubmit={(e) => setShown(onChannelRename(e, channel, channels))} style={{ width: '100%' }} inline>
          <Form.Control
            data-testid="rename-channel"
            ref={channelRenameInputRef}
            defaultValue={channel.name}
            name="input"
            type="text"
            placeholder={i18n.t('nameOfChannel')}
            style={{ width: '15rem' }}
          />
        &nbsp;
          <Button variant="primary" type="submit">{i18n.t('renameChannel')}</Button>
        </Form>
      </Modal.Footer>
    </Modal>
  );
};
const RemovableChannelRemoveModal = ({ channel, isShown, setShown }) => (
  <>
    <Modal show={isShown} onHide={() => setShown(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{i18n.t('deleteChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{i18n.t('sure?')}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShown(false)}>
          {i18n.t('cancel')}
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            socketAbstraction().removeChannel(channel.id);
            setShown(false);
          }}
        >
          {i18n.t('delete')}
        </Button>
      </Modal.Footer>
    </Modal>
  </>
);
const RemovableChannel = ({ dispatch, channel, active }) => {
  // states
  const [isRemoveModalShown, setRemoveModalShown] = useState(false);
  const [isRenameModalShown, setRenameModalShown] = useState(false);
  const channelRenameInputRef = useRef();
  // css related
  const variant = (active === true) ? 'success' : 'primary';
  const style = { display: 'flex' };
  const child = { flex: '1 1 auto', maxWidth: '80%', whiteSpace: 'nowrap' };
  // calbacks
  const onRemoveClick = () => setRemoveModalShown(true);
  const onRenameClick = () => {
    setRenameModalShown(true);
    setTimeout(() => {
      channelRenameInputRef.current.focus();
      channelRenameInputRef.current.select();
    }, 1);
  };
  // render
  return (
    <Dropdown key={channel.id} as={ButtonGroup} style={style}>
      <Button
        onClick={onChannelClick(dispatch, channel.id, active)}
        variant={variant}
        style={child}
      >
        {channel.name}
      </Button>
      <Dropdown.Toggle variant={variant} split />
      <Dropdown.Menu>
        <Dropdown.Item onClick={onRemoveClick}>
          {i18n.t('delete')}
        </Dropdown.Item>
        <RemovableChannelRemoveModal
          channel={channel}
          isShown={isRemoveModalShown}
          setShown={setRemoveModalShown}
        />
        <Dropdown.Item onClick={onRenameClick}>
          {i18n.t('rename')}
        </Dropdown.Item>
        <RemovableChannelRenameModal
          channel={channel}
          isShown={isRenameModalShown}
          setShown={setRenameModalShown}
          channelRenameInputRef={channelRenameInputRef}
        />
      </Dropdown.Menu>
    </Dropdown>
  );
};
const StaticChannel = ({ dispatch, channel, active }) => {
  // css related
  const variant = (active === true) ? 'success' : 'primary';
  const style = { display: 'flex' };
  const child = { flex: '1 1 auto', whiteSpace: 'nowrap' };
  // render
  return (
    <div style={style}>
      <Button
        onClick={onChannelClick(dispatch, channel.id, active)}
        variant={variant}
        style={child}
      >
        {channel.name}
      </Button>
    </div>
  );
};

export default ({ dispatch, channel, active }) => {
  if (channel.removable === true) {
    return (
      <RemovableChannel
        dispatch={dispatch}
        channel={channel}
        active={active}
      />
    );
  }
  return (
    <StaticChannel
      dispatch={dispatch}
      channel={channel}
      active={active}
    />
  );
};
