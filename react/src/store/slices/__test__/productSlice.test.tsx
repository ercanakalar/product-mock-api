import { enableMapSet } from 'immer';

import productReducer, {
  setBrands,
  setModels,
  setSort,
  setSelectedBrand,
  setSelectedModel,
  setSearchTerm,
  setPaginationPage,
  setProductId,
} from '../../slices/productSlice';
import { ProductState } from '../../../type/product-type';
enableMapSet();

describe('productSlice reducer', () => {
  const initialState: ProductState = {
    brands: new Set(),
    models: new Set(),
    selectedBrands: new Set(),
    selectedModels: new Set(),
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

  test('should return the initial state', () => {
    expect(productReducer(undefined, { type: '' })).toEqual(initialState);
  });

  test('should handle setBrands', () => {
    const brands = ['Brand1', 'Brand2'];
    const nextState = productReducer(initialState, setBrands(brands));
    expect(Array.from(nextState.brands)).toEqual(brands);
  });

  test('should handle setModels', () => {
    const models = ['Model1', 'Model2'];
    const nextState = productReducer(initialState, setModels(models));
    expect(Array.from(nextState.models)).toEqual(models);
  });

  test('should handle setSelectedBrand', () => {
    const nextState = productReducer(initialState, setSelectedBrand('Brand1'));
    expect(nextState.selectedBrands.has('Brand1')).toBe(true);

    const toggledState = productReducer(nextState, setSelectedBrand('Brand1'));
    expect(toggledState.selectedBrands.has('Brand1')).toBe(false);
  });

  test('should handle setSelectedModel', () => {
    const nextState = productReducer(initialState, setSelectedModel('Model1'));
    expect(nextState.selectedModels.has('Model1')).toBe(true);

    const toggledState = productReducer(nextState, setSelectedModel('Model1'));
    expect(toggledState.selectedModels.has('Model1')).toBe(false);
  });

  test('should handle setSort', () => {
    const nextState = productReducer(initialState, setSort('price'));
    expect(nextState.sort).toBe('price');
  });

  test('should handle setSearchTerm', () => {
    const nextState = productReducer(initialState, setSearchTerm('Laptop'));
    expect(nextState.searchTerm).toBe('Laptop');
  });

  test('should handle setPaginationPage', () => {
    const nextState = productReducer(initialState, setPaginationPage(2));
    expect(nextState.pagination).toBe(2);
  });

  test('should handle setProductId', () => {
    const nextState = productReducer(initialState, setProductId('12345'));
    expect(nextState.productId).toBe('12345');
  });

  test('should handle unknown action type', () => {
    expect(productReducer(initialState, { type: 'unknown' })).toEqual(initialState);
  });

  test('should handle unknown action type with initial state', () => {
    expect(productReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });


});
