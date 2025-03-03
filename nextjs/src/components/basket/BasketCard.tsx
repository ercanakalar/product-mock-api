'use client';

import { useAppDispatch, useAppSelector } from "@/store/hook";
import { addToCart, removeFromCart } from "@/store/slices/cartSlice";
import { CartItem, CartState } from "@/type/cart-type";
import { CardBase } from "../card/base/CardBase";
import convertCurrencyTr from "@/utils/convertCurrency";

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
    <CardBase id='basket' title='Cart'>
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
                  <button className='h-6 w-6 bg-count-button-bg' onClick={() => removeCart(item.id)}>
                    <span className='text-base font-bold text-count-button/35'>-</span>
                  </button>
                  <p className='h-6 w-6 bg-count-text-bg text-center text-button-text'>{item.quantity}</p>
                  <button className='h-6 w-6 bg-count-button-bg' onClick={() => addCart(item)}>
                    <span className='text-base font-bold text-count-button/35'>+</span>
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
