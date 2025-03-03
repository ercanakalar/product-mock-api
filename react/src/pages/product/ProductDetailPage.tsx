import { BasketCard } from '../../components/basket/BasketCard';
import Checkout from '../../components/checkout/Checkout';
import ProductDetail from '../../features/product/ProductDetail';

const ProductDetailPage = () => {
  return (
    <div className='flex h-full w-full'>
      <ProductDetail />
      <div className='hidden md:flex lg:flex xl:flex flex-col w-1/4 md:w-2/4 lg:w-1/4 p-6'>
        <BasketCard />
        <Checkout />
      </div>
    </div>
  );
};

export default ProductDetailPage;
