import { ReactComponent as BasketIcon } from '../../../assets/icons/portfeil.svg';
import { useAppSelector } from '../../../store/hook';
import { useState } from 'react';
import { CartState } from '../../../type/cart-type';
import convertCurrencyTr from '../../../utils/convertCurrency';
import { BasketCard } from '../../../components/basket/BasketCard';
import useIsMobile from '../../../hooks/useIsMobile';

export const Basket = () => {
  const price = useAppSelector((state: { cart: CartState }) => state.cart.totalPrice);
  const [isBasketOpen, setIsBasketOpen] = useState(false);

  const isMobile = useIsMobile();

  const openBasket = () => {
    setIsBasketOpen(!isBasketOpen);
  };

  return (
    <div className='relative'>
      <div className='flex items-center justify-center gap-2 lg:cursor-pointer' onClick={openBasket}>
        <span>
          <BasketIcon className='w-6 h-6 text-gray-500' />
        </span>
        <p className='text-base font-normal text-headerTextColor'> {convertCurrencyTr(price)} </p>
      </div>
      {isBasketOpen && isMobile && (
        <div className='absolute top-8 -left-4 w-max'>
          <BasketCard />
        </div>
      )}
    </div>
  );
};
