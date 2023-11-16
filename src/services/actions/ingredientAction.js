export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_BUN = 'ADD_BUN';
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const RESET_INGREDIENTS = 'RESET_INGREDIENTS';

export const addIngredient = ingredient => {
  return {
    type: ADD_INGREDIENT,
    payload: ingredient
  };
};

export const addBun = bun => {
  return {
    type: ADD_BUN,
    payload: bun
  };
};

export const moveIngredient = indices => {
  return {
    type: MOVE_INGREDIENT,
    payload: indices
  };
};

export const deleteIngredient = index => {
  return {
    type: DELETE_INGREDIENT,
    payload: index
  };
};

export const resetIngredients = () => {
  return {
    type: RESET_INGREDIENTS
  };
};