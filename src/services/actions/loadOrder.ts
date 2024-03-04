import { request } from "../../utils/api.ts";
import { getCookie } from "../../utils/cookies";

import { AppDispatch, AppThunk, TOrderData } from "../types/types.tsx";

export const SEND_ORDER_FAILED = 'SEND_ORDER_FAILED';
export const SEND_ORDER_SUCCESS = 'SEND_ORDER_SUCCESS';
export const CLEAR_ORDER = 'CLEAR_ORDER';

export type TSendOrderFailedAction = {
  type: typeof SEND_ORDER_FAILED,
  number: string
};

export type TSendOrderSuccessAction = {
  type: typeof SEND_ORDER_SUCCESS,
  number: string
};

export type TClearOrderAction = {
  type: typeof CLEAR_ORDER,
  number: null
};

export type TLoadOrderAction = TSendOrderFailedAction | TSendOrderSuccessAction | TClearOrderAction;


export const loadOrder = (ingredientsID: string | (string | undefined)[]): AppThunk<Promise<void>> => async (dispatch: AppDispatch) => {
  try {
    const options = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: "Bearer " + getCookie('accessToken')
      },
      body: JSON.stringify({
        ingredients: ingredientsID,
      }),
    };

    const result = await request('orders', options) as TOrderData;

    dispatch({
      type: SEND_ORDER_SUCCESS,
      number: result.order.number
    });
  } catch (error) {
    console.error(`Произошла ошибка: ${error}`);
    dispatch({
      type: SEND_ORDER_FAILED,
      number: error
    } as TSendOrderFailedAction);
  }
};

export const clearOrder = (): TClearOrderAction => ({
  type: CLEAR_ORDER,
  number: null
});