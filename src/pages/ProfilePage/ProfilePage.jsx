import { useDispatch } from 'react-redux';
import { NavLink, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';

import { logOutAction } from "../../services/actions/userAction";
import { getCookie } from "../../utils/cookies";

import ProfilePageStyles from './ProfilePage.module.css'
import OrderFeedInfoPage from '../OrderFeedInfoPage/OrderFeedInfoPage';
import Modal from '../../components/Modal/Modal';
import OrderFeedInfo from '../../components/OrderFeedInfo/OrderFeedInfo';

const ProfilePage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const location = useLocation();
  const background = location.state?.modal;

  const logoutHandler = () => {
    const refreshToken = getCookie('refreshToken');
    dispatch(logOutAction(refreshToken));
  }

  const closeModal = () => {
    navigate(-1)
  }

  return (params.id && !background) ?
  ( <OrderFeedInfoPage /> ) : (
    <main className={ProfilePageStyles.main}>
      <nav className={ProfilePageStyles.nav}>
        <ul className={ProfilePageStyles.list}>
          <li className={ProfilePageStyles.item}>
            <NavLink className={({ isActive }) => `${ProfilePageStyles.navlink}
            ${isActive ? ProfilePageStyles.active : "text_color_inactive"}`} end to=".">Профиль</NavLink>
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
      <Outlet />
      {background && location.pathname !== "/feed" && (
        <Modal closePopup={closeModal}>
          <OrderFeedInfo />
        </Modal>
      )}
    </main>
  );
}

export default ProfilePage;