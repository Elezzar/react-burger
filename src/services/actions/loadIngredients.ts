import { getIngredients } from "../../utils/api.ts"; 

import { AppThunk, AppDispatch, TIngredient, TIngredientsResponse } from "../types/types.tsx";

export const GET_FEED = 'GET_FEED';
export const GET_FEED_FAILED = 'GET_FEED_FAILED';
export const GET_FEED_SUCCESS = 'GET_FEED_SUCCESS';

export const getFeed = (): {type: typeof GET_FEED;} => {
  return {
    type: GET_FEED 
  };
};

export const getFeedSuccess = (
  ingredients: TIngredient[]
): {type: typeof GET_FEED_SUCCESS, ingredients: TIngredient[]} => {

  return {
    type: GET_FEED_SUCCESS,
    ingredients  
  };
};

export const getFeedFailed = (): {type: typeof GET_FEED_FAILED;} => {
  return {
    type: GET_FEED_FAILED
  }; 
};

export type TIngredientsAction = 
  | ReturnType<typeof getFeed>
  | ReturnType<typeof getFeedSuccess> 
  | ReturnType<typeof getFeedFailed>;

export function fetchIngredients(): AppThunk<void> {
  return async function(dispatch: AppDispatch) {
    dispatch(getFeed());
    try {
      const res: TIngredientsResponse = await getIngredients();
      const ingredients: TIngredient[] = res.data;
      dispatch(getFeedSuccess(ingredients)); 

    } catch (err) {
      dispatch(getFeedFailed());
    }
  }
}