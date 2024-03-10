import { useState, FormEvent } from "react";
import { useAppDispatch } from "../../services/types/types";

import { AnyAction } from "redux";
import { Link } from "react-router-dom";

import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

import { loginUserAction } from "../../services/actions/userAction";

import loginPageStyles from './LoginPage.module.css'

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useAppDispatch();

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlerSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    const user = {
      "email": email,
      "password": password,
    };
    dispatch(loginUserAction(user) as unknown as AnyAction);
  };

  return (  
    <main className={loginPageStyles.main}>
      <h1 className={`text text_type_main-medium mb-6`}>Вход</h1>
      <form className={loginPageStyles.form} onSubmit={handlerSubmit}>
        <EmailInput required name="email" value={email} placeholder={'E-mail'} onChange={onChangeEmail}/>
        <PasswordInput required name="password" value={password} placeholder={'Пароль'} onChange={onChangePassword}/>
        <Button htmlType="submit">Войти</Button>
      </form>
      <ul className={loginPageStyles.box}>
        <li className={`${loginPageStyles.item} text text_type_main-default text_color_inactive`}>Вы - новый пользователь?
          <Link className={loginPageStyles.link} to="/register">Зарегистрироваться</Link>
        </li>
        <li className={`${loginPageStyles.item} text text_type_main-default text_color_inactive`}>Забыли пароль?
          <Link className={loginPageStyles.link} to="/forgot-password">Восстановить пароль</Link>
        </li>
      </ul>
    </main>
  );
}

export default LoginPage;