'use client';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { enableMapSet } from 'immer';

import productService from './services/productService';

import rootReducer from './reducer';

import filterMiddleware from './middlewares/filterMiddleware';

enableMapSet();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(productService.middleware)
      .concat(filterMiddleware),
});
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export default store;
