import { ReactComponent as BasketIcon } from '../../../assets/icons/portfeil.svg';
import { useAppSelector } from '../../../store/hook';

import { CartState } from '../../../type/cart-type';

import convertCurrencyTr from '../../../utils/convertCurrency';

export const Basket = () => {
  const price = useAppSelector((state: { cart: CartState }) => state.cart.totalPrice);

  return (
    <div className='flex items-center justify-center gap-2'>
      <span className=''>
        <BasketIcon className='w-6 h-6 text-gray-500' />
      </span>
      <p className='text-base font-normal text-headerTextColor'> {convertCurrencyTr(price)} </p>
    </div>
  );
};
