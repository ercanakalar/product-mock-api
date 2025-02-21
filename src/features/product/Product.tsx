import { Suspense, useEffect, useRef } from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import { useAppDispatch } from '../../store/hook';
import { setPaginationPage } from '../../store/slices/productSlice';

import ProductCard from '../../components/card/ProductCard';
import LoadingSpinner from '../../components/loading/LoadingSpinner';
import Pagination from '../../components/pagination/Pagination';
import { ProductType, ProductState } from '../../type/product-type';
import { itemsPerPage } from '../../constants/constantValues';

export const Product = (props: {
  productSelector: ProductState;
  products: ProductType[] | undefined;
  isLoading: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
}) => {
  const { searchTerm, pagination } = props.productSelector;
  const { products, isLoading, error } = props;
  const dispatch = useAppDispatch();

  const prevSearchTermRef = useRef<string>(searchTerm);

  const filteredProducts = products?.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil((filteredProducts?.length || 0) / itemsPerPage);

  const currentProducts = filteredProducts?.slice(
    (pagination - 1) * itemsPerPage,
    pagination * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    dispatch(setPaginationPage(page));
  };

  useEffect(() => {
    if (prevSearchTermRef.current !== searchTerm) {
      dispatch(setPaginationPage(1));
      prevSearchTermRef.current = searchTerm;
    }
  }, [searchTerm, dispatch]);

  const getErrorMessage = (
    error: FetchBaseQueryError | SerializedError
  ): string => {
    if ('status' in error) {
      const err = error as FetchBaseQueryError;
      return `Error ${err.status}: ${
        err.data && typeof err.data === 'object' && 'message' in err.data
          ? (err.data as any).message
          : 'An error occurred while fetching products.'
      }`;
    } else if ('message' in error) {
      return error.message || 'An unknown error occurred.';
    }
    return 'An unknown error occurred.';
  };

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
          currentPage={pagination}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};
