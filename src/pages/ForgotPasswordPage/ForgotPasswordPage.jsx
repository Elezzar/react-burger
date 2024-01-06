import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from 'react-router-dom';

import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import {recoverPasswordAction} from '../../services/actions/userAction'

import ForgotPasswordPageStyles from './ForgotPasswordPage.module.css'

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");

  const successUserData = useSelector(store => store.user.success);

  const dispatch = useDispatch();

  const onChange = e => {
    setEmail(e.target.value);
  };

  const handlerSubmit = (evt) => {
    evt.preventDefault();
    dispatch(recoverPasswordAction(email));
  };

  if (successUserData) {
    return <Navigate to="/reset-password" />;
  }

  return ( 
    <main className={ForgotPasswordPageStyles.main}>
      <h1 className={`text text_type_main-medium mb-6`}>Восстановление пароля</h1>
      <form className={ForgotPasswordPageStyles.form} onSubmit={handlerSubmit}>
        <EmailInput required type="email" value={email} placeholder={'Укажите e-mail'} onChange={onChange}/>
        <Button htmlType="submit">Восстановить</Button>
      </form>
      <p className={`${ForgotPasswordPageStyles.item} text text_type_main-default text_color_inactive`}>Вспомнили пароль? 
        <Link className={ForgotPasswordPageStyles.link} to="/login">Войти</Link>
      </p>
    </main>
  );
}

export default ForgotPasswordPage;