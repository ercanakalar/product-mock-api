import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../../store/services/productService';
import { addToCart } from '../../store/slices/cartSlice';

import { CardBase } from '../../components/card/base/CardBase';

import convertCurrencyTr from '../../utils/convertCurrency';

import { useAppDispatch } from '../../store/hook';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const { data: product, isLoading, error } = useGetProductByIdQuery(id || '');

  if (isLoading)
    return (
      <div className='flex relative justify-end w-3/4 pt-6'>
        <CardBase width='w-5/6 ml-auto' position='float-right'>
          <div className='flex flex-col gap-4'>
            <div className='flex'>
              <div className='flex w-1/2 h-0 bg-gray-300' />
              <div className='flex w-1/2 h-0 bg-gray-300' />
            </div>
            <div className='flex'>
              <div className='flex w-1/2 h-0 bg-gray-300' />
              <div className='flex w-1/2 h-0 bg-gray-300' />
            </div>
          </div>
        </CardBase>
      </div>
    );

  if (error || !product) return <p>Product not found.</p>;

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: Number(product.price),
        image: product.image,
        quantity: 1,
      })
    );
  };

  return (
    <div className='flex relative justify-end w-3/4 pt-6'>
      <CardBase width='w-5/6 ml-auto' position='float-right'>
        <div className='flex gap-4'>
          <img className='flex' alt={product.name} src={product.image} />
          <div>
            <div className='flex flex-col mb-10'>
              <h3 className='flex text-2xl font-medium'>{product.name}</h3>
              <p className='flex text-2xl font-normal text-cardPrice'>{convertCurrencyTr(Number(product.price))}</p>
            </div>
            <div className='flex flex-col gap-10'>
              <button
                onClick={handleAddToCart}
                className='flex px-4 py-2 justify-center text-buttonText bg-button rounded text-base font-normal'
              >
                Add to Cart
              </button>
              <p className='flex text-sm font-medium'>{product.description}</p>
            </div>
          </div>
        </div>
      </CardBase>
    </div>
  );
};

export default ProductDetail;
