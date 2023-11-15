import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bun: null,
  ingredientsList: [],
}

export const ingredientSlice = createSlice({
  name: 'ingredient',
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      state.ingredientsList.push({
        ...action.payload,
      });
    },
    
    addBun: (state, action) => {
      state.bunItem = { 
        ...action.payload, 
        type: 'bun' 
      };
    },

    moveIngredient: (state, action) => {
      const dragConstructor = [...state.ingredientsList];
      dragConstructor.splice(
        action.payload.dragElIndex,
        0,
        dragConstructor.splice(action.payload.hoverElIndex, 1)[0]
      );
      state.ingredientsList = dragConstructor;
    },

    deleteIngredient: (state, action) => {
      state.ingredientsList.splice(action.index, 1);
    },

    resetIngredients: (state) => {
      state.ingredientsList = [];
      state.bunItem = null;
    },
  }
})

export const { addIngredient, addBun, moveIngredient, deleteIngredient, resetIngredients } = ingredientSlice.actions;
export default ingredientSlice.reducer;