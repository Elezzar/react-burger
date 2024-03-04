import { useEffect } from 'react';
import { useAppDispatch, useAppSelector, RootState, TOrder } from '../../services/types/types.tsx';
import { useLocation, useParams, Location } from 'react-router-dom';

import { getCookie } from '../../utils/cookies';
import { WS_CONNECTION_START, WS_CLOSE_CONNECTION } from '../../services/actions/wsFeedAction';
import { WS_CONNECTION_START_USER, WS_CONNECTION_CLOSED_USER, WsConnectionStartUser, WsConnectionClosedUser} from '../../services/actions/wsUserAction';

import OrderFeedInfoPageStyles from './OrderFeedInfoPage.module.css'

import OrderFeedInfo from '../../components/OrderFeedInfo/OrderFeedInfo';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner.tsx';

const OrderFeedInfoPage = () => {
  const location: Location = useLocation();
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();

  const ordersData = useAppSelector((state: RootState) => state.wsOrders.orders) as unknown as TOrder[];
  const userOrdersWSData = useAppSelector((state: RootState) => state.wsUserFeed.orders) as unknown as TOrder[];
  const orders = location.pathname.includes('feed') ? ordersData : userOrdersWSData;
  const order = orders.find(order => order._id === id);

  useEffect(() => {
    if (location.pathname.includes('/feed')) {
      dispatch({
        type: WS_CONNECTION_START
      })
    } else {
      dispatch ({
        type: WS_CONNECTION_START_USER,
        payload: getCookie("accessToken")
      } as WsConnectionStartUser)
    } return () => {
      if (location.pathname.includes('/feed')) {
        dispatch({
          type: WS_CLOSE_CONNECTION
        })
      } else {
        dispatch({
          type: WS_CONNECTION_CLOSED_USER,
          payload: getCookie("accessToken")
        } as WsConnectionClosedUser)
      }
    }
  }, [dispatch, location.pathname])

  if (!order) {
    return <LoadingSpinner />
  }

  return ( 
    <main className={OrderFeedInfoPageStyles.main}>
      <OrderFeedInfo />
    </main>
  );
}

export default OrderFeedInfoPage;