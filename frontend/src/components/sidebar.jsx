/* eslint-disable
functional/no-expression-statement,
functional/no-conditional-statement,
no-param-reassign */
import i18next from 'i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Sidebar as ProSidebar } from 'react-pro-sidebar';

import {
  useAddChannelMutation, useDeleteChannelMutation, useGetChannelsQuery, useRenameChannelMutation,
} from '../redux/channels';
import { selectChannel } from '../redux/chat';
import filter from '../filter';
import { useWindowBig } from '../utils';

const ChannelDeleteModal = ({ channel, hide }) => {
  const [deleteChannel, result] = useDeleteChannelMutation();
  useEffect(() => {
    const cb = async (e) => {
      if (e.code === 'Enter' && (await deleteChannel(channel.id)).error) hide();
    };
    document.addEventListener('keyup', cb);
    return () => document.removeEventListener('keyup', cb);
  });

  return (
    <div className="modal-backdrop">
      <div className="modal modal-fullscreen d-block" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{i18next.t('deleteChannel')}</h5>
              <button type="button" className="btn-close" aria-label="Close" onClick={hide} disabled={result.isLoading} />
            </div>
            <div className="modal-body">
              {result.isError && <div className="invalid-feedback">{i18next.t('browserError')}</div>}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={hide} disabled={result.isLoading}>{i18next.t('cancel')}</button>
              <button type="button" className="btn btn-danger" onClick={async () => { if (!(await deleteChannel(channel.id)).error) hide(); }} disabled={result.isLoading}>{i18next.t('sure?')}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChannelRenameModal = ({
  header, onSubmit, startingValue, hide,
}) => {
  const channels = useGetChannelsQuery();
  const formik = useFormik({
    initialValues: { input: startingValue },
    validationSchema: Yup.object({
      input: Yup.string()
        .required(i18next.t('required'))
        .min(3, i18next.t('from3SymbolsUpTo20Symbols'))
        .max(21, i18next.t('from3SymbolsUpTo20Symbols'))
        .test('unique', i18next.t('suchChannelAlreadyExists'), (value) => Object.values(channels.data.entities).findIndex((channel) => channel.name === value) === -1),
    }),
    onSubmit: (values) => onSubmit(values).then(hide).catch(() => formik.setErrors({ input: i18next.t('browserError') })),
  });
  useEffect(() => {
    const cb = async (e) => {
      if (e.code === 'Enter' && !formik.isSubmitting) formik.submitForm();
    };
    document.addEventListener('keyup', cb);
    return () => document.removeEventListener('keyup', cb);
  });

  return (
    <div className="modal-backdrop">
      <div className="modal fade show modal-fullscreen d-block" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{header}</h5>
              <button type="button" className="btn-close" aria-label="Close" onClick={hide} disabled={formik.isSubmitting} />
            </div>
            <form onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(e); }}>
              <div className="modal-body">
                <div className="form-floating">
                  <input
                    id="rename"
                    autoComplete="off"
                    placeholder={i18next.t('nameOfChannel')}
                    disabled={formik.isSubmitting}
                    type="text"
                    name="input"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.input}
                    className={classNames('form-control', { 'is-invalid': formik.touched.input && formik.errors.input })}
                  />
                  <label htmlFor="rename">
                    {i18next.t('nameOfChannel')}
                  </label>
                  {formik.errors.input && formik.touched.input && <div className="invalid-feedback">{formik.errors.input}</div>}
                </div>

              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={hide} disabled={formik.isSubmitting}>{i18next.t('cancel')}</button>
                <button type="button" className="btn btn-primary" onClick={formik.handleSubmit} disabled={formik.isSubmitting}>{i18next.t('addChannel')}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChannelAdd = () => {
  const [isShown, setShown] = useState(false);
  const [addChannel] = useAddChannelMutation();

  return (
    <>
      <button
        className="btn btn-primary mt-1 w-100 text-nowrap overflow-hidden"
        type="button"
        onClick={() => setShown(true)}
      >
        {i18next.t('addingChannel')}
      </button>
      {isShown && (
      <ChannelRenameModal
        name={i18next.t('addingChannel')}
        startingValue=""
        hide={() => setShown(false)}
        onSubmit={({ input }) => addChannel(filter(input)).unwrap()}
      />
      )}
    </>
  );
};

const Channel = ({ channel }) => {
  const selectedChannel = useSelector((state) => state.chat.selectedChannel);
  const dispatch = useDispatch();
  const [isRenameShown, setRenameShown] = useState(false);
  const [isDeleteShown, setDeleteShown] = useState(false);
  const [renameChannel] = useRenameChannelMutation();

  return (
    <div className="btn-group mt-1 w-100">
      <button
        type="button"
        className="w-100 rounded-0 text-start text-truncate btn btn-secondary"
        disabled={selectedChannel === channel.id}
        onClick={() => dispatch(selectChannel(channel.id))}
      >
        #
        {' '}
        {channel.name}
      </button>
      {channel.removable && (
        <>
          <button type="button" className="btn btn-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false" aria-label="Dropdown">
            <span className="visually-hidden">{i18next.t('manageChannel')}</span>
          </button>
          <ul className="dropdown-menu">
            <li>
              <button type="button" className="dropdown-item" onClick={() => setRenameShown(true)}>
                {i18next.t('renameChannel')}
              </button>
            </li>
            <li>
              <button type="button" className="dropdown-item" onClick={() => setDeleteShown(true)}>
                {i18next.t('delete')}
              </button>
            </li>
          </ul>
        </>
      )}
      {isRenameShown && <ChannelRenameModal name={i18next.t('renameChannel')} hide={() => setRenameShown(false)} startingValue={channel.name} onSubmit={({ input }) => renameChannel([channel.id, filter(input)]).unwrap()} />}
      {isDeleteShown && <ChannelDeleteModal hide={() => setDeleteShown(false)} channel={channel} />}
    </div>
  );
};

const Sidebar = () => {
  const { data: channels } = useGetChannelsQuery();
  const big = useWindowBig();
  const sidebar = useSelector((state) => state.chat.sidebar);

  return (
    <ProSidebar style={{ height: '100vh' }} hidden={!sidebar && !big}>
      {!channels && <div className="spinner-border" role="status" />}
      {channels && (
        <>
          <ChannelAdd />
          {Object.values(channels.entities)
            .map((channel) => <Channel key={channel.id} channel={channel} />)}
        </>
      )}
    </ProSidebar>
  );
};

export default Sidebar;
