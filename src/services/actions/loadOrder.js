import { request } from "../../utils/api.js";
import { getCookie } from "../../utils/cookies.js";

export const SEND_ORDER_FAILED = 'SEND_ORDER_FAILED';
export const SEND_ORDER_SUCCESS = 'SEND_ORDER_SUCCESS';
export const CLEAR_ORDER = 'CLEAR_ORDER';

export const loadOrder = (ingredientsID) => async (dispatch) => {
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

    const result = await request('orders', options);

    dispatch({
      type: SEND_ORDER_SUCCESS,
      number: result.order.number
    });
  } catch (error) {
    console.error(`Произошла ошибка: ${error}`);
    dispatch({
      type: SEND_ORDER_FAILED,
      number: error
    });
  }
};

export const clearOrder = () => ({
  type: CLEAR_ORDER,
  number: null
});