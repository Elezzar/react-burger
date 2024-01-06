import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";

import { Button, EmailInput, Input, PasswordInput,} from "@ya.praktikum/react-developer-burger-ui-components";

import { registerUserAction } from "../../services/actions/userAction";

import registrationPageStyles from "./RegistrationPage.module.css"


const RegistrationPage = () => {
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChangeLogin = evt => {
    setLogin(evt.target.value);
  };

  const onChangeEmail = evt => {
    setEmail(evt.target.value);
  };
  
  const onChangePassword = evt => {
    setPassword(evt.target.value);
  };

  const registerSuccess = useSelector(store => store.user.isAuthChecked);

  const dispatch = useDispatch();

  const handlerSubmit = (evt) => {
    evt.preventDefault();

    const user = {
      email: email,
      password: password,
      name: login,
    };
    dispatch(registerUserAction(user));
    
    if (registerSuccess) {
      return <Navigate to="/" />;
    }
  };

  return ( 
    <main className={registrationPageStyles.main}>
      <h1 className="text text_type_main-medium mb-6">Регистрация</h1>
      <form className={registrationPageStyles.form} onSubmit={handlerSubmit}>
        <Input required type="text" value={login} placeholder="Имя" onChange={onChangeLogin}/>
        <EmailInput required type="email" value={email} placeholder="E-mail" onChange={onChangeEmail}/>
        <PasswordInput required type="password" value={password} placeholder="Пароль" onChange={onChangePassword} icon="ShowIcon"/>
        <Button htmlType="submit">Зарегистрироваться</Button>
      </form>
      <p className={`${registrationPageStyles.item} text text_type_main-default text_color_inactive`}>Уже зарегистрированы? 
        <Link className={registrationPageStyles.link} to="/login">Войти</Link>
      </p>
    </main>
  );
}

export default RegistrationPage;