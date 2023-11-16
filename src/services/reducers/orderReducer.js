import { 
  SEND_ORDER_SUCCESS, 
  SEND_ORDER_FAILED,
  CLEAR_ORDER, 
} from "../actions/loadOrder";

const initState = {
  number: null
}

export const orderReducer = (state = initState, action) => {
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