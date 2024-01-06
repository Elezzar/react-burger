import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';

import { Button, Input, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

import NotFoundPage from "../NotFoundPage/NotFoundPage";

import { logOutAction, editUserAction } from "../../services/actions/userAction";
import { getCookie } from "../../utils/cookies";

import ProfilePageStyles from './ProfilePage.module.css'

const ProfilePage = () => {
  const userData = useSelector(store => store.user);
  
  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);
  const [password, setPassword] = useState("");
  const [isEditing, setIsEditing] = useState(false);


  const dispatch = useDispatch();

  const onChangeName = evt => {
    setName(evt.target.value);
    setIsEditing(true);
  };

  const onChangeEmail = evt => {
    setEmail(evt.target.value);
    setIsEditing(true);
  };

  const onChangePassword = evt => {
    setPassword(evt.target.value);
    setIsEditing(true);
  };

  useEffect(() => {
    if (userData) {
      setName(userData.name);
      setEmail(userData.email);
      setPassword("");
    }
  }, [userData]);

  let { '*': to } = useParams();

  const submitHandler = (evt) => {
    evt.preventDefault();
    const editedUser = {
      "email": email,
      "name": name,
      "password": password,
    };
    dispatch(editUserAction(editedUser));
    setPassword("");
    setIsEditing(false);
  };

  const resetHandler = (evt) => {
    evt.preventDefault();
    setName(userData.name);
    setEmail(userData.email);
    setPassword("");
    setIsEditing(false);
  };

  const logoutHandler = () => {
    const refreshToken = getCookie('refreshToken');
    dispatch(logOutAction(refreshToken));
  }

  return ( 
    <main className={ProfilePageStyles.main}>
      <nav className={ProfilePageStyles.nav}>
        <ul className={ProfilePageStyles.list}>
          <li className={ProfilePageStyles.item}>
            <NavLink className={({ isActive }) => `${ProfilePageStyles.navlink}
            ${isActive ? ProfilePageStyles.active : "text_color_inactive"}`} end to="/profile">Профиль</NavLink>
          </li>
          <li className={ProfilePageStyles.item}>
            <NavLink className={({ isActive }) => `${ProfilePageStyles.navlink}
            ${isActive ? ProfilePageStyles.active : "text_color_inactive"}`} end to="/profile/orders">История заказов</NavLink>
          </li>
          <li className={ProfilePageStyles.item}>
            <NavLink className={({ isActive }) => `${ProfilePageStyles.navlink}
            ${isActive ? ProfilePageStyles.active : "text_color_inactive"}`} to="/login" onClick={logoutHandler}>Выход</NavLink>
          </li>
        </ul>
        <p className={`${ProfilePageStyles.text} text text_type_main-default text_color_inactive`}>В этом разделе вы можете изменить свои персональные данные</p>
      </nav>
      {to === 'orders' ? <NotFoundPage /> : (
        <form className={ProfilePageStyles.form} onReset={resetHandler} onSubmit={submitHandler}>
          <Input required type="text" value={name} placeholder={'Имя'} minLength={3} onChange={onChangeName} icon="EditIcon"/>
          <EmailInput required type="email" value={email} placeholder={'Логин'} minLength={3} onChange={onChangeEmail} icon="EditIcon"/>
          <PasswordInput required type="password" value={password} placeholder={'Пароль'} minLength={3} onChange={onChangePassword} icon={"EditIcon"}/>
          {isEditing && (
            <div className={ProfilePageStyles.box}>
              <Button htmlType="reset" type="secondary" size="medium">Отмена</Button>
              <Button htmlType="submit">Сохранить</Button>
            </div>
          )}
        </form>
      )}
    </main>
  );
}

export default ProfilePage;