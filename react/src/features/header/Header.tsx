import { useMemo } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hook';
import { setFilterStatus, setSearchTerm, setSortStatus } from '../../store/slices/productSlice';

import { Search } from '../../components/search/Search';
import { Profile } from '../../features/header/profile/Profile';
import { Basket } from '../../features/header/basket/Basket';
import { HeaderTitle } from '../../features/header/HeaderTitle';
import HeaderOptions from '../../features/header/mobile/HeaderOptions';
import HeaderFilter from '../../features/header/mobile/HeaderFilter';
import HeaderSort from '../../features/header/mobile/HeaderSort';
import HeaderBasket from '../../features/header/mobile/HeaderBasket';

import { LayoutProps } from '../../type/children-type';
import { ProductState } from '../../type/product-type';

import { throttle } from '../../utils/throttle';

export const Header = (props: LayoutProps) => {
  const dispatch = useAppDispatch();

  const product = useAppSelector((state: { product: ProductState }) => state.product);

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
      <header className="flex justify-around bg-headerColor h-12 w-full">
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

      <HeaderFilter
        toggleFilter={toggleFilter}
      />
      <HeaderSort toggleSort={toggleSort} />
      <HeaderBasket />
      <HeaderOptions />

      {props.children}
    </>
  );
};
