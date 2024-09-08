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
    <div className='flex w-44 h-80'>
      <CardBase width='w-44' justify='justify-center'>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-4 cursor-pointer' onClick={() => handleCardClick(props?.product?.id)}>
            <img className='flex w-40 h-36' alt={props.product.name} src={props.product.image} />
            <p className='flex text-sm font-medium text-cardPrice'>{convertCurrencyTr(Number(props.product.price))}</p>
            <h3 className='flex text-sm font-medium'>{props.product.name}</h3>
          </div>

          <button
            onClick={handleAddToCart}
            className='px-4 py-2 text-buttonText bg-button rounded text-base font-normal'
          >
            Add to Cart
          </button>
        </div>
      </CardBase>
    </div>
  );
};

export default ProductCard;
