import { 
  GET_FEED, 
  GET_FEED_FAILED, 
  GET_FEED_SUCCESS,
  TIngredientsAction 
} from "../actions/loadIngredients.ts";

import { TIngredient } from "../types/types.tsx";

type FeedState = {
  loadIngredients: boolean;
  errorLoadingIngredients: boolean;
  ingredientsLoaded: boolean;
  ingredients: TIngredient[]; 
};
const initState: FeedState  = {
  loadIngredients: false,
  errorLoadingIngredients: false,
  ingredientsLoaded: false,
  ingredients: []
}

export const ingredientsDataReducer = (
  state: FeedState = initState,
  action: TIngredientsAction
): FeedState => {
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
            return state as FeedState
        }
    }
}  