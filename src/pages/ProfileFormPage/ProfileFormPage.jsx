import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { editUserAction } from "../../services/actions/userAction";

import { Button, Input, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

import ProfileFormPageStyles from './ProfileFormPage.module.css'

const ProfileFormPage = () => {
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

  return ( 
    <form className={ProfileFormPageStyles.form} onReset={resetHandler} onSubmit={submitHandler}>
      <Input required type="text" value={name} placeholder={'Имя'} minLength={3} onChange={onChangeName} icon="EditIcon"/>
      <EmailInput required type="email" value={email} placeholder={'Логин'} minLength={3} onChange={onChangeEmail} icon="EditIcon"/>
      <PasswordInput required type="password" value={password} placeholder={'Пароль'} minLength={3} onChange={onChangePassword} icon={"EditIcon"}/>
      {isEditing && (
        <div className={ProfileFormPageStyles.box}>
          <Button htmlType="reset" type="secondary" size="medium">Отмена</Button>
          <Button htmlType="submit">Сохранить</Button>
        </div>
      )}
    </form>
  );
}

export default ProfileFormPage;