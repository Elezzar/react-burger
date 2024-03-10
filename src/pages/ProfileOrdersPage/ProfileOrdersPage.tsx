import { useEffect } from 'react';
import { useAppDispatch, useAppSelector, RootState, TOrder } from '../../services/types/types';
import { useLocation, useNavigate, Location, NavigateFunction } from 'react-router-dom';

import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

import { getCookie } from '../../utils/cookies';
import { setDate, sumPrice } from '../../utils/utils';
import { WS_CONNECTION_START_USER, WS_CLOSE_CONNECTION_USER, WsConnectionStartUser, WsCloseConnectionUser } from '../../services/actions/wsUserAction';

import ProfileOrdersPageStyles from './ProfileOrdersPage.module.css'

import IngredientsFeedList from '../../components/IngredientsFeedList/IngredientsFeedList';

const ProfileOrdersPage = () => {
  const dispatch = useAppDispatch();
  const location: Location = useLocation();
  const navigate: NavigateFunction = useNavigate();

  const userDataName = useAppSelector((state: RootState) => state.user.name);
  const ingredientsData = useAppSelector((state: RootState) => state.ingredients.ingredients);
  const userOrdersWSData = useAppSelector((state: RootState) => state.wsUserFeed.orders) as unknown as TOrder[];
  
  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START_USER,
      payload: getCookie("accessToken")
    } as WsConnectionStartUser);
    return () => {
      dispatch({
        type: WS_CLOSE_CONNECTION_USER,
        payload: getCookie("accessToken")
      } as WsCloseConnectionUser);
    };
  }, [dispatch, userDataName]);
  
  return ( 
    <article className={ProfileOrdersPageStyles.container}>
      <ul className={ProfileOrdersPageStyles.list}>
        {userOrdersWSData.map((order) => {
          const orderId = order._id;
          const ingredients = order.ingredients;
          const time = <FormattedDate date={new Date(order?.createdAt)} />;
          const orderStatus = order.status === 'done' ? 'Выполнен' : 'Готовится';

          return (
            <li className={ProfileOrdersPageStyles.item} 
            key={orderId} onClick={() => {navigate(`/profile/orders/${orderId}`, { state: { modal: true, background: location }} )}}>
              <div className={`${ProfileOrdersPageStyles.box} mb-6`}>
                <p className="text text_type_digits-default">#{order.number}</p>
                <p className="text text_type_main-default text_color_inactive">{time}{setDate(order.createdAt)}</p>
              </div>
              <h2 className="text text_type_main-medium mb-2">{order.name}</h2>
              <p className={`${ProfileOrdersPageStyles.status} text text_type_main-default mb-6 `}>{orderStatus}</p>
              <div className={ProfileOrdersPageStyles.box}>
                <IngredientsFeedList props={ingredients} />
                <div className={ProfileOrdersPageStyles.price}>
                  <p className="text text_type_digits-default">{sumPrice(order.ingredients, ingredientsData)}</p>
                  <CurrencyIcon type="primary" />
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </article>
  );
}

export default ProfileOrdersPage;