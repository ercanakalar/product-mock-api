import { Suspense, useEffect, useRef } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hook';
import { setPaginationPage } from '../../store/slices/productSlice';

import ProductCard from '../../components/card/ProductCard';
import LoadingSpinner from '../../components/loading/LoadingSpinner';
import Pagination from '../../components/pagination/Pagination';
import { ProductState } from '../../type/product-type';
import { itemsPerPage } from '../../constants/constantValues';
import { useGetProductsQuery } from '../../store/services/productService';
import { getErrorMessage } from '../../constants/parseError';

export const Product = () => {
  const dispatch = useAppDispatch();
  const productSelector = useAppSelector(
    (state: { product: ProductState }) => state.product
  );

  const {
    isLoading,
    error,
    currentData: products
  } = useGetProductsQuery({
    sort: productSelector.sort,
    brands: Array.from(productSelector.selectedBrands),
    models: Array.from(productSelector.selectedModels),
  });


  const prevSearchTermRef = useRef<string>(productSelector.searchTerm);

  const filteredProducts = products?.filter((product) =>
    product.name.toLowerCase().includes(productSelector.searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil((filteredProducts?.length || 0) / itemsPerPage);

  const currentProducts = filteredProducts?.slice(
    (productSelector.pagination - 1) * itemsPerPage,
    productSelector.pagination * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    dispatch(setPaginationPage(page));
  };

  useEffect(() => {
    if (prevSearchTermRef.current !== productSelector.searchTerm) {
      dispatch(setPaginationPage(1));
      prevSearchTermRef.current = productSelector.searchTerm;
    }
  }, [productSelector.searchTerm, dispatch]);

  if (isLoading)
    return (
      <div className='col-span-4 w-2/4 pt-6'>
        <div className='text-center col-span-full'>
          <LoadingSpinner />
        </div>
      </div>
    );

  if (error) {
    return (
      <div className='col-span-4 w-2/4 pt-6'>
        <div className='text-center col-span-full'>
          {getErrorMessage(error)}
        </div>
      </div>
    );
  }

  return (
    <div className='cal-span-2 lg:col-span-3 2xl:col-span-4 w-full md:w-3/4 xl:w-2/4 2xl:w-2/4 pt-6 mb-6'>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4 md:gap-1 gap-4 justify-items-center'>
        {currentProducts?.length ? (
          currentProducts.map((product) => (
            <Suspense key={product.id} fallback={<LoadingSpinner />}>
              <ProductCard product={product} />
            </Suspense>
          ))
        ) : (
          <div className='text-center col-span-full'>No products found</div>
        )}
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={productSelector.pagination}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};
