import React from "react";

import itemStyle from './IngredientItem.module.css'

import PropTypes from 'prop-types';
import BurgerPropTypes from '../../utils/BurgerPropTypes';

import { CurrencyIcon, Counter  } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from "../Modal/Modal";
import ModalIngredient from "../ModalIngredient/ModalIngredient";

const IngredientItem = ( {data} ) => {
  const [open, setOpen] = React.useState(false)

  const showModal = () => {
    setOpen(true);
  }

  const hideModal = () => {
    setOpen(false);
  }

  return (  
    <li className={itemStyle.item} onClick={showModal}>
      <img src={data.image} alt={data.name}></img>
      <Counter count={1} size="default" />
      <div className={itemStyle.price}>
        <p className="text text_type_digits-default">{data.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{data.name}</p>

      {open && (
          <Modal closePopup={hideModal}>
            <ModalIngredient ingredient={data}/>
          </Modal>
        )}

    </li>
  );
}

IngredientItem.propTypes = {
  data: PropTypes.arrayOf(BurgerPropTypes)
}

export default IngredientItem;