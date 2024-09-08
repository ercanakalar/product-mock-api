import { BasketCard } from '../../../components/basket/BasketCard';
import Checkout from '../../../components/checkout/Checkout';

const HeaderBasket = (props: { toggleBasket: () => void }) => {
  return (
    <div className='fixed inset-0 z-50 bg-white flex flex-col h-full overflow-y-auto'>
      <div className='flex justify-between p-4 border-b border-gray-200'>
        <h2 className='text-xl font-semibold'>Basket</h2>
        <button onClick={props.toggleBasket} className='text-gray-500 text-xl'>
          &#x2715;
        </button>
      </div>

      <div className='flex flex-col p-4 gap-4'>
        <BasketCard />
        <Checkout />
      </div>
    </div>
  );
};

export default HeaderBasket;
