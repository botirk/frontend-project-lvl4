/* eslint-disable functional/no-expression-statement, functional/no-conditional-statement */
import i18next from 'i18next';
import { toast } from 'react-toastify';

import { logout } from './redux/auth';

export const makeFullScreen = (elMut) => {
  const el = elMut;
  el.style.height = `${document.documentElement.clientHeight - 1 - el.offsetTop}px`;
  if (el.parentElement != null) makeFullScreen(el.parentElement);
};

export const onQueryStartedErrorToast = (_, { queryFulfilled, dispatch }) => queryFulfilled
  .catch((e) => {
    if (e.error?.status === 401) dispatch(logout());
    console.error(e);
    toast(i18next.t('browserError'));
  });
