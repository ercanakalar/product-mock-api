import { useAppSelector, useAppDispatch } from '../../store/hook';
import { removeFromCart, addToCart } from '../../store/slices/cartSlice';

import { CardBase } from '../card/base/CardBase';

import convertCurrencyTr from '../../utils/convertCurrency';

import { CartItem, CartState } from '../../type/cart-type';

export const BasketCard = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state: { cart: CartState }) => state.cart.items);

  const removeCart = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const addCart = (item: CartItem) => {
    dispatch(addToCart({ ...item, quantity: 1 }));
  };

  return (
    <CardBase title='Cart'>
      <div className='relative gap-4 w-full'>
        {cartItems.length > 0 ? (
          cartItems.map((item: CartItem, index: number) => {
            return (
              <div key={index} className='flex justify-between w-full items-center bg-white p-2'>
                <div>
                  <p className='font-normal text-xs'>{item.name}</p>
                  <p className='text-xss text-blue-500'>{convertCurrencyTr(item.price)}</p>
                </div>
                <div className='flex items-center'>
                  <button className='h-6 w-6 bg-countButtonBg' onClick={() => removeCart(item.id)}>
                    <span className='text-base font-bold text-countButton/35'>-</span>
                  </button>
                  <p className='h-6 w-6 bg-countTextBg text-center text-buttonText'>{item.quantity}</p>
                  <button className='h-6 w-6 bg-countButtonBg' onClick={() => addCart(item)}>
                    <span className='text-base font-bold text-countButton/35'>+</span>
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className='text-center text-gray-500'>Your cart is empty.</p>
        )}
      </div>
    </CardBase>
  );
};
