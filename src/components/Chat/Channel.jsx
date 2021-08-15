import React, { useRef, useState } from 'react';
import * as Yup from 'yup';
import {
  Button, Dropdown, ButtonGroup, Modal, Form,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import i18n from 'i18next';
import socketAbstraction from '../../socketAbstraction.js';
import * as currentChannelIdActions from '../../slices/currentChannelId.js';

// helper function

// modal with rename/name input
export const RemovableChannelRenameModal = ({
  onSubmit, modalTitle, actionTitle, testId, channel, channels, isShown, setShown, channelRenameInputRef,
}) => {
  // helper function
  const channelNames = channels.allIds.map((id) => channels.byId[id].name);
  // hook
  const formik = useFormik({
    initialValues: { input: channel.name },
    validationSchema: Yup.object({
      input: Yup.string().required(i18n.t('required'))
        .min(1).max(15, i18n.t('channelNameShouldContainFrom1to15Symbols'))
        .notOneOf((channelNames), i18n.t('suchChannelAlreadyExists')),
    }),
    onSubmit: ({ input }, { setSubmitting, resetForm }) => {
      setShown(false);
      onSubmit(input);
      setSubmitting(false);
      resetForm();
    },
  });
  // render
  return (
    <Modal show={isShown} onHide={() => setShown(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit} inline>
          <Form.Control
            className="flex-grow-1 flex-shrink-1"
            data-testid={testId}
            ref={channelRenameInputRef}
            name="input"
            type="text"
            placeholder={i18n.t('nameOfChannel')}
            disabled={formik.isSubmitting}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.input}
            isInvalid={formik.touched.input && formik.errors.input}
          />
          &nbsp;
          <Button disabled={formik.isSubmitting} variant="primary" type="submit">{actionTitle}</Button>
          {(formik.touched.input && formik.errors.input)
            ? <Form.Control.Feedback type="invalid">{formik.errors.input}</Form.Control.Feedback>
            : null}
        </Form>
      </Modal.Body>
    </Modal>
  );
};
// modal with delete confirmation
const RemovableChannelRemoveModal = ({ channel, isShown, setShown }) => (
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
          setShown(false);
          socketAbstraction().removeChannel(channel.id);
        }}
      >
        {i18n.t('delete')}
      </Button>
    </Modal.Footer>
  </Modal>
);
// removable channel with modals
const RemovableChannel = ({ channel, channels, isActive }) => {
  // hooks
  const [isRemoveModalShown, setRemoveModalShown] = useState(false);
  const [isRenameModalShown, setRenameModalShown] = useState(false);
  const channelRenameInputRef = useRef();
  const dispatch = useDispatch();
  // css related
  const variant = (isActive === true) ? 'success' : 'primary';
  // calbacks
  const onRenameClick = () => {
    setRenameModalShown(true);
    setTimeout(() => {
      channelRenameInputRef.current.focus();
      channelRenameInputRef.current.select();
    }, 1);
  };
  // render
  return (
    <Dropdown key={channel.id} as={ButtonGroup} className="mt-1 w-100">
      <Button
        onClick={() => dispatch(currentChannelIdActions.set(channel.id))}
        variant={variant}
        className="text-nowrap overflow-hidden"
      >
        {channel.name}
      </Button>
      <Dropdown.Toggle variant={variant} split />
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => setRemoveModalShown(true)}>
          {i18n.t('delete')}
        </Dropdown.Item>
        <RemovableChannelRemoveModal
          channel={channel}
          isShown={isRemoveModalShown}
          setShown={setRemoveModalShown}
        />
        <Dropdown.Item onClick={onRenameClick}>{i18n.t('rename')}</Dropdown.Item>
        <RemovableChannelRenameModal
          testId="rename-channel"
          modalTitle={i18n.t('renamingChannel')}
          actionTitle={i18n.t('renameChannel')}
          channel={channel}
          channels={channels}
          isShown={isRenameModalShown}
          setShown={setRenameModalShown}
          channelRenameInputRef={channelRenameInputRef}
          onSubmit={(input) => socketAbstraction().renameChannel(channel.id, input)}
        />
      </Dropdown.Menu>
    </Dropdown>
  );
};
// basic channel
const StaticChannel = ({ channel, isActive }) => {
  // hook
  const dispatch = useDispatch();
  // css related
  const variant = (isActive === true) ? 'success' : 'primary';
  // render
  return (
    <Button
      onClick={() => dispatch(currentChannelIdActions.set(channel.id))}
      variant={variant}
      className="mt-1 w-100 text-nowrap overflow-hidden"
    >
      {channel.name}
    </Button>
  );
};

const Channel = ({ channel, channels, isActive }) => {
  if (channel.removable === true) {
    return (
      <RemovableChannel
        channel={channel}
        channels={channels}
        isActive={isActive}
      />
    );
  }
  return (
    <StaticChannel
      channel={channel}
      isActive={isActive}
    />
  );
};
Channel.displayName = 'Channel';
export default Channel;
