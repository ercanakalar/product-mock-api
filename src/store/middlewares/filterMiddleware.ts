import type { Middleware } from '@reduxjs/toolkit';
import { RootState } from '..';
import { setBrands, setModels } from '../slices/productSlice';
import { ProductType } from '../../type/product-type';
import productService from '../services/productService';

const filterMiddleware: Middleware<{}, RootState> =
  (store) => (next) => (action: any) => {
    if (productService.endpoints.getAllFilters.matchFulfilled(action)) {
      store.dispatch(
        setModels(action?.payload?.map((data: ProductType) => data.model))!
      );
      store.dispatch(
        setBrands(action?.payload?.map((data: ProductType) => data.brand))!
      );
    }

    return next(action);
  };

export default filterMiddleware;
