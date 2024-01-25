import PropTypes from 'prop-types';

import OrderStatusStyles from './OrderStatus.module.css'

const OrderStatus = (props) => {
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

OrderStatus.propTypes = {
  title: PropTypes.string.isRequired,
  orders: PropTypes.arrayOf(
    PropTypes.shape({number: PropTypes.number.isRequired})).isRequired,
  done: PropTypes.bool.isRequired,
};