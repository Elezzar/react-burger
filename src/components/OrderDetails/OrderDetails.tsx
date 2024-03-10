import orderStyle from './OrderDetails.module.css'

import { useAppSelector, RootState } from '../../services/types/types.tsx';

const OrderDetails = () => {

  const orderNumber =  useAppSelector((state: RootState) => state.orders.number);

  return ( 
    <div className={orderStyle.content}>
      <p className={`text text_type_digits-large ${orderStyle.number}`}>{orderNumber}</p>
      <p className="text text_type_main-medium mt-8 mb-15">идентификатор заказа</p>
      <div className={orderStyle.image}></div>
      <p className="text text_type_main-default mt-15 mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
    </div>
  );
}

export default OrderDetails;