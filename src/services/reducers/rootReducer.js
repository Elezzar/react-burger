import { combineReducers } from "@reduxjs/toolkit";
import { ingredientsReducer } from "./feedReducer";
import { orderReducer } from "./orderReducer";
import { modalIngredientReducer } from "./modalIngredientReducer";
import ingredientReducer from "./ingredientReducer";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  ingredient: modalIngredientReducer,
  orders: orderReducer,
  orderList: ingredientReducer,
})