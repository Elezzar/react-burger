import { Routes, Route, useLocation, Location } from 'react-router-dom';

import { OnlyAuthProtected, OnlyUnauthProtected } from '../ProtectedRoute/ProtectedRoute.tsx';


import MainPage from '../../pages/MainPage/MainPage.tsx';
import LoginPage from '../../pages/LoginPage/LoginPage.tsx';
import RegistrationPage from '../../pages/RegistrationPage/RegistrationPage.tsx'
import ForgotPasswordPage from '../../pages/ForgotPasswordPage/ForgotPasswordPage.tsx';
import ResetPasswordPage from '../../pages/ResetPasswordPage/ResetPasswordPage.tsx';
import ProfilePage from '../../pages/ProfilePage/ProfilePage.tsx';
import IngredientPage from '../../pages/IngredientPage/IngredientPage.tsx';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage.tsx';
import FeedPage from '../../pages/FeedPage/FeedPage.tsx';
import OrderFeedInfo from '../OrderFeedInfo/OrderFeedInfo.tsx';
import OrderFeedInfoPage from '../../pages/OrderFeedInfoPage/OrderFeedInfoPage.tsx';
import ProfileFormPage from '../../pages/ProfileFormPage/ProfileFormPage.tsx';
import ProfileOrdersPage from '../../pages/ProfileOrdersPage/ProfileOrdersPage.tsx';

const AppRoutes = () => {
  const location: Location = useLocation();
  const background: boolean = location.state && location.state.modal;

  return (
    <Routes location={location}>
      {!background && (<Route path="/ingredients/:id" element={<IngredientPage/>}/>)}
      {!background && (<Route path="/feed/:id" element={<OrderFeedInfoPage />} />)}
      <Route path="/" element={<MainPage />} >
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

//location={background || location} убрал из <Route path="/" element={<MainPage />} location={background || location}>