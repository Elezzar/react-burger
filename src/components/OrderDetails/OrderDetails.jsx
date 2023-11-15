import orderStyle from './OrderDetails.module.css'

import readyImage from '../../images/ready.svg'

import { useSelector } from 'react-redux';

const OrderDetails = () => {

  const orderNumber =  useSelector(store => store.orders.number);

  return ( 
    <div className={orderStyle.content}>
      <p className={`text text_type_digits-large ${orderStyle.number}`}>{orderNumber}</p>
      <p className="text text_type_main-medium mt-8 mb-15">идентификатор заказа</p>
      <div style={{
        width: '120px',
        height: '120px',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url(${readyImage})`,
        }}></div>
      <p className="text text_type_main-default mt-15 mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
    </div>
  );
}

export default OrderDetails;