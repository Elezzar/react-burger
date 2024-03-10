import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from "react-redux";

import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { rootReducer } from "../reducers/rootReducer";

import { TIngredientsAction } from "../actions/loadIngredients";
import { TModalIngredientActions } from "../actions/modalIngredientAction";
import { TDraggedIngredientsAction } from "../actions/ingredientAction"
import { TLoadOrderAction } from "../actions/loadOrder";
import { WsFeedActions } from "../actions/wsFeedAction";
import { WsUserActions } from "../actions/wsUserAction";
import { TUserActions } from "../actions/userAction";

export type TIngredient = {
  name: string; 
  type: 'bun' |'sauce' |'main';
  _id: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
};

export type TDraggableIngredient = {
  data: TIngredient;
}

export type TDraggableIngredientWithKey = TIngredient & {
  key: string; 
};

export type TIngredientsData = {
  bunItem: TIngredient;
  ingredientsList: TDraggableIngredientWithKey[];
};



export type TIngredientsResponse = {
  success: boolean;
  data: TIngredient[];
}

// export type TOrder = {
//   createdAt: string,
//   ingredients: string[],
//   name: string,
//   number: number,
//   status: string,
//   updateAt: string,
//   _id: string,
// };

export type TOrderData = {
  success: boolean,
  name: string,
  order: {
    ingredients: TIngredient[],
    _id: string,
    owner: {
      name: string,
      email: string,
      createdAt?: Date,
      updatedAt?: Date
    },
    status: string,
    name: string,
    createdAt?: string,
    updatedAt?: string,
    number: string,
    price: number
  }
}

export type TOrder = {
  _id: string,
  ingredients: string[],
  status: string,
  name: string,
  createdAt: string,
  updatedAt: string,
  number: number
}

export type TRegisterUser = {
  email: string,
  password: string,
  name: string,
};

export type TLoginUser = {
  email: string,
  password: string,
};

export type RootState = ReturnType<typeof rootReducer>

export type TAppActions = TIngredientsAction | TModalIngredientActions | 
  TDraggedIngredientsAction | TLoadOrderAction | WsFeedActions | WsUserActions | TUserActions;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  AnyAction,
  TAppActions
>;

export type AppDispatch = ThunkDispatch<RootState, AnyAction, TAppActions>; 

export const useAppDispatch: () => AppDispatch = dispatchHook;

export const useAppSelector: TypedUseSelectorHook<RootState> = selectorHook;
