import { 
  SEND_ORDER_SUCCESS, 
  SEND_ORDER_FAILED,
  CLEAR_ORDER, 
  TLoadOrderAction
} from "../actions/loadOrder";

type OrderState = {
  number: string | null; 
};

const initState: OrderState = {
  number: null
}

export const orderReducer = (state = initState, action: TLoadOrderAction) => {
  switch(action.type) {
    case SEND_ORDER_SUCCESS: {
      return {
        ...state,
        number: action.number
      }
    }
    case SEND_ORDER_FAILED: {
      return {
        ...state,
        number: action.number
      }
    }
    case CLEAR_ORDER: {
      return {
        ...state,
        number: null,
      }
    }
      default: {
        return state
      }
  }
}
