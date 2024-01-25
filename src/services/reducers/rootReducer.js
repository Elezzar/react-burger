import { combineReducers } from "@reduxjs/toolkit";
import { ingredientsReducer } from "./feedReducer";
import { orderReducer } from "./orderReducer";
import { modalIngredientReducer } from "./modalIngredientReducer";
import ingredientReducer from "./ingredientReducer";
import { user } from "./userReducer"
import { wsOrders } from "./wsFeedReduser";
import { wsUserFeed } from "./wsUserFeedReduces";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  ingredient: modalIngredientReducer,
  orders: orderReducer,
  orderList: ingredientReducer,
  user: user,
  wsOrders: wsOrders,
  wsUserFeed: wsUserFeed,
})