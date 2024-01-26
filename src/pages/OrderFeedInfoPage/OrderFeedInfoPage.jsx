import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';

import { getCookie } from '../../utils/cookies';
import { WS_CONNECTION_START, WS_CLOSE_CONNECTION } from '../../services/actions/wsFeedAction';
import { WS_CONNECTION_START_USER, WS_CONNECTION_CLOSED_USER } from '../../services/actions/wsUserAction';

import OrderFeedInfoPageStyles from './OrderFeedInfoPage.module.css'

import OrderFeedInfo from '../../components/OrderFeedInfo/OrderFeedInfo';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

const OrderFeedInfoPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { id } = useParams();

  const ordersData = useSelector(store => store.wsOrders.orders)
  const userOrdersWSData = useSelector(store => store.wsUserFeed.orders);
  const orders = location.pathname.includes('feed') ? ordersData : userOrdersWSData;
  const order = orders.find(order => order._id === id);

  useEffect(() => {
    if (location.pathname.includes('/feed')) {
      dispatch({
        type: WS_CONNECTION_START
      })
    } else {
      dispatch ({
        type:WS_CONNECTION_START_USER,
        payload: getCookie("accessToken")
      })
    } return () => {
      if (location.pathname.includes('/feed')) {
        dispatch({
          type: WS_CLOSE_CONNECTION
        })
      } else {
        dispatch({
          type: WS_CONNECTION_CLOSED_USER,
          payload: getCookie("accessToken")
        })
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