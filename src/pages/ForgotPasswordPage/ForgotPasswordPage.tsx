import { useState, FormEvent } from "react";
import { useAppDispatch, useAppSelector, RootState } from "../../services/types/types";

import { Link, Navigate } from 'react-router-dom';

import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import {recoverPasswordAction} from '../../services/actions/userAction'

import ForgotPasswordPageStyles from './ForgotPasswordPage.module.css'

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState<string>("");

  const successUserData = useAppSelector((state: RootState) => state.user.success);

  const dispatch = useAppDispatch();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlerSubmit = (evt: FormEvent) => {
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
        <EmailInput required name="email" value={email} placeholder={'Укажите e-mail'} onChange={onChange}/>
        <Button htmlType="submit">Восстановить</Button>
      </form>
      <p className={`${ForgotPasswordPageStyles.item} text text_type_main-default text_color_inactive`}>Вспомнили пароль? 
        <Link className={ForgotPasswordPageStyles.link} to="/login">Войти</Link>
      </p>
    </main>
  );
}

export default ForgotPasswordPage;