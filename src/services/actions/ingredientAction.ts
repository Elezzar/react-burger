import { TIngredient } from "../types/types.tsx";

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_BUN = 'ADD_BUN';
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const RESET_INGREDIENTS = 'RESET_INGREDIENTS';

export type TAddIngredientAction = {
  type: typeof ADD_INGREDIENT,
  payload: TIngredient
}

export type TAddBunAction = {
  type: typeof ADD_BUN,
  payload: TIngredient
}

export type TMoveIngredientAction = {
  type: typeof MOVE_INGREDIENT,
  payload: {
    dragElIndex: number,
    hoverElIndex: number
  }
}

export type TDeleteIngredientAction = {
  type: typeof DELETE_INGREDIENT,
  payload: number
}

export type TResetIngredientsAction = {
  type: typeof RESET_INGREDIENTS
}

export const addIngredient = (ingredient: TIngredient): TAddIngredientAction => {
  return {
    type: ADD_INGREDIENT,
    payload: ingredient
  };
};

export const addBun = (bun: TIngredient): TAddBunAction => {
  return {
    type: ADD_BUN,
    payload: bun
  };
};

export const moveIngredient = (indices: { dragElIndex: number, hoverElIndex: number }): TMoveIngredientAction => {
  return {
    type: MOVE_INGREDIENT,
    payload: indices
  };
};

export const deleteIngredient = (index: number): TDeleteIngredientAction => {
  return {
    type: DELETE_INGREDIENT,
    payload: index
  };
};

export const resetIngredients = (): TResetIngredientsAction => {
  return {
    type: RESET_INGREDIENTS
  };
};

export type TDraggedIngredientsAction = TAddIngredientAction | TAddBunAction | TMoveIngredientAction | TDeleteIngredientAction | TResetIngredientsAction