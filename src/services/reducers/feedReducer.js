import { 
  GET_FEED, 
  GET_FEED_FAILED, 
  GET_FEED_SUCCESS 
} from "../actions/loadIngredients";

const initState = {
  loadIngredients: false,
  errorLoadingIngredients: false,
  ingredientsLoaded: false,
  ingredients: []
}

export const ingredientsReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_FEED: {
      return {
        ...state,
        loadIngredients: true,
        errorLoadingIngredients: false,
        ingredientsLoaded: false,
      };
    }
    case GET_FEED_SUCCESS: {
      return { 
        ...state, 
        ingredients: action.ingredients, 
        loadIngredients: false,
        errorLoadingIngredients: false,
        ingredientsLoaded: true,
            };
    }
    case GET_FEED_FAILED: {
      return { 
        ...state, 
        errorLoadingIngredients: true, 
        loadIngredients: false, 
        ingredientsLoaded: false
            };
    }
        default: {
            return state
        }
    }
} 