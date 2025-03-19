import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, CartState } from '../../type/cart-type';

const initialState: CartState = {
  items: JSON.parse(localStorage.getItem('cart') || '[]'),
  totalPrice: 0,
  totalProducts: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      let total = 0;
      state.items.forEach((item) => {
        total += item.price * item.quantity;
      });
      state.totalPrice = total;
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload
      );
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.items = state.items.filter(
            (item) => item.id !== action.payload
          );
        }
      }
      let total = 0;
      state.items.forEach((item) => {
        total += item.price * item.quantity;
      });
      state.totalPrice = total;
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.totalProducts = 0;
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    calculateCheckout: (state) => {
      let total = 0;
      state.items.forEach((item) => {
        total += item.price * item.quantity;
      });
      state.totalPrice = total;
    },
    getTotalCart: (state) => {
      state.totalProducts = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  calculateCheckout,
  getTotalCart,
} = cartSlice.actions;

export default cartSlice.reducer;
