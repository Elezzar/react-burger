import itemsStiles from './IngredientItems.module.css'

import { TIngredient } from '../../services/types/types.tsx';

import IngredientItem from '../IngredientItem/IngredientItem.tsx'

import { forwardRef, ForwardedRef } from "react";

type IngredientItemsProps = {
  ingredientData: TIngredient[]; 
}
const IngredientItems = forwardRef<HTMLUListElement, IngredientItemsProps>(
  (props: IngredientItemsProps, ref: ForwardedRef<HTMLUListElement>) => {
  const ingredientsList = props.ingredientData


  return (  
    <ul className={`pt-6 pl-4 ${itemsStiles.items}`} ref={ref}>
      {ingredientsList.map(function(ingredient) {
        return (
          <IngredientItem 
          data={ingredient}
          key={ingredient._id}
          />
        )
      })}
    </ul>
  );
})

export default IngredientItems;