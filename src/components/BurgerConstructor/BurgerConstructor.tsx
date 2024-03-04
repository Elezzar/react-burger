import { useMemo, useState } from "react";
import { useNavigate, useLocation, Location, NavigateFunction } from "react-router-dom";

import constructorStyles from "./BurgerConstructor.module.css";

import { ConstructorElement, Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import IngredientElement from "../IngredientElement/IngredientElement.tsx";
import Modal from "../Modal/Modal.tsx";
import OrderDetails from "../OrderDetails/OrderDetails.tsx";

import { loadOrder, clearOrder } from "../../services/actions/loadOrder.ts";
import { addBun, addIngredient, resetIngredients } from '../../services/actions/ingredientAction.ts';

import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner.tsx";

import { useAppDispatch, useAppSelector, RootState, TDraggableIngredient, TIngredientsData, TDraggableIngredientWithKey } from "../../services/types/types.tsx";

const BurgerConstructor = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const location: Location = useLocation();
  const navigate: NavigateFunction = useNavigate();

  const getIngredientsData = (state: RootState) => state.orderList;
  const ingredientsData = useAppSelector(getIngredientsData);
  const { bunItem, ingredientsList } = ingredientsData as TIngredientsData;

  const getOrderNumber = (state: RootState): string | null => state.orders.number;
  const orderNumber = useAppSelector(getOrderNumber);

  const userName = useAppSelector((state: RootState): string => state.user.name);

  const totalPrice: number = useMemo(() => {
    const bunPrice = () => {
      if (bunItem === null || bunItem === undefined) {
        return 0; 
      }

      if (bunItem.price) {
        return bunItem.price * 2;
      }

      return 0;
    }

    return ingredientsList.reduce((acc, ingredient) => {
      if (ingredient.price) {
        return acc + ingredient.price;
      }
      return acc;
    }, bunPrice());
    
  }, [ingredientsList, bunItem]);

  const [ , dropTarget] = useDrop({
    accept: 'ingredients',
    drop(item: TDraggableIngredient) {


      if (item.data.type === 'bun') {
        dispatch(addBun(item.data));
      } else {
        const key = uuidv4();      
        const ingredientWithKey: TDraggableIngredientWithKey = {
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
    setLoading(true); 

    const bunID = bunItem._id;
    const components = ingredientsList.map(ingredient => ingredient._id);
    const burgerComponentsID = [bunID,...components,bunID];

    if (userName) {
      dispatch(loadOrder(burgerComponentsID))
        .then(() => {
          setLoading(false); 
        })
        .catch((error) => {
          console.error(`Произошла ошибка: ${error}`);
          setLoading(false); 
        });
    } else {
      navigate(
        '/login', {
          replace: true,
          state: { from: location.pathname }
        }
      )
    }
    
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
          <p className={`${constructorStyles.item} text text_type_main-defaul p-4`}>Перетащите ингредиенты в зону конструктора</p>
          <div className={constructorStyles.box}></div>
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
      
      {loading && <LoadingSpinner />}

      {orderNumber && (
        <Modal closePopup={handleCloseModal}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
};

export default BurgerConstructor;
