import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";
import { moveIngredient, deleteIngredient} from "../../services/actions/ingredientAction.ts";

import elementStyle from "./IngredientElement.module.css"

import { useAppDispatch, TDraggableIngredientWithKey } from '../../services/types/types.tsx';

type IngredientElementProps = {
  item: TDraggableIngredientWithKey;
  index: number;
};

type DragItem = {
  index: number;
  key: string;
};

const IngredientElement = ({item, index}: IngredientElementProps) => {

  const dispatch = useAppDispatch();
  const ref = useRef(null);
  const { key } = item;


  const handleDelete = (index: number) => {
    dispatch(deleteIngredient(index))
  }

  const [{ opacity }, drag] = useDrag({
    type: 'item',
    item: { key, index },
    collect: (monitor) => {
      return {
        opacity: monitor.isDragging() ? 0.8 : 1,
      };
    },
  });

  const [, drop] = useDrop({
    accept: 'item',
    hover(item: DragItem) {
      if (!ref.current) {
        return;
      }
      const dragElIndex = item.index;
      const hoverElIndex = index;
      dispatch(moveIngredient({dragElIndex, hoverElIndex}));
      item.index = hoverElIndex;
    },
  });

  drag(drop(ref));

  return(
    <li  className={elementStyle.item} ref={ref} style={{opacity}}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => {handleDelete(index)}}
      />
    </li>
  )
}

export default IngredientElement;
