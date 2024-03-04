import { useAppSelector, RootState, TOrder } from '../../services/types/types';
import { useLocation, useParams, Location } from 'react-router-dom';

import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

import { setDate, sumPrice } from '../../utils/utils';

import OrderFeedInfoStyles from './OrderFeedInfo.module.css'

type IngredientCounts = { [ingredient: string]: number };

const OrderFeedInfo = () => {
  const ingredientsData = useAppSelector((state: RootState) => state.ingredients.ingredients);
  const ordersWSData = useAppSelector((state: RootState) => state.wsOrders.orders) as unknown as TOrder[];
  const userOrdersWSData = useAppSelector((state: RootState) => state.wsUserFeed.orders) as unknown as TOrder[];

  const {id} = useParams<{ id: string }>();
  
  const location: Location = useLocation();
  const checkLocation = location.pathname.includes('feed');
  const currentOrders = checkLocation === true ? ordersWSData : userOrdersWSData;
  const order = currentOrders.find(order => order._id === id);

  if (!order) return null;

  const orderStatus = order.status === 'done' ? 'Выполнен' : 'Готовится';

  const orderDate = <FormattedDate date={new Date(order.createdAt)} />
  const totalPrice = sumPrice(order.ingredients, ingredientsData);
  
  const countIngredients = (arr: string[]) => {
    return arr.reduce((counts: IngredientCounts, el: string) => {
      counts[el] = (counts[el] || 0) + 1;
      return counts;
    }, {});
  };

  const ingredientsCounted = countIngredients(order.ingredients);
  const ingredientsSorted = Object.keys(ingredientsCounted);
  const countSorted = Object.values(ingredientsCounted);

  return ( 
    <div className={OrderFeedInfoStyles.container}>
      <p className={`${OrderFeedInfoStyles.number} text text_type_digits-default mb-10`}>#{order.number}</p>
      <h2 className="text text_type_main-medium mb-2">{order.name}</h2>
      <p className={`${OrderFeedInfoStyles.status} text text_type_main-default mb-15`}>{orderStatus}</p>
      <h2 className="text text_type_main-medium mb-5">Состав:</h2>
      <ul className={OrderFeedInfoStyles.list}>
        {ingredientsSorted.map((ingredient, i) => {
          const price = ingredientsData.find((element) => element._id === ingredient)?.price;
          return (
            <li className={OrderFeedInfoStyles.ingredients} key={i}>
              <div className={OrderFeedInfoStyles.box}>
                <img className={OrderFeedInfoStyles.image}
                  src={ingredientsData.find((element) => element._id === ingredient)?.image_mobile} 
                  alt={ingredientsData.find((element) => element._id === ingredient)?.name} />
                <p className={`${OrderFeedInfoStyles.text} text text_type_main-default`}>{ingredientsData.find((element) => element._id === ingredient)?.name}</p>
              </div>
              <div className={OrderFeedInfoStyles.priceBox}>
                <p className="text text_type_digits-default">{`${countSorted[i]} x ${price}`}</p>
                <CurrencyIcon type="primary" />
              </div>
            </li>
          )
        })}
      </ul>
      <div className={OrderFeedInfoStyles.infoBox}>
        <p className="text text_type_main-default text_color_inactive">{orderDate}{setDate(order.createdAt)}</p>
        <div className={OrderFeedInfoStyles.price}>
          <p className="text text_type_digits-default">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}

export default OrderFeedInfo;