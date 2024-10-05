import i18next from "i18next";
import { Modal } from "bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useDispatch, useSelector } from "react-redux";
import { useGetChannelsQuery } from "../redux/channels";
import { selectChannel } from "../redux/chat";
import { useState } from "react";
import classNames from "classnames";

const ChannelAddModal = ({ onSubmit, startingValue, hide }) => {
  const formik = useFormik({
    initialValues: { input: startingValue },
    validationSchema: Yup.object({
      input: Yup.string().required(i18next.t('required')).min(3, i18next.t('from3SymbolsUpTo20Symbols')).max(21, i18next.t('from3SymbolsUpTo20Symbols')),
    }),
    onSubmit: async (values) => {
      try {
        await onSubmit(values);
        hide();
      } catch(e) {
        console.error(e)
      }
    },
  });

  return <div className="modal modal-fullscreen d-block" tabindex="-1">
    <div className="modal-backdrop">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{i18next.t("addingChannel")}</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={hide} disabled={formik.isSubmitting}/>
          </div>
          <form onSubmit={formik.onSubmit}>
            <div className="modal-body">
              <input 
                autoFocus
                autoComplete="off"
                placeholder={i18next.t('addingChannel')}
                disabled={formik.isSubmitting}
                type="text" name="input" 
                onBlur={formik.handleBlur} onChange={formik.handleChange} 
                value={formik.values.input}
                className={classNames('form-control', {'is-invalid': formik.touched.input && formik.errors.input})} 
              />
              {formik.errors.input && formik.touched.input && <div class="invalid-feedback">{formik.errors.input}</div>}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={hide} disabled={formik.isSubmitting}>{i18next.t("cancel")}</button>
              <button type="button" className="btn btn-primary" onClick={formik.handleSubmit} disabled={formik.isSubmitting}>{i18next.t("addChannel")}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
}

const ChannelAdd = () => {
  const [isShown, setShown] = useState(false);
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();

  return <>
    <button className="btn btn-primary mt-1 w-100 text-nowrap overflow-hidden" onClick={() => setShown(true)}>{i18next.t('addingChannel')}</button>
    {isShown && <ChannelAddModal 
      id="add" startingValue={""} hide={() => setShown(false)}
      onSubmit={async ({ input }) => {
        const { id } = await (await fetch("/api/v1/channels", { 
          method: "POST", 
          body: JSON.stringify({ name: input }),
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
        })).json();
        dispatch(selectChannel(id));
      }}
    />}
  </>
}

const Channel = ({ channel }) => {
  const selectedChannel = useSelector(state => state.chat.selectedChannel);
  const dispatch = useDispatch();
  return <button 
    className="btn btn-secondary mt-1 w-100 text-nowrap overflow-hidden" 
    disabled={selectedChannel === channel.id}
    onClick={() => dispatch(selectChannel(channel.id))}
  >
      {channel.name}
  </button>;
};

const Channels = () => {
  const { data: channels, error, isLoading, refetch } = useGetChannelsQuery();

  return <div> 
    <div className="overflow-auto">
      {!channels && <div class="spinner-border" role="status" />}
      {channels && <>
        <ChannelAdd />
        {Object.values(channels.entities).map(channel => <Channel key={channel.id} channel={channel} />)}
      </>}
    </div>
  </div>;
};

export default Channels;