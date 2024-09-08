import { combineReducers } from 'redux';

import productService from './services/productService';
import productSlice from './slices/productSlice';
import cartSlice from './slices/cartSlice';

const rootReducers = {
  product: productSlice,
  cart: cartSlice,
  [productService.reducerPath]: productService.reducer,
};
export default combineReducers(rootReducers);
