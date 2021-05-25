import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class Login extends React.Component {
  onSubmit = async (values, actions) => {
    try {
      const result = await axios.post('/api/v1/login', values);
      //console.log(result);
      localStorage.setItem('JWT', JSON.stringify(result.data));
      this.props.history.push('/');
    } catch (e) {
      console.error(e);
      if (e.message.toLowerCase().includes('network') === true) {
        actions.setFieldError('username', 'Сетевая ошибка при попытки авторизоваться');
        actions.setFieldError('password', 'Сетевая ошибка при попытки авторизоваться');
        alert('Сетевая ошибка при попытки авторизоваться');
      } else {
        actions.setFieldError('username', 'Эта пара логин-пароль не подходит');
        actions.setFieldError('password', 'Эта пара логин-пароль не подходит');
        alert('Эта пара логин-пароль не подходит');
      }
    }
  }

  renderForm() {
    return <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={Yup.object({
        username: Yup.string()
          .required('Требуется'),
        password: Yup.string()
          .required('Требуется'),
      })}
      onSubmit={this.onSubmit}>
    {({values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting }) => (
    <Form onSubmit={handleSubmit} className="p-3">
      <FormGroup>
        <FormLabel htmlFor="username">Ваш ник</FormLabel>
        <FormControl 
          disabled={isSubmitting}
          onChange={handleChange} 
          onBlur={handleBlur}
          name="username" 
          type="text"
          value={values.username}
          isValid={touched.username && !errors.username}
          isInvalid={touched.username && errors.username}/>
        {(touched.username && errors.username)
          ? <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback> 
          : null}
      </FormGroup>
      <FormGroup>
        <FormLabel htmlFor="password">Пароль</FormLabel>
        <FormControl 
          disabled={isSubmitting}
          onChange={handleChange}
          onBlur={handleBlur}
          name="password"
          type="password"
          value={values.password}
          isValid={touched.password && !errors.password}
          isInvalid={touched.password && errors.password}/>
        {(touched.password && errors.password)
          ? <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback> 
          : null}
      </FormGroup>
      <button disabled={isSubmitting} type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
      <div className="d-flex flex-column align-items-center">
        <span className="small mb-2">Нет аккаунта?</span> 
        <a href="/signup">Регистрация</a>
      </div>
    </Form>
    )}
    </Formik>
  }

  render() {
    return <div className="d-flex flex-column h-100">
      <div className="container-fluid">
        <div className="row justify-content-center pt-5">
          <div className="col-sm-4">{this.renderForm()}</div>
        </div>
      </div>
    </div>;
  }
}

export default withRouter(Login);