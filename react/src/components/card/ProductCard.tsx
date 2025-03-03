import { useNavigate } from 'react-router-dom';

import { addToCart } from '../../store/slices/cartSlice';
import { useAppDispatch } from '../../store/hook';

import { CardBase } from './base/CardBase';

import convertCurrencyTr from '../../utils/convertCurrency';

const ProductCard = (props: {
  className?: string;
  product?: { id: string; name: string; price: string; image: string } | undefined;
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (!props.product) {
    return null;
  }

  const handleCardClick = (productId: string | undefined) => {
    navigate(`/product/${productId}`);
  };

  const handleAddToCart = () => {
    if (props.product) {
      dispatch(
        addToCart({
          id: props.product.id,
          name: props.product.name,
          price: Number(props.product.price),
          image: props.product.image,
          quantity: 1,
        })
      );
    }
  };

  return (
    <div className='flex w-auto h-fit lmd:h-80 lg:h-80 xl:h-80 2xl:h-80'>
      <CardBase width='w-auto lmd:w-44 lg:w-44 xl:w-44 2xl:w-44' justify='justify-center'>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-4 cursor-pointer' onClick={() => handleCardClick(props?.product?.id)}>
            <img className='flex w-36 h-30 lmd:w-40 lg:w-40 xl:w-40 2xl:w-40 lmd:h-36 lg:h-36 xl:h-36 2xl:h-36' alt={props.product.name} src={props.product.image} />
            <p className='flex font-medium text-cardPrice text-xs lg:text-base lmd:text-base xl:text-base 2xl:text-base'>
              {convertCurrencyTr(Number(props.product.price))}
            </p>
            <h3 className='flex font-medium text-xs text-nowrap lg:text-base lmd:text-base xl:text-base 2xl:text-base'>
              {props.product.name}
            </h3>
          </div>

          <button
            onClick={handleAddToCart}
            className='px-2 py-1 lmd:px-4 lg:px-4 xl:px-4 2xl:px-4 lmd:py-2 lg:py-2 xl:py-2 2xl:py-2 text-buttonText bg-button rounded text-base font-normal'
          >
            Add to Cart
          </button>
        </div>
      </CardBase>
    </div>
  );
};

export default ProductCard;
