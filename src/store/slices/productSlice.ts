import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ProductState } from '../../type/product-type';

const initialState: ProductState = {
  brands: new Set(),
  models: new Set(),
  selectedBrands: new Set(),
  selectedModels: new Set(),
  products: [],
  sort: '',
  searchTerm: '',
  pagination: 1,
  totalProducts: 0,
  productId: '',
  filterStatus: false,
  sortStatus: false,
  basketStatus: false,
  applyFilterStatus: false,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    initializeFilters: (state) => {
      state.brands.clear();
      state.models.clear();
    },
    setSelectedBrand: (state, action: PayloadAction<string>) => {
      if (state.selectedBrands.has(action.payload)) {
        state.selectedBrands.delete(action.payload);
      } else {
        state.selectedBrands.add(action.payload);
      }
    },
    setSelectedModel: (state, action: PayloadAction<string>) => {
      if (state.selectedModels.has(action.payload)) {
        state.selectedModels.delete(action.payload);
      } else {
        state.selectedModels.add(action.payload);
      }
    },
    setBrands: (state, action: PayloadAction<string[]>) => {
      action.payload?.forEach((brand) => {
        state.brands.add(brand);
      });
    },
    setModels: (state, action: PayloadAction<string[]>) => {
      action.payload?.forEach((model) => {
        state.models.add(model);
      });
    },
    setSort: (state, action: PayloadAction<string>) => {
      state.sort = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setPaginationPage: (state, action: PayloadAction<number>) => {
      state.pagination = action.payload;
    },
    setProductId: (state, action: PayloadAction<string>) => {
      state.productId = action.payload;
    },
    setFilterStatus: (state, action: PayloadAction<boolean>) => {
      state.filterStatus = action.payload;
    },
    setSortStatus: (state, action: PayloadAction<boolean>) => {
      state.sortStatus = action.payload;
    },
    setBasketStatus: (state, action: PayloadAction<boolean>) => {
      state.basketStatus = action.payload;
    },
    setApplyFilterStatus: (state, action: PayloadAction<boolean>) => {
      state.applyFilterStatus = action.payload;
    },
  },
});

export const {
  setBrands,
  setModels,
  setSort,
  setSelectedBrand,
  setSelectedModel,
  setSearchTerm,
  setPaginationPage,
  setProductId,
  setFilterStatus,
  setSortStatus,
  setBasketStatus,
  setApplyFilterStatus
} = productSlice.actions;

export default productSlice.reducer;
