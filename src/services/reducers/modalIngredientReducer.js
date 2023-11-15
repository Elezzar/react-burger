import { 
  OPEN_MODAL, 
  CLOSE_MODAL
} from "../actions/modalIngredientAction"

const initState = {
  ingredient: null,
}

export const modalIngredientReducer = (state = initState, action) => {
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