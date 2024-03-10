import { useMemo } from "react";
import { useDrag } from "react-dnd";
import { useNavigate, useMatch, useLocation, NavigateFunction, Location, PathMatch } from "react-router-dom";

import { TIngredient, useAppDispatch, useAppSelector, RootState, TIngredientsData } from "../../services/types/types.tsx"
import { passData, resetData } from "../../services/actions/modalIngredientAction.ts";

import itemStyle from './IngredientItem.module.css'

import { CurrencyIcon, Counter  } from '@ya.praktikum/react-developer-burger-ui-components';

import Modal from "../Modal/Modal.tsx";
import IngredientDetails from "../IngredientDetails/IngredientDetails.tsx";

type IngredientItemProps = {
  data: TIngredient;
};

const IngredientItem = ({data}: IngredientItemProps) => {

  const navigate: NavigateFunction = useNavigate();
  const location: Location = useLocation();
  const match: PathMatch<"id"> | null = useMatch('ingredients/:id');
  const { id } = match?.params || {id: null};
  const background: boolean = location.state?.modal && id === data._id;

  const getIngredientsData = (state: RootState) => state.orderList;
  const ingredientsData = useAppSelector(getIngredientsData);
  const { bunItem, ingredientsList } = ingredientsData as TIngredientsData;

  const dispatch = useAppDispatch();

  const handleOpenModal = () => {
    dispatch(passData(data));
  }

  const handleCloseModal = () => {
    dispatch(resetData());
    navigate(-1); 
  }

  const urlOpenModal = () => {
    if (id !== data._id) {
      navigate(`/ingredients/${data._id}`, { state: { modal: true, background: location } })
    } else {
      handleOpenModal()
    }
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
    <li className={itemStyle.item} onClick={urlOpenModal} style={{opacity}} ref={dragRef}>
      <img src={data.image} alt={data.name}></img>
      {counter > 0 && (<Counter count={counter} size={counter > 99 ? "small" : "default"} extraClass="m-1"/>)}
      <div className={itemStyle.price}>
        <p className="text text_type_digits-default">{data.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{data.name}</p>

      {background && (
          <Modal closePopup={handleCloseModal}>
            <IngredientDetails />
          </Modal>
        )}

    </li>
  );
}

export default IngredientItem;

// удалил closePopup={handleCloseModal} из IngredientDetails (<IngredientDetails closePopup={handleCloseModal} />)