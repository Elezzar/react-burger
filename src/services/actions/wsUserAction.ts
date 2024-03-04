import { TOrderData } from "../types/types";

export const WS_CONNECTION_START_USER = 'WS_CONNECTION_START_USER';
export const WS_CONNECTION_SUCCESS_USER = 'WS_CONNECTION_SUCCESS_USER';
export const WS_CONNECTION_ERROR_USER = 'WS_CONNECTION_ERROR_USER';
export const WS_CONNECTION_CLOSED_USER = 'WS_CONNECTION_CLOSED_USER';
export const WS_GET_MESSAGE_USER = 'WS_GET_MESSAGE_USER';
export const WS_CLOSE_CONNECTION_USER = 'WS_CLOSE_CONNECTION_USER';

type WsUserPayload = {
  orders: TOrderData[],
  total: number,
  totalToday: number
}

export type WsConnectionStartUser = {
  type: typeof WS_CONNECTION_START_USER,
  payload: string
}

export type WsConnectionSuccessUser = {
  type: typeof WS_CONNECTION_SUCCESS_USER,
}

export type WsConnectionErrorUser = {
  type: typeof WS_CONNECTION_ERROR_USER,
  payload: string
}

export type WsConnectionClosedUser = {
  type: typeof WS_CONNECTION_CLOSED_USER,
  payload: string
}

export type WsGetMessageUser = {
  type: typeof WS_GET_MESSAGE_USER,
  payload: WsUserPayload
}

export type WsCloseConnectionUser = {
  type: typeof WS_CLOSE_CONNECTION_USER,
  payload: string
}

export type WsUserActions = WsConnectionStartUser | WsConnectionSuccessUser | WsConnectionErrorUser | WsConnectionClosedUser | WsGetMessageUser | WsCloseConnectionUser