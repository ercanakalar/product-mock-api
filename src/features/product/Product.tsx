import { Suspense, useEffect, useRef } from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import { useAppDispatch, useAppSelector } from '../../store/hook';
import { useGetProductsQuery } from '../../store/services/productService';
import { setPaginationPage } from '../../store/slices/productSlice';

import ProductCard from '../../components/card/ProductCard';
import LoadingSpinner from '../../components/loading/LoadingSpinner';
import Pagination from '../../components/pagination/Pagination';

export const Product = () => {
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector((state: any) => state.product.searchTerm);
  const sort = useAppSelector((state: any) => state.product.sort);
  const selectedModels = useAppSelector((state: any) => state.product.selectedModels);
  const selectedBrands = useAppSelector((state: any) => state.product.selectedBrands);
  const paginationPage = useAppSelector((state: any) => state.product.pagination);

  const prevSearchTermRef = useRef<string>(searchTerm);

  const {
    data: products,
    isLoading,
    error,
  } = useGetProductsQuery({
    sort,
    brands: Array.from(selectedBrands),
    models: Array.from(selectedModels),
  });

  const itemsPerPage = 12;

  const filteredProducts = products?.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const totalPages = Math.ceil((filteredProducts?.length || 0) / itemsPerPage);

  const currentProducts = filteredProducts?.slice((paginationPage - 1) * itemsPerPage, paginationPage * itemsPerPage);

  const handlePageChange = (page: number) => {
    dispatch(setPaginationPage(page));
  };

  useEffect(() => {
    if (prevSearchTermRef.current !== searchTerm) {
      dispatch(setPaginationPage(1));
      prevSearchTermRef.current = searchTerm;
    }
  }, [searchTerm, dispatch]);

  const getErrorMessage = (error: FetchBaseQueryError | SerializedError): string => {
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
        <div className='text-center col-span-full'>{getErrorMessage(error)}</div>
      </div>
    );
  }

  return (
    <div className='col-span-4 w-2/4 pt-6 mb-6'>
      <div className='grid grid-cols-1 2xl:grid-cols-4 gap-4 justify-items-center'>
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
        <Pagination currentPage={paginationPage} totalPages={totalPages} onPageChange={handlePageChange} />
      )}
    </div>
  );
};
