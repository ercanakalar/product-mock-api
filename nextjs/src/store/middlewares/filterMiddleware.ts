import type { Middleware } from '@reduxjs/toolkit';
import { RootState } from '..';
import { ProductType } from '../../type/product-type';
import productService from '../services/productService';
import { setInitialBrands, setInitialModels } from '../slices/productSlice';

const filterMiddleware: Middleware<object, RootState> =
  (store) => (next) => (action: unknown) => {
    if (productService.endpoints.getProducts.matchFulfilled(action)) {
      const currentState = store.getState().product;

      const newModels =
        action?.payload?.map((data: ProductType) => data.model) || [];
      const newBrands =
        action?.payload?.map((data: ProductType) => data.brand) || [];

      if (currentState.initialBrands.size === 0) {
        store.dispatch(setInitialBrands(newBrands));
      }
      if (currentState.initialModels.size === 0) {
        store.dispatch(setInitialModels(newModels));
      }
    }

    return next(action);
  };

export default filterMiddleware;
