import { useAppDispatch, useAppSelector } from '../../store/hook';
import { useGetFilterProductsQuery } from '../../store/services/productService';
import { setSelectedBrand, setSelectedModel } from '../../store/slices/productSlice';

import { Product } from '../../features/product/Product';

import { SortBy } from '../../components/sort/SortBy';
import { sortOptions } from '../../constants/sortConstant';
import { Filter } from '../../components/filter/Filter';
import { BasketCard } from '../../components/basket/BasketCard';
import Checkout from '../../components/checkout/Checkout';

import { ProductState } from '../../type/product-type';

const ProductPage = () => {
  const dispatch = useAppDispatch();
  const models = useAppSelector((state: { product: ProductState }) => state.product.models);
  const brands = useAppSelector((state: { product: ProductState }) => state.product.brands);
  const selectedModels = useAppSelector((state: { product: ProductState }) => state.product.selectedModels);
  const selectedBrands = useAppSelector((state: { product: ProductState }) => state.product.selectedBrands);

  useGetFilterProductsQuery({});

  const handleBrandChange = (brand: string) => {
    dispatch(setSelectedBrand(brand));
  };

  const handleModelChange = (model: string) => {
    dispatch(setSelectedModel(model));
  };
  return (
    <div className='flex h-screen'>
      <div className='flex flex-col w-1/4 pt-6'>
        <SortBy className='ml-auto' title='Sort By' filter={sortOptions} />
        <Filter
          className='ml-auto'
          title='Brands'
          selectedFilter={selectedBrands}
          filter={brands}
          onChange={handleBrandChange}
        />
        <Filter
          className='ml-auto'
          title='Models'
          selectedFilter={selectedModels}
          filter={models}
          onChange={handleModelChange}
        />
      </div>

      <Product />

      <div className='flex flex-col w-1/4 pt-6'>
        <BasketCard />
        <Checkout />
      </div>
    </div>
  );
};

export default ProductPage;
