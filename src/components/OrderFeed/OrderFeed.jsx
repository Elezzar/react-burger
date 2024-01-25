import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

import OrderFeedStyles from './OrderFeed.module.css'

import IngredientsFeedList from "../IngredientsFeedList/IngredientsFeedList";
import Modal from "../Modal/Modal";
import OrderFeedInfo from "../OrderFeedInfo/OrderFeedInfo";

import { setDate, sumPrice } from "../../utils/utils";

const OrderFeed = () => {
  const ordersData = useSelector(store => store.wsOrders.orders) 
  const ingredientsData = useSelector(state => state.ingredients.ingredients)

  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state?.modal;

  const closeModal = () => {
    navigate(-1)
  }

  return ( 
    <article className={OrderFeedStyles.container}>
      <ul className={OrderFeedStyles.list}>
        {ordersData.map((order) => {
          const orderId = order._id;
          const ingredients = order.ingredients;
          const time = <FormattedDate date={new Date(order?.createdAt)} />;

          return (
            <li className={OrderFeedStyles.item} key={order._id} 
            onClick={() => {
              if (!background) {
                navigate(`/feed/${orderId}`, { state: { modal: true, background: location } });
              }
            }}>
              <div className={`${OrderFeedStyles.box} mb-6`}>
                <p className="text text_type_digits-default">#{order.number}</p>
                <p className="text text_type_main-default text_color_inactive">{time}{setDate(order.createdAt)}</p>
              </div>
              <h2 className="text text_type_main-medium mb-6">{order.name}</h2>
              <div className={OrderFeedStyles.box}>
                <IngredientsFeedList props={ingredients}/>
                <div className={OrderFeedStyles.price}>
                  <p className="text text_type_digits-default">{sumPrice(ingredients, ingredientsData)}</p>
                  <CurrencyIcon type="primary" />
                </div>
              </div>
            </li>
          )
        })}
      </ul>
      {background && (
        <Modal closePopup={closeModal}>
          <OrderFeedInfo />
        </Modal>
      )}
    </article>
  );
}

export default OrderFeed;