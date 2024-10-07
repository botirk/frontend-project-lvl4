import { useFormik } from "formik";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import i18next from "i18next";

import { useGetMessagesQuery, usePostMessageMutation } from "../redux/messages";
import { useEffect, useRef } from "react";

export const Input = () => {
  const selectedChannel = useSelector(state => state.chat.selectedChannel);
  const username = useSelector(state => state.auth.username);

  const ref = useRef();
  useEffect(() => { if (ref.current) ref.current.focus(); }, [ref.current]);
  
  const [message] = usePostMessageMutation();
  const formik = useFormik({
    initialValues: { input: '' },
    validationSchema: Yup.object({
      input: Yup.string().required(i18next.t('required')),
    }),
    onSubmit: async ({ input: body}) => {
      try {
        await message([selectedChannel, username, body]);
        formik.resetForm();
      } finally {
        await new Promise(setTimeout, 100);
        if (ref.current) ref.current.focus();
      }
    },
  });

  return <form onSubmit={formik.handleSubmit} className="d-flex gap-2">
    <input
      ref={ref}
      autoComplete="off"
      className="flex-grow-1 form-control"
      data-testid="new-message"
      autoFocus
      name="input" type="text"
      placeholder={i18next.t('message')}
      disabled={formik.isSubmitting}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.input}
      isInvalid={formik.touched.input && formik.errors.input}
    />
    <button disabled={formik.isSubmitting} variant="primary" type="submit" className="btn btn-primary">
      {i18next.t('send')}
    </button>
  </form>
};

const Message = ({ message }) => {
  return <div>{message.username}: {message.body}</div>;
};

const Messages = () => {
  const { data: messages, error, isLoading, refetch } = useGetMessagesQuery();
  const selectedChannel = useSelector(state => state.chat.selectedChannel);

  return <div className="overflow-auto">
    {isLoading && <div class="spinner-border" role="status" />}
    {!isLoading && Object.values(messages.entities).filter(message => message.channel === selectedChannel).map(message => (
      <Message key={message.id} message={message} />
    ))}
  </div>;
};

export default Messages;