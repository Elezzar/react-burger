import { useEffect, useMemo } from "react";
import  { useAppDispatch, useAppSelector, RootState, TOrder } from "../../services/types/types.tsx";

import { WS_CONNECTION_START, WS_CLOSE_CONNECTION } from "../../services/actions/wsFeedAction";

import FeedPageStyle from './FeedPage.module.css'
import OrderFeed from "../../components/OrderFeed/OrderFeed";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner.tsx";
import OrderStatus from "../../components/OrderStatus/OrderStatus";
import OrdersTotal from "../../components/OrdersTotal/OrdersTotal";

const FeedPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START 
    });
    return () => {
      dispatch({
        type: WS_CLOSE_CONNECTION
      })
    }
  }, [dispatch]);

  const ordersWSData = useAppSelector((state: RootState) => state.wsOrders.orders) as unknown as TOrder[]; 
  const totalOrdersWSData = useAppSelector((state: RootState) => state.wsOrders.total); 
  const todayOrdersWSData = useAppSelector((state: RootState) => state.wsOrders.totalToday);

  const ordersDone = useMemo(() =>
    ordersWSData.filter((item) => item.status === 'done'),
    [ordersWSData]
  )
  const ordersInProcess = useMemo(() =>
    ordersWSData.filter((item) => item.status !== 'done'),
    [ordersWSData]
  )

  if (!ordersWSData) {
    return <LoadingSpinner />;
  }

  return ( 
    <main className={FeedPageStyle.main}>
      <h1 className={`text text_type_main-large`}>Лента заказов</h1>
      <div className={FeedPageStyle.container}>
        <OrderFeed />
        <article className={FeedPageStyle.feedInfo}>
          <ul className={FeedPageStyle.status}>
            <OrderStatus title='Готовы' orders={ordersDone} done={true} />
            <OrderStatus title='В работе:' orders={ordersInProcess} done={false} />
          </ul>
          <ul className={FeedPageStyle.total}>
            <OrdersTotal title='Выполнено за все время:' number={totalOrdersWSData}/>
            <OrdersTotal title='Выполнено за сегодня:' number={todayOrdersWSData}/>
          </ul>
        </article>
      </div>
    </main>
  );
}

export default FeedPage;