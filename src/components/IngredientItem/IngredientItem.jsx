import React from "react";

import itemStyle from './IngredientItem.module.css'

import BurgerPropTypes from "../../utils/BurgerPropTypes.jsx";

import { CurrencyIcon, Counter  } from '@ya.praktikum/react-developer-burger-ui-components';

import Modal from "../Modal/Modal.jsx";
import IngredientDetails from "../IngredientDetails/IngredientDetails.jsx";

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
            <IngredientDetails ingredient={data}/>
          </Modal>
        )}

    </li>
  );
}

IngredientItem.propTypes = {
  data: BurgerPropTypes.isRequired
}

export default IngredientItem;