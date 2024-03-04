import {
  ADD_INGREDIENT,
  ADD_BUN,
  MOVE_INGREDIENT,
  DELETE_INGREDIENT,
  RESET_INGREDIENTS,
  TDraggedIngredientsAction
} from '../actions/ingredientAction.ts';

import { TIngredient } from '../types/types.tsx';

type TIngredientState = {
  bunItem: TIngredient | null;
  ingredientsList: TIngredient[];
}

const initialState: TIngredientState = {
  bunItem: null,
  ingredientsList: [],
}

const ingredientReducer = (state = initialState, action: TDraggedIngredientsAction): TIngredientState => {
  switch (action.type) {
    case ADD_INGREDIENT:
      return {
        ...state,
        ingredientsList: [...state.ingredientsList, {
          ...action.payload,
        }],
      };
    
    case ADD_BUN:
      return { 
        ...state, 
        bunItem: { 
          ...action.payload, 
          type: 'bun' 
        } 
      };
    
    case MOVE_INGREDIENT:
      const dragConstructor = [...state.ingredientsList];
      dragConstructor.splice(
        action.payload.dragElIndex,
        0,
        dragConstructor.splice(action.payload.hoverElIndex, 1)[0]
      );
      return {
        ...state,
        ingredientsList: dragConstructor,
      };

    case DELETE_INGREDIENT:
      const newList = [...state.ingredientsList];
      newList.splice(action.payload, 1);
      return {
        ...state,
        ingredientsList: newList,
      };

    case RESET_INGREDIENTS:
      return {
        ...state,
        ingredientsList: [],
        bunItem: null,
      };
    
    default:
      return state;
  }
}

export default ingredientReducer;