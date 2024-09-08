import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { setSearchTerm, setSelectedBrand, setSelectedModel } from '../../store/slices/productSlice';
import { Search } from '../../components/search/Search';
import { Profile } from '../../features/header/profile/Profile';
import { Basket } from '../../features/header/basket/Basket';
import { HeaderTitle } from '../../features/header/HeaderTitle';
import { LayoutProps } from '../../type/children-type';
import { ProductState } from '../../type/product-type';

import { CartState } from '../../type/cart-type';
import HeaderOptions from '../../features/header/mobile/HeaderOptions';
import HeaderFilter from '../../features/header/mobile/HeaderFilter';
import HeaderSort from '../../features/header/mobile/HeaderSort';
import HeaderBasket from '../../features/header/mobile/HeaderBasket';

export const Header = (props: LayoutProps) => {
  const dispatch = useAppDispatch();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isBasketOpen, setIsBasketOpen] = useState(false); // State for opening and closing the basket modal

  const models = useAppSelector((state: { product: ProductState }) => state.product.models);
  const brands = useAppSelector((state: { product: ProductState }) => state.product.brands);
  const totalProducts = useAppSelector((state: { cart: CartState }) => state.cart.totalProducts);
  const selectedModels = useAppSelector((state: { product: ProductState }) => state.product.selectedModels);
  const selectedBrands = useAppSelector((state: { product: ProductState }) => state.product.selectedBrands);

  const handleBrandChange = (brand: string) => {
    dispatch(setSelectedBrand(brand));
  };

  const handleModelChange = (model: string) => {
    dispatch(setSelectedModel(model));
  };

  const handleSearchChange = (term: string) => {
    dispatch(setSearchTerm(term));
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const toggleSort = () => {
    setIsSortOpen(!isSortOpen);
  };

  const toggleBasket = () => {
    setIsBasketOpen(!isBasketOpen);
  };

  return (
    <>
      <header className='flex justify-around bg-headerColor h-12 w-full'>
        <div className='flex gap-20 items-center'>
          <HeaderTitle />
          <div className='h-full p-2 hidden sm:block'>
            <Search onChange={handleSearchChange} className='h-full' width='sm:w-68 lg:w-90 xl:w-96 2xl:w-96' />
          </div>
        </div>
        <div className='hidden md:flex lmd:flex lg:flex xl:flex 2xl:flex gap-4 items-center'>
          <Basket />
          <Profile />
        </div>
      </header>
      <div className='flex md:hidden lmd:hidden lg:hidden xl:hidden 2xl:hidden justify-evenly w-full divide-x'>
        <button className='bg-gray-100 w-full py-4' onClick={toggleFilter}>
          Filter
        </button>
        <button className='bg-gray-100 w-full py-4' onClick={toggleSort}>
          Sort
        </button>
      </div>

      {isFilterOpen && (
        <HeaderFilter
          selectedBrands={selectedBrands}
          brands={brands}
          selectedModels={selectedModels}
          models={models}
          handleBrandChange={handleBrandChange}
          handleModelChange={handleModelChange}
          toggleFilter={toggleFilter}
        />
      )}
      {isSortOpen && <HeaderSort setIsSortOpen={setIsSortOpen} toggleSort={toggleSort} />}
      {isBasketOpen && <HeaderBasket toggleBasket={toggleBasket} />}
      <HeaderOptions totalProducts={totalProducts} toggleBasket={toggleBasket} />

      {props.children}
    </>
  );
};
