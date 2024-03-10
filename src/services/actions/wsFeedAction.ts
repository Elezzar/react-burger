import { TOrderData } from "../types/types.tsx";

export const WS_CONNECTION_START = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE = 'WS_GET_MESSAGE';
export const WS_CLOSE_CONNECTION = 'WS_CLOSE_CONNECTION';

type WsPayload = {
  orders: TOrderData[],
  total: number,
  totalToday: number
}

export type WsConnectionStart = {
  type: typeof WS_CONNECTION_START,
}

export type WsConnectionSuccess = {
  type: typeof WS_CONNECTION_SUCCESS,
}

export type WsConnectionError = {
  type: typeof WS_CONNECTION_ERROR,
  payload: string
}

export type WsConnectionClosed = {
  type: typeof WS_CONNECTION_CLOSED,
}

export type WsGetMessage = {
  type: typeof WS_GET_MESSAGE,
  payload: WsPayload
}

export type WsCloseConnection = {
  type: typeof WS_CLOSE_CONNECTION,
}

export type WsFeedActions = WsConnectionStart | WsConnectionSuccess | WsConnectionError | WsConnectionClosed | WsGetMessage | WsCloseConnection;