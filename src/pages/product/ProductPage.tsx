import { useAppDispatch, useAppSelector } from '../../store/hook';
import { Product } from '../../features/product/Product';

import { BasketCard } from '../../components/basket/BasketCard';
import Checkout from '../../components/checkout/Checkout';

import { ProductState } from '../../type/product-type';
import FilterProduct from './filter/FilterProduct';
import { useGetProductsQuery } from '../../store/services/productService';
import { useEffect } from 'react';
import { setBrands, setModels } from '../../store/slices/productSlice';

const ProductPage = () => {
  const dispatch = useAppDispatch();
  const productSelector = useAppSelector(
    (state: { product: ProductState }) => state.product
  );

  const {
    data: products,
    isLoading,
    error,
  } = useGetProductsQuery({
    sort: productSelector.sort,
    brands: Array.from(productSelector.selectedBrands),
    models: Array.from(productSelector.selectedModels),
  });
  
  useEffect(() => {
    dispatch(setBrands(products?.map((val) => val.brand)!));
    dispatch(setModels(products?.map((val) => val.model)!));
  }, [products]);

  return (
    <div className='flex h-screen md:p-1 lmd:p-1 lg:p-1'>
      <FilterProduct />
      <Product
        productSelector={productSelector}
        products={products}
        isLoading={isLoading}
        error={error}
      />
      <div className='hidden flex-col pt-6 lg:flex md:w-0 lg:w-1/4 xl:w-1/4 2xl:w-1/4  lg:items-center 2xl:items-baseline'>
        <BasketCard />
        <Checkout />
      </div>
    </div>
  );
};

export default ProductPage;
