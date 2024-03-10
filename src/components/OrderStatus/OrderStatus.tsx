import OrderStatusStyles from './OrderStatus.module.css'

import { TOrder } from '../../services/types/types';

type OrderStatusProps = {
  title: string;
  orders: TOrder[];
  done: boolean;
}

const OrderStatus = (props: OrderStatusProps) => {
  return ( 
    <li className={OrderStatusStyles.container}>
      <h3 className="text text_type_main-medium mb-6">{props.title}</h3>
      <ul className={`${OrderStatusStyles.list} text text_type_digits-default`}>
        {props.orders.slice(0, 50).map((item) =>{
          return (
            <li className={`${OrderStatusStyles.item} ${props.done ? OrderStatusStyles.done : ''}`} key={item.number}>
              {item.number}
            </li>
          )
        })}
      </ul>
    </li>
  );
}

export default OrderStatus;