import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      //Payload = newItem
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      // payload = pizzaId
      state.cart = state.cart.filter((item) => item.pizzaId != action.payload);
    },
    adjustQuantity(state, action) {
      // payload ={pizzaId , change (+1/-1)}
      const item = state.cart.find(
        (item) => item.pizzaId === action.payload.pizzaId,
      );
      if (!item) return;
      item.quantity += action.payload.change;
      item.totalPrice = item.unitPrice * item.quantity;
      if (item.quantity === 0)
        cartSlice.caseReducers.deleteItem(state, {
          payload: action.payload.pizzaId,
        });
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const selectCart = (state) => {
  return state.cart.cart;
};

export const selectTotalPrice = (state) => {
  return state.cart.cart.reduce((prv, crr) => prv + crr.totalPrice, 0);
};
export const selectTotalQuantity = (state) => {
  return state.cart.cart.reduce((prv, crr) => prv + crr.quantity, 0);
};

export const selectItemQuantityById = (id) => (state) => {
  return state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
};
export const { addItem, deleteItem, adjustQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
