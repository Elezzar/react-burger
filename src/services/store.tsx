import { legacy_createStore as createStore} from 'redux';
import { applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'

import { socketMiddleware } from './middleware/socketMiddleWare';
import { rootReducer } from './reducers/rootReducer';

import { 
  WS_CONNECTION_START, 
  WS_CONNECTION_SUCCESS, 
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_CLOSE_CONNECTION } from "./actions/wsFeedAction";

import { 
  WS_CLOSE_CONNECTION_USER, 
  WS_CONNECTION_CLOSED_USER, 
  WS_CONNECTION_ERROR_USER, 
  WS_CONNECTION_START_USER, 
  WS_CONNECTION_SUCCESS_USER, 
  WS_GET_MESSAGE_USER } from "./actions/wsUserAction";

type TwsActions ={
  wsStart: typeof WS_CONNECTION_START,
  wsClose: typeof WS_CLOSE_CONNECTION,
  onOpen: typeof WS_CONNECTION_SUCCESS,
  onClose: typeof WS_CONNECTION_CLOSED,
  onError: typeof WS_CONNECTION_ERROR,
  onMessage: typeof WS_GET_MESSAGE
}

type TwsActionsUser ={
  wsStart: typeof WS_CONNECTION_START_USER,
  wsClose: typeof WS_CLOSE_CONNECTION_USER,
  onOpen: typeof WS_CONNECTION_SUCCESS_USER,
  onClose: typeof WS_CONNECTION_CLOSED_USER,
  onError: typeof WS_CONNECTION_ERROR_USER,
  onMessage: typeof WS_GET_MESSAGE_USER
}

const wsActions:TwsActions = {
  wsStart: WS_CONNECTION_START,
  wsClose: WS_CLOSE_CONNECTION,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE
}
  
const wsActionsUser: TwsActionsUser = {
  wsStart: WS_CONNECTION_START_USER,
  wsClose: WS_CLOSE_CONNECTION_USER,
  onOpen: WS_CONNECTION_SUCCESS_USER,
  onClose: WS_CONNECTION_CLOSED_USER,
  onError: WS_CONNECTION_ERROR_USER,
  onMessage: WS_GET_MESSAGE_USER
}

const wsAll = 'wss://norma.nomoreparties.space/orders/all';
const wsUser = 'wss://norma.nomoreparties.space/orders';
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, socketMiddleware(wsAll, wsActions),  socketMiddleware(wsUser, wsActionsUser))));

export default store;