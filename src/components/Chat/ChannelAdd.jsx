/* eslint-disable no-param-reassign */
import React, { useState, useRef } from 'react';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import i18n from 'i18next';
import socketAbstraction from '../../socketAbstraction.js';
import * as currentChannelIdActions from '../../slices/currentChannelId.js';

const onSubmitNewChannel = (channels, dispatch, setShown) => async (values, actions) => {
  const name = values.input;
  if (channels.allIds.find((id) => channels.byId[id].name === name) !== undefined) {
    actions.setFieldError('input', i18n.t('suchChannelAlreadyExists'));
    return;
  }
  dispatch(currentChannelIdActions.wait(name));
  socketAbstraction().newChannel(name);
  setShown(false);
  // actions.resetForm();
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
        <Formik
          initialValues={{ input: '' }}
          validationSchema={Yup.object({
            input: Yup.string().required(i18n.t('required'))
              .min(1).max(15, i18n.t('channelNameShouldContainFrom1to15Symbols')),
          })}
          onSubmit={onSubmitNewChannel(channels, dispatch, setShown)}
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
            <Form onSubmit={handleSubmit} style={{ width: '100%' }} inline>
              <Form.Control
                data-testid="add-channel"
                ref={channelNameInputRef}
                name="input"
                type="text"
                placeholder={i18n.t('nameOfChannel')}
                style={{ width: '20rem' }}
                disabled={isSubmitting}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.input}
                isInvalid={touched.input && errors.input}
              />
              &nbsp;
              <Button disabled={isSubmitting} variant="primary" type="submit">
                {i18n.t('send')}
              </Button>
              {(touched.input && errors.input)
                ? <Form.Control.Feedback type="invalid">{errors.input}</Form.Control.Feedback>
                : null}
            </Form>
          )}
        </Formik>
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
