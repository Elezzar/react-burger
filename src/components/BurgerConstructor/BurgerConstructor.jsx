import React from "react";
import PropTypes from 'prop-types';
import BurgerPropTypes from '../../utils/BurgerPropTypes.jsx';

import constructorStyles from './BurgerConstructor.module.css'

import { ConstructorElement, 
  DragIcon, 
  Button, 
  CurrencyIcon } 
  from '@ya.praktikum/react-developer-burger-ui-components';

import Modal from "../Modal/Modal.jsx";
import OrderDetails from "../OrderDetails/OrderDetails.jsx";

const BurgerConstructor = ({ingredientData}) => {
  const [open, setOpen] = React.useState(false)

  const showModal = () => {
    setOpen(true);
  }

  const hideModal = () => {
    setOpen(false);
  }

  return (  
    <section className={constructorStyles.section}>
      <ul className={`pl-4 ${constructorStyles.list}`}>
        <li className={constructorStyles.item}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Флюоресцентная булка R2-D3 (верх)"
            price={988}
            thumbnail={'https://code.s3.yandex.net/react/code/bun-01.png'}
          />
        </li>
        <li className={constructorStyles.filling}>
          <ul className={`pl-4 ${constructorStyles.list}`}>
            {ingredientData.map(item => {
              if(item.type !== 'bun') {
                return (
                  <li key={item._id}className={constructorStyles.item}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                      text={item.name}
                      price={item.price}
                      thumbnail={item.image}
                    />
                  </li>
                )
              }
            })}
          </ul>
        </li>        
        <li className={constructorStyles.item}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Флюоресцентная булка R2-D3 (низ)"
            price={988}
            thumbnail={'https://code.s3.yandex.net/react/code/bun-01.png'}
          />
        </li>
      </ul>
      <div className={`pr-4 ${constructorStyles.order}`}>
        <div className={constructorStyles.price}>
        <p className='text text_type_digits-medium'>7801</p>
          <CurrencyIcon type={'primary'} />
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={showModal}>
          Оформить заказ
        </Button>
      </div>

      {open && (
          <Modal closePopup={hideModal}>
            <OrderDetails />
          </Modal>
        )}
    </section>
  );
}

BurgerConstructor.propTypes = {
  ingredientData: PropTypes.arrayOf(BurgerPropTypes).isRequired
}

export default BurgerConstructor;