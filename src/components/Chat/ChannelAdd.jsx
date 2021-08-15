/* eslint-disable no-param-reassign, testing-library/await-async-utils */
import React, { useState, useRef } from 'react';
import { Button } from 'react-bootstrap';
import i18n from 'i18next';
import socketAbstraction from '../../socketAbstraction.js';
import { RemovableChannelRenameModal } from './Channel.jsx';

const ChannelAddButton = ({ setShown, channelRenameInputRef }) => {
  const onClick = () => {
    setShown(true);
    setTimeout(() => channelRenameInputRef.current.focus(), 1);
  };

  return (
    <Button className="w-100" variant="info" onClick={onClick}>
      +
    </Button>
  );
};

const ChannelAdd = ({ channels }) => {
  const [isShown, setShown] = useState(false);
  const channelRenameInputRef = useRef();

  return (
    <>
      <ChannelAddButton setShown={setShown} channelRenameInputRef={channelRenameInputRef} />
      <RemovableChannelRenameModal
        modalTitle={i18n.t('addingChannel')}
        actionTitle={i18n.t('addChannel')}
        channel={{ name: '' }}
        channels={channels}
        isShown={isShown}
        setShown={setShown}
        channelRenameInputRef={channelRenameInputRef}
        onSubmit={(input) => socketAbstraction().newChannel(input)}
      />
    </>
  );
};
ChannelAdd.displayName = 'ChannelAdd';
export default ChannelAdd;
