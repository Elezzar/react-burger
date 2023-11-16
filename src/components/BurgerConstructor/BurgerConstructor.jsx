import { useMemo } from "react";
import { useSelector, useDispatch } from 'react-redux';

import constructorStyles from "./BurgerConstructor.module.css";

import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import IngredientElement from "../IngredientElement/IngredientElement";
import Modal from "../Modal/Modal.jsx";
import OrderDetails from "../OrderDetails/OrderDetails.jsx";

import { loadOrder, clearOrder } from "../../services/actions/loadOrder";
import { addBun, addIngredient, resetIngredients } from '../../services/actions/ingredientAction';

import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';

const BurgerConstructor = () => {
  
  const dispatch = useDispatch();

  const getIngredientsData = state => state.orderList;
  const ingredientsData = useSelector(getIngredientsData);
  const { bunItem, ingredientsList } = ingredientsData;

  const getOrderNumber = state => state.orders.number;
  const orderNumber = useSelector(getOrderNumber);

  const bunPrice = () => {
    if (bunItem === null || bunItem === undefined) {
      return 0;
    } else {
      return bunItem.price * 2;
    }
  }

  const totalPrice = useMemo(() => {
    return ingredientsList.reduce((acc, ingredient) => acc + ingredient.price, (bunPrice()))
  }, [ingredientsList, bunPrice])

  const [ , dropTarget] = useDrop({
    accept: 'ingredients',
    drop(item) {
      if (item.data.type === 'bun') {
        dispatch(addBun(item.data));
      } else {
        const key = uuidv4();      
        const ingredientWithKey = {
          ...item.data,
          key
        }
        dispatch(addIngredient(ingredientWithKey));
      }
    },
  });

  const handleCloseModal = () => {
    dispatch(clearOrder());
    dispatch(resetIngredients());
  };
  const handleOpenModal = () => {
    const bunID = bunItem._id;
    const components = ingredientsList.map(ingredient => ingredient._id);
    const burgerComponentsID = [bunID,...components,bunID];
    dispatch(loadOrder(burgerComponentsID));
  };

  return (
    <section className={constructorStyles.section} ref={dropTarget}>
      {bunItem || ingredientsList.length > 0 ? (
        <ul className={`pl-4 ${constructorStyles.list}`}>
          <li className={constructorStyles.item}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bunItem?.name} (верх)`}
              price={bunItem?.price}
              thumbnail={bunItem?.image}
            />
          </li>
          <li className={constructorStyles.filling}>
            <ul className={`pl-4 ${constructorStyles.list}`}>
              {ingredientsList.map((ingredient, index) => {
                return (
                  <IngredientElement item={ingredient} index={index} key={ingredient.key}/>
                );
              })}
            </ul>
          </li>
          <li className={constructorStyles.item}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bunItem?.name} (низ)`}
              price={bunItem?.price}
              thumbnail={bunItem?.image}
            />
          </li>
        </ul>

      ) : (
        <>
          <p className={`${constructorStyles.item} text text_type_main-defaul p-4`}>Перетащите ингридиенты в зону конструктора</p>
        </>
      )}

      <div className={`pr-4 ${constructorStyles.order}`}>
        <div className={constructorStyles.price}>
          <p className="text text_type_digits-medium">{totalPrice}</p>
          <CurrencyIcon type={"primary"} />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={handleOpenModal}
          disabled={bunItem && ingredientsList.length > 0 ? false : true}
        >
          Оформить заказ
        </Button>
      </div>

      {orderNumber && (
        <Modal closePopup={handleCloseModal}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
};

export default BurgerConstructor;
