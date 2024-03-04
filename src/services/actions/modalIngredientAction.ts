import {TIngredient} from "../types/types.tsx";

export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export type TPassData = {
    type: typeof OPEN_MODAL,
    ingredient: TIngredient
}

export type TResetData = {
    type: typeof CLOSE_MODAL,
    ingredient: null
}

export const passData = (item: TIngredient): TPassData => ({
    type: OPEN_MODAL,
    ingredient: item,
})

export const resetData = (): TResetData => ({
    type: CLOSE_MODAL,
    ingredient: null
})

export type TModalIngredientActions = TPassData | TResetData;