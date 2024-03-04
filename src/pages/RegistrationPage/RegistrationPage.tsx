import { useState, FormEvent } from "react";

import { useAppDispatch, useAppSelector, RootState } from "../../services/types/types";
import { Link, Navigate } from "react-router-dom";

import { Button, EmailInput, Input, PasswordInput,} from "@ya.praktikum/react-developer-burger-ui-components";

import { registerUserAction } from "../../services/actions/userAction";

import registrationPageStyles from "./RegistrationPage.module.css"


const RegistrationPage = () => {
  const [login, setLogin] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onChangeLogin = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(evt.target.value);
  };

  const onChangeEmail = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(evt.target.value);
  };
  
  const onChangePassword = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(evt.target.value);
  };

  const registerSuccess = useAppSelector((state: RootState) => state.user.success);

  const dispatch = useAppDispatch();

  const handlerSubmit = (evt: FormEvent) => {
    evt.preventDefault();

    const user = {
      email: email,
      password: password,
      name: login,
    };
    dispatch(registerUserAction(user));
    
  };
  
  if (registerSuccess) {
    return <Navigate to="/" />;
  }

  return ( 
    <main className={registrationPageStyles.main}>
      <h1 className="text text_type_main-medium mb-6">Регистрация</h1>
      <form className={registrationPageStyles.form} onSubmit={handlerSubmit}>
        <Input required type="text" value={login} placeholder="Имя" onChange={onChangeLogin}/>
        <EmailInput required name="email" value={email} placeholder="E-mail" onChange={onChangeEmail}/>
        <PasswordInput required name="password" value={password} placeholder="Пароль" onChange={onChangePassword} icon="ShowIcon"/>
        <Button htmlType="submit">Зарегистрироваться</Button>
      </form>
      <p className={`${registrationPageStyles.item} text text_type_main-default text_color_inactive`}>Уже зарегистрированы? 
        <Link className={registrationPageStyles.link} to="/login">Войти</Link>
      </p>
    </main>
  );
}

export default RegistrationPage;