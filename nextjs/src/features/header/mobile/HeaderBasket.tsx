import { BasketCard } from "@/components/basket/BasketCard";
import Checkout from "@/components/checkout/Checkout";
import useIsMobile from "@/hooks/useIsMobile";

import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setBasketStatus } from "@/store/slices/productSlice";

import { ProductState } from "@/type/product-type";

const HeaderBasket = () => {
  const dispatch = useAppDispatch();
  const product = useAppSelector((state: { product: ProductState }) => state.product);

  const isMobile = useIsMobile(1024)

  const toggleBasket = () => {
    dispatch(setBasketStatus(!product.basketStatus));
  };

  return ((product.basketStatus && isMobile) ? (
    <div className='fixed inset-0 z-50 bg-white flex flex-col h-full overflow-y-auto'>
      <div className='flex justify-between p-4 border-b border-gray-200'>
        <h2 className='text-xl font-semibold'>Basket</h2>
        <button onClick={toggleBasket} className='text-gray-500 text-xl'>
          &#x2715;
        </button>
      </div>

      <div className='flex flex-col p-4 gap-4'>
        <BasketCard />
        <Checkout />
      </div>
    </div>) : <></>
  );
};

export default HeaderBasket;
