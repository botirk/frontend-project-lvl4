/* eslint-disable
no-param-reassign */
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import i18next from 'i18next';
import { useEffect, useRef } from 'react';

import { useGetMessagesQuery, usePostMessageMutation } from '../redux/messages';
import filter from '../filter';

export const Input = () => {
  const selectedChannel = useSelector((state) => state.chat.selectedChannel);
  const username = useSelector((state) => state.auth.username);

  const ref = useRef();
  useEffect(() => { if (ref.current) ref.current.focus(); }, []);

  const [message] = usePostMessageMutation();
  const formik = useFormik({
    initialValues: { input: '' },
    validationSchema: Yup.object({
      input: Yup.string().required(i18next.t('required')),
    }),
    onSubmit: ({ input: body }) => message([selectedChannel, username, filter(body)])
      .then(() => formik.resetForm())
      .finally(() => (new Promise(setTimeout, 100))
        .then(() => { if (ref.current) ref.current.focus(); })),
  });

  return (
    <form onSubmit={formik.handleSubmit} className="d-flex gap-2">
      <input
        ref={ref}
        autoComplete="off"
        className="flex-grow-1 form-control"
        data-testid="new-message"
        name="input"
        type="text"
        placeholder={i18next.t('message')}
        disabled={formik.isSubmitting}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.input}
        aria-label={i18next.t('message')}
      />
      <button disabled={formik.isSubmitting} type="submit" className="btn btn-primary">
        {i18next.t('send')}
      </button>
    </form>
  );
};

const Message = ({ message }) => (
  <div>
    {message.username}
    :
    {' '}
    {message.body}
  </div>
);

const Messages = () => {
  const { data: messages } = useGetMessagesQuery();
  const selectedChannel = useSelector((state) => state.chat.selectedChannel);

  return (
    <div className="overflow-y-auto">
      {!messages && <div className="spinner-border" role="status" />}
      {messages && Object.values(messages.entities)
        .filter((message) => message.channel === selectedChannel).map((message) => (
          <Message key={message.id} message={message} />
        ))}
    </div>
  );
};

export default Messages;
