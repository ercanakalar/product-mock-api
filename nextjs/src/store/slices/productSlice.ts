import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ProductState } from '../../type/product-type';

const initialState: ProductState = {
  brands: new Set(),
  models: new Set(),
  selectedBrands: new Set(),
  selectedModels: new Set(),
  initialBrands: new Set<string>(),
  initialModels: new Set<string>(),
  selectedBrandsForMobile: new Set(),
  selectedModelsForMobile: new Set(),
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
    setInitialBrands: (state, action: PayloadAction<string[]>) => {
      state.initialBrands = new Set(action.payload);
      state.brands = new Set(action.payload);
    },
    setInitialModels: (state, action: PayloadAction<string[]>) => {
      state.initialModels = new Set(action.payload);
      state.models = new Set(action.payload);
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
    setSelectedBrandForMobile: (state, action: PayloadAction<Set<string>>) => {
      state.selectedBrandsForMobile.clear();
      action.payload.forEach((brand) =>
        state.selectedBrandsForMobile.add(brand)
      );
    },
    setSelectedModelForMobile: (state, action: PayloadAction<Set<string>>) => {
      state.selectedModelsForMobile.clear();
      action.payload.forEach((model) =>
        state.selectedModelsForMobile.add(model)
      );
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
  setApplyFilterStatus,
  setSelectedBrandForMobile,
  setSelectedModelForMobile,
  setInitialBrands,
  setInitialModels,
} = productSlice.actions;

export default productSlice.reducer;
