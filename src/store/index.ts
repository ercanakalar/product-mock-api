import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import productService from './services/productService';
import rootReducer from './reducer';
import filterMiddleware from './middlewares/filterMiddleware';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(productService.middleware)
      .concat(filterMiddleware)
      .prepend(productService.middleware),
});
setupListeners(store.dispatch);

store.dispatch(productService.endpoints.getAllFilters.initiate());

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export default store;
