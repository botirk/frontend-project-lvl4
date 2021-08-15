import axios from 'axios';
import i18n from 'i18next';
import Login from './Login.jsx';

export default async (history, values, actions) => {
  try {
    const result = await axios.post('/api/v1/signup', values);
    // console.log(result);
    Login.setJWT(result.data);
    history.push('/');
    // actions.resetForm();
  } catch (e) {
    const message = e.message.toLowerCase();
    if (message.includes('409') === true) {
      actions.setFieldError('username', i18n.t('nickTaken'));
    } else if (message.includes('network') === true) {
      actions.setFieldError('username', i18n.t('authNetoworkError'));
      actions.setFieldError('password', i18n.t('authNetoworkError'));
    } else {
      actions.setFieldError('username', i18n.t('wrongLoginPassword'));
      actions.setFieldError('password', i18n.t('wrongLoginPassword'));
      throw new Error(e);
    }
  }
};
