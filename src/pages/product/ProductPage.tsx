import { useAppDispatch, useAppSelector } from '../../store/hook';
import { setSelectedBrand, setSelectedModel, setSort } from '../../store/slices/productSlice';

import { Product } from '../../features/product/Product';

import { SortBy } from '../../components/sort/SortBy';
import { Filter } from '../../components/filter/Filter';
import { BasketCard } from '../../components/basket/BasketCard';
import Checkout from '../../components/checkout/Checkout';

import { ProductState } from '../../type/product-type';
import { useGetFilterProductsQuery } from '../../store/services/productService';
import { useState } from 'react';

const ProductPage = () => {
  const dispatch = useAppDispatch();
  const models = useAppSelector((state: { product: ProductState }) => state.product.models);
  const brands = useAppSelector((state: { product: ProductState }) => state.product.brands);
  const selectedModels = useAppSelector((state: { product: ProductState }) => state.product.selectedModels);
  const selectedBrands = useAppSelector((state: { product: ProductState }) => state.product.selectedBrands);
  const currentSort = useAppSelector((state: { product: ProductState }) => state.product.sort);

  const [localSort, setLocalSort] = useState(currentSort);

  useGetFilterProductsQuery({});

  const handleBrandChange = (brand: string) => {
    dispatch(setSelectedBrand(brand));
  };

  const handleModelChange = (model: string) => {
    dispatch(setSelectedModel(model));
  };

  const handleSortChange = (value: string) => {
    setLocalSort(value);
    dispatch(setSort(localSort));
  };
  return (
    <div className='flex h-screen md:p-1 lmd:p-1 lg:p-1'>
      <div className='hidden md:flex lmd:flex lg:flex xl:flex 2xl:flex flex-col w-1/4 lg:w-1/4 xl:w-1/4 2xl:w-1/4 pt-6 lg:items-center 2xl:items-baseline'>
        <SortBy
          className='lg:ml-0 2xl:ml-auto'
          title='Sort By'
          selectedSort={localSort}
          handleSortChange={handleSortChange}
        />
        <Filter
          className='lg:ml-0 2xl:ml-auto'
          title='Brands'
          selectedFilter={selectedBrands}
          filter={brands}
          onChange={handleBrandChange}
        />
        <Filter
          className='lg:ml-0 2xl:ml-auto'
          title='Models'
          selectedFilter={selectedModels}
          filter={models}
          onChange={handleModelChange}
        />
      </div>

      <Product />

      <div className='hidden flex-col pt-6 lg:flex md:w-0 lg:w-1/4 xl:w-1/4 2xl:w-1/4  lg:items-center 2xl:items-baseline'>
        <BasketCard />
        <Checkout />
      </div>
    </div>
  );
};

export default ProductPage;
