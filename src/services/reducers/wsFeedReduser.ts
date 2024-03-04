import {
  WS_CONNECTION_SUCCESS, 
  WS_CONNECTION_ERROR, 
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WsFeedActions
} from "../actions/wsFeedAction";

import { TOrderData } from "../types/types";

type WsFeedState = {
  wsConnected: boolean,
  orders: TOrderData[],
  total: number,
  totalToday: number,
  error: string | null,
}

const initialState: WsFeedState = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0,
  error: null,
}

export const wsOrders = (state = initialState, action: WsFeedActions): WsFeedState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS: {
      return {
        ...state,
        wsConnected: true
      };
    }
    case WS_CONNECTION_ERROR: {
      return {
        ...state,
        wsConnected: false,
        error: action.payload,
      };
    }
    case WS_CONNECTION_CLOSED: {
      return {
        ...state,
        orders: initialState.orders,
        wsConnected: false
      };
    }
    case WS_GET_MESSAGE: {
      return {
        ...state,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
        error: "",
      };
    }
    default: return state;
  }
}