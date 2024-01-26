import { Routes, Route, useLocation } from 'react-router-dom';

import { OnlyAuthProtected, OnlyUnauthProtected } from '../ProtectedRoute/ProtectedRoute';


import MainPage from '../../pages/MainPage/MainPage.jsx';
import LoginPage from '../../pages/LoginPage/LoginPage.jsx';
import RegistrationPage from '../../pages/RegistrationPage/RegistrationPage.jsx'
import ForgotPasswordPage from '../../pages/ForgotPasswordPage/ForgotPasswordPage.jsx';
import ResetPasswordPage from '../../pages/ResetPasswordPage/ResetPasswordPage.jsx';
import ProfilePage from '../../pages/ProfilePage/ProfilePage.jsx';
import IngredientPage from '../../pages/IngredientPage/IngredientPage.jsx';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage.jsx';
import FeedPage from '../../pages/FeedPage/FeedPage';
import OrderFeedInfo from '../OrderFeedInfo/OrderFeedInfo';
import OrderFeedInfoPage from '../../pages/OrderFeedInfoPage/OrderFeedInfoPage';
import ProfileFormPage from '../../pages/ProfileFormPage/ProfileFormPage';
import ProfileOrdersPage from '../../pages/ProfileOrdersPage/ProfileOrdersPage';

const AppRoutes = () => {
  const location = useLocation();
  const background = location.state && location.state.modal;

  return (
    <Routes location={location}>
      {!background && (<Route path="/ingredients/:id" element={<IngredientPage/>}/>)}
      {!background && (<Route path="/feed/:id" element={<OrderFeedInfoPage />} />)}
      <Route path="/" element={<MainPage />} location={background || location}>
        <Route path="ingredients/:id" element={<IngredientPage />} />
      </Route>
      <Route path="/login" element={<OnlyUnauthProtected children={<LoginPage />} />} />
      <Route path="/register" element={<OnlyUnauthProtected children={<RegistrationPage />} />} />
      <Route path="/forgot-password" element={<OnlyUnauthProtected children={<ForgotPasswordPage />} />} />
      <Route path="/reset-password" element={<OnlyUnauthProtected children={<ResetPasswordPage />} />} />
      <Route path="/profile" element={<OnlyAuthProtected children={<ProfilePage />} />}>
        <Route index element={<ProfileFormPage />} />
        <Route path="orders" element={<ProfileOrdersPage />}>
          <Route path=":id" element={<OrderFeedInfo />}/>
        </Route>
      </Route> 
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/feed" element={<FeedPage />}>
        <Route path=":id" element={<OrderFeedInfo />}/>
      </Route>
    </Routes>
  );
};

export default AppRoutes;