import { useDispatch, useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import { useState, useMemo } from "react";

import { passData, resetData } from "../../services/actions/modalIngredientAction";

import itemStyle from './IngredientItem.module.css'

import BurgerPropTypes from "../../utils/BurgerPropTypes.jsx";

import { CurrencyIcon, Counter  } from '@ya.praktikum/react-developer-burger-ui-components';

import Modal from "../Modal/Modal.jsx";
import IngredientDetails from "../IngredientDetails/IngredientDetails.jsx";

const IngredientItem = ({data}) => {

  const [showModal, setShowModal] = useState(false);


  const getIngredientsData = state => state.orderList;
  const ingredientsData = useSelector(getIngredientsData);
  const { bunItem, ingredientsList } = ingredientsData;

  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(passData(data));
    setShowModal(true);
  }

  const handleCloseModal = () => {
    dispatch(resetData());
    setShowModal(false);  
  }

  const [{opacity}, dragRef] = useDrag({
    type: 'ingredients',
    item: { data },
    collect: monitor => ({
      opacity: monitor.isDragging()? 0.2 : 1
    })
  });

  const counter = useMemo(() => {
    let count = 0;
    for (let { _id } of ingredientsList) {
      if (_id === data._id) {
        count++
      }
    }
    if (bunItem && bunItem._id === data._id) {
      count += 2;
    }
    return count;
  }, [bunItem, ingredientsList, data._id])


  return (  
    <li className={itemStyle.item} onClick={handleOpenModal} style={{opacity}} ref={dragRef}>
      <img src={data.image} alt={data.name}></img>
      {counter > 0 && (<Counter count={counter} size={counter > 99 ? "small" : "default"} extraClass="m-1"/>)}
      <div className={itemStyle.price}>
        <p className="text text_type_digits-default">{data.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{data.name}</p>

      {showModal && (
          <Modal closePopup={handleCloseModal}>
            <IngredientDetails closePopup={handleCloseModal} ingredient={data}/>
          </Modal>
        )}

    </li>
  );
}

IngredientItem.propTypes = {
  data: BurgerPropTypes.isRequired
}

export default IngredientItem;