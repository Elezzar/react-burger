import { 
  OPEN_MODAL, 
  CLOSE_MODAL,
  TModalIngredientActions
} from "../actions/modalIngredientAction.ts"

import { TIngredient } from "../types/types.tsx"

export type TModalIngredientState = {
  ingredient: TIngredient | null
}

const initState: TModalIngredientState = {
  ingredient: null,
}

export const modalIngredientReducer = (state = initState, action: TModalIngredientActions) => {
  switch (action.type) {
    case OPEN_MODAL: {
      return {
        ...state,
        ingredient: action.ingredient
      }
    }

    case CLOSE_MODAL: {
      return {
        ...state,
        ingredient: null
      }
    }

    default: {
      return state
    }
  }
}