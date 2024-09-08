import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../../store/services/productService';
import { addToCart } from '../../store/slices/cartSlice';
import { CardBase } from '../../components/card/base/CardBase';
import convertCurrencyTr from '../../utils/convertCurrency';
import { useAppDispatch } from '../../store/hook';
import { useEffect } from 'react';
import { setProductId } from '../../store/slices/productSlice';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setProductId(id || ''));
  }, [dispatch, id]);

  const { data: product, isLoading, error } = useGetProductByIdQuery(id || '');

  if (isLoading) return <div className='flex justify-center items-center h-full'>Loading...</div>;

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
    <div className='flex justify-center items-center w-full md:w-3/4 2xl:w-3/4 pt-6'>
      <CardBase width='w-full ml-auto md:w-5/6 lg:md:w-5/6'>
        <div className='flex flex-col xl:flex-row gap-4'>
          <img className='w-full max-h-96 object-cover' alt={product.name} src={product.image} />
          <div className='flex flex-col justify-between w-full lg:w-full'>
            <div className='flex flex-col mb-4'>
              <h3 className='text-xl md:text-2xl font-medium'>{product.name}</h3>
              <p className='text-lg md:text-2xl font-normal text-cardPrice'>
                {convertCurrencyTr(Number(product.price))}
              </p>
            </div>
            <div className='flex flex-col gap-4'>
              <button
                onClick={handleAddToCart}
                className='w-full px-2 py-1 2xl:px-4 2xl:py-2  text-buttonText bg-button rounded text-base font-normal'
              >
                Add to Cart
              </button>
              <p className='text-sm md:text-sm lg:text-sm font-medium'>{product.description}</p>
            </div>
          </div>
        </div>
      </CardBase>
    </div>
  );
};

export default ProductDetail;
