'use client'

import { useMemo } from "react";

import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setFilterStatus, setSearchTerm, setSortStatus } from "@/store/slices/productSlice";

import { throttle } from "@/utils/throttle";

import { ProductState } from "@/type/product-type";

import { Search } from "@/components/search/Search";

import { HeaderTitle } from "./HeaderTitle";
import { Basket } from "./basket/Basket";
import { Profile } from "./profile/Profile";
import HeaderFilter from "./mobile/HeaderFilter";
import HeaderSort from "./mobile/HeaderSort";
import HeaderBasket from "./mobile/HeaderBasket";
import HeaderOptions from "./mobile/HeaderOptions";
import useIsMobile from "@/hooks/useIsMobile";

export const Header = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const product = useAppSelector((state: { product: ProductState }) => state.product);

  const isMobile = useIsMobile()

  const throttledSearch = useMemo(
    () => throttle((term: string) => dispatch(setSearchTerm(term)), 500),
    [dispatch]
  );

  const handleSearchChange = (term: string) => {
    throttledSearch(term);
  };

  const toggleFilter = () => {
    dispatch(setFilterStatus(!product.filterStatus));
  };

  const toggleSort = () => {
    dispatch(setSortStatus(!product.sortStatus));
  };

  return (
    <>
      <header className="flex justify-around bg-header-color h-12 w-full">
        <div className="flex gap-20 items-center">
          <HeaderTitle />
          <div className="h-full p-2 hidden sm:block lg:block lmd:block">
            <Search
              onChange={handleSearchChange}
              className="h-full"
              width="sm:w-68 lg:w-90 xl:w-96 2xl:w-96"
            />
          </div>
        </div>
        <div className="hidden md:flex lmd:flex lg:flex xl:flex 2xl:flex gap-4 items-center">
          <Basket />
          <Profile />
        </div>
      </header>
      {!product.productId && (
        <div className="flex md:hidden lmd:hidden lg:hidden xl:hidden 2xl:hidden justify-evenly w-full divide-x">
          <button className="bg-gray-100 w-full py-4" onClick={toggleFilter}>
            Filter
          </button>
          <button className="bg-gray-100 w-full py-4" onClick={toggleSort}>
            Sort
          </button>
        </div>
      )}
      {isMobile && (
        <>
          <HeaderFilter
            toggleFilter={toggleFilter}
          />
          <HeaderSort toggleSort={toggleSort} />
          <HeaderBasket />
          <HeaderOptions />
        </>
      )}

      {children}
    </>
  );
};
