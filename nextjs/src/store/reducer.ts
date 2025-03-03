'use client';

import { combineReducers } from 'redux';

import productService from './services/productService';
import productSlice from './slices/productSlice';
import cartSlice from './slices/cartSlice';

const reducers = {
  product: productSlice,
  cart: cartSlice,
  [productService.reducerPath]: productService.reducer,
};
const rootReducer = combineReducers(reducers);
export default rootReducer;
export type RootReducer = typeof rootReducer;
