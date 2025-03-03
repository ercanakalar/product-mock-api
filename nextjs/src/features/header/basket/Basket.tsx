'use client';
import { useState } from 'react';
import Image from 'next/image';
import useIsMobile from '@/hooks/useIsMobile';
import { useAppSelector } from '@/store/hook';

import { CartState } from '@/type/cart-type';

import convertCurrencyTr from '@/utils/convertCurrency';

import { BasketCard } from '@/components/basket/BasketCard';

export const Basket = () => {
  const price = useAppSelector((state: { cart: CartState }) => state.cart.totalPrice);
  const [isBasketOpen, setIsBasketOpen] = useState(false);

  const isMobile = useIsMobile(1024);

  const openBasket = () => {
    setIsBasketOpen(!isBasketOpen);
  };

  return (
    <div className='relative'>
      <div className='flex items-center justify-center gap-2 md:cursor-pointer lg:cursor-default' onClick={openBasket}>
        <span>
          <Image src='/icons/basket-white.svg' alt='basket' width={20} height={20} style={{ color: "white" }} />
        </span>
        <p className='text-base font-normal text-header-text-color'> {convertCurrencyTr(price)} </p>
      </div>
      {(isBasketOpen && isMobile) && (
        <div className='absolute top-8 -left-4 w-max'>
          <BasketCard />
        </div>
      )}
    </div>
  );
};
