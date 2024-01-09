import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from 'react-router-dom';

import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { resetPasswordAction } from '../../services/actions/userAction'

import ResetPasswordPageStyles from './ResetPasswordPage.module.css'

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  const onChangePassword = evt => {
    setPassword(evt.target.value);
  };

  const onChangeCode = evt => {
    setCode(evt.target.value);
  };

  const successResetPassword= useSelector(store => store.user.isPassReset);
  const successRecoverPassword= useSelector(store => store.user.isPassRecover);

  const dispatch = useDispatch();

  const handlerSubmit = (evt) => {
    evt.preventDefault();
    dispatch(resetPasswordAction(password, code));
  };

  if (successResetPassword) {
    return <Navigate to="/login" />;
  }


  return ( 
    <main className={ResetPasswordPageStyles.main}>
      {!successRecoverPassword && <Navigate to="/forgot-password" />}
      <h1 className={`text text_type_main-medium mb-6`}>Восстановление пароля</h1>
      <form className={ResetPasswordPageStyles.form} onSubmit={handlerSubmit}>
        <PasswordInput required type="password" value={password} placeholder={"Введите новый пароль"} onChange={onChangePassword}/>
        <Input required type="text" value={code} placeholder={"Введите код из письма"} onChange={onChangeCode}/>
        <Button htmlType="submit">Сохранить</Button>
      </form>
      <p className={`${ResetPasswordPageStyles.item} text text_type_main-default text_color_inactive`}>Вспомнили пароль?
        <Link className={ResetPasswordPageStyles.link} to="/login">Войти</Link>
      </p>
    </main>
  );
}

export default ResetPasswordPage;