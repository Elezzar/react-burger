import { useState, useEffect, FormEvent } from "react";
import { useAppDispatch, useAppSelector, RootState } from "../../services/types/types";

import { editUserAction } from "../../services/actions/userAction";

import { Button, Input, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

import ProfileFormPageStyles from './ProfileFormPage.module.css'

const ProfileFormPage = () => {
  const userData = useAppSelector((state: RootState) => state.user);
  
  const [name, setName] = useState<string>(userData.name);
  const [email, setEmail] = useState<string>(userData.email);
  const [password, setPassword] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const onChangeName = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setName(evt.target.value);
    setIsEditing(true);
  };

  const onChangeEmail = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(evt.target.value);
    setIsEditing(true);
  };

  const onChangePassword = (evt: React.ChangeEvent<HTMLInputElement>) => {
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

  const submitHandler = (evt: FormEvent) => {
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

  const resetHandler = (evt: FormEvent) => {
    evt.preventDefault();
    setName(userData.name);
    setEmail(userData.email);
    setPassword("");
    setIsEditing(false);
  };

  return ( 
    <form className={ProfileFormPageStyles.form} onReset={resetHandler} onSubmit={submitHandler}>
      <Input required type="text" value={name} placeholder={'Имя'} minLength={3} onChange={onChangeName} icon="EditIcon"/>
      <EmailInput required name="email" value={email} placeholder={'Логин'} minLength={3} onChange={onChangeEmail}/>
      <PasswordInput required name="password" value={password} placeholder={'Пароль'} minLength={3} onChange={onChangePassword} icon={"EditIcon"}/>
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