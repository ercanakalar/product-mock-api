'use client';

import { Suspense, useEffect, useMemo, useRef, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/hook';
import { useGetProductsQuery } from '@/store/services/productService';
import { setPaginationPage } from '@/store/slices/productSlice';

import ProductCard from '@/components/card/ProductCard';
import LoadingSpinner from '@/components/loading/LoadingSpinner';
import Pagination from '@/components/pagination/Pagination';

import { itemsPerPage } from '@/constants/constantValues';
import { getErrorMessage } from '@/constants/parseError';

import useIsMobile from '@/hooks/useIsMobile';

import { ProductState, ProductType } from '@/type/product-type';


export const Product = () => {
    const [totalPages, setTotalPages] = useState<number>(0);
    const [currentProducts, setCurrentProducts] = useState<ProductType[]>([]);

    const dispatch = useAppDispatch();
    const isMobile = useIsMobile();
    const { sort, selectedBrandsForMobile, selectedModelsForMobile, selectedBrands, selectedModels, searchTerm, pagination } = useAppSelector(
        (state: { product: ProductState }) => state.product
    );

    const queryParams = useMemo(() => ({
        sort,
        brands: isMobile ? Array.from(selectedBrandsForMobile) : Array.from(selectedBrands),
        models: isMobile ? Array.from(selectedModelsForMobile) : Array.from(selectedModels),
    }), [sort, isMobile, selectedBrandsForMobile, selectedModelsForMobile, selectedBrands, selectedModels]);

    const { data: products, isLoading, error } = useGetProductsQuery(queryParams);

    useEffect(() => {
        if (!products) return;

        const filtered = products.filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const paginated = filtered.slice(
            (pagination - 1) * itemsPerPage,
            pagination * itemsPerPage
        );

        setTotalPages(Math.ceil(filtered.length / itemsPerPage));
        setCurrentProducts(paginated);
    }, [products, searchTerm, pagination]);

    const prevSearchTermRef = useRef<string>(searchTerm);


    const handlePageChange = (page: number) => {
        dispatch(setPaginationPage(page));
    };

    useEffect(() => {
        if (prevSearchTermRef.current !== searchTerm) {
            prevSearchTermRef.current = searchTerm;
            dispatch(setPaginationPage(1));
        }
    }, [searchTerm, dispatch]);

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
                {
                    currentProducts?.map((product) => (
                        <Suspense key={product.id} fallback={<LoadingSpinner />}>
                            <ProductCard product={product} />
                        </Suspense>
                    ))}
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
