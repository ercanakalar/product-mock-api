'use client'
import { useEffect } from 'react';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { getTotalCart } from '@/store/slices/cartSlice';
import { setBasketStatus } from '@/store/slices/productSlice';

import { CartState } from '@/type/cart-type';
import { ProductState } from '@/type/product-type';


const HeaderOptions = () => {
  const dispatch = useAppDispatch();

  const totalProducts = useAppSelector((state: { cart: CartState }) => state.cart.totalProducts);
  const cartItems = useAppSelector((state: { cart: CartState }) => state.cart.items);
  const basketStatus = useAppSelector((state: { product: ProductState }) => state.product.basketStatus);

  const toggleBasket = () => {
    dispatch(setBasketStatus(!basketStatus));
  };

  useEffect(() => {
    dispatch(getTotalCart());
  }, [dispatch, cartItems]);

  return (
    <div className='fixed md:hidden lmd:hidden lg:hidden xl:hidden 2xl:hidden bottom-0 left-0 w-full bg-white shadow-lg border-t border-gray-200 flex justify-around items-center'>
      <button className='flex flex-col items-center p-4'>
        <Image src='/icons/home.svg'
          width={20}
          height={20}
          alt="home" />
      </button>
      <button className='flex flex-col items-center p-4'>
        <Image src='/icons/search.svg'
          width={20}
          height={20}
          alt='search' />
      </button>
      <button className='flex flex-col items-center p-4' onClick={toggleBasket}>
        <div className='relative'>
          <p className='absolute left-2 -top-2 text-xs text-red-600'>{totalProducts}</p>
        </div>
        <Image src='/icons/basket-black.svg'
          width={20}
          height={20}
          alt='basket' />
      </button>
      <button className='flex flex-col items-center p-4'>
        <Image src='/icons/profile-black.svg'
          width={20}
          height={20}
          alt='profile' />
      </button>
    </div>
  );
};

export default HeaderOptions;
