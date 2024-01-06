import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, useLocation } from 'react-router-dom';

import { OnlyAuthProtected, OnlyUnauthProtected } from '../../utils/ProtectedRoute';
import { fetchIngredients } from '../../services/actions/loadIngredients.js';
import { updateCurrentUserAction } from '../../services/actions/userAction.js';

import MainPage from '../../pages/MainPage/MainPage.jsx';
import LoginPage from '../../pages/LoginPage/LoginPage.jsx';
import RegistrationPage from '../../pages/RegistrationPage/RegistrationPage.jsx'
import ForgotPasswordPage from '../../pages/ForgotPasswordPage/ForgotPasswordPage.jsx';
import ResetPasswordPage from '../../pages/ResetPasswordPage/ResetPasswordPage.jsx';
import ProfilePage from '../../pages/ProfilePage/ProfilePage.jsx';
import IngredientPage from '../../pages/IngredientPage/IngredientPage.jsx';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage.jsx';

const AppRoutes = () => {
  const location = useLocation();
  const background = location.state && location.state.modal;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(updateCurrentUserAction());
  }, [dispatch]);

  return (
    <Routes>
      {!background && <Route path="/ingredients/:id" element={<IngredientPage/>}/>}
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<OnlyUnauthProtected children={<LoginPage />} />} />
      <Route path="/register" element={<OnlyUnauthProtected children={<RegistrationPage />} />} />
      <Route path="/forgot-password" element={<OnlyUnauthProtected children={<ForgotPasswordPage />} />} />
      <Route path="/reset-password" element={<OnlyUnauthProtected children={<ResetPasswordPage />} />} />
      <Route path="/profile" element={<OnlyAuthProtected children={<ProfilePage />} />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;