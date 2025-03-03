import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hook';
import { setProductId } from '../../store/slices/productSlice';

export const HeaderTitle = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const homeBack = () => {
    dispatch(setProductId(''));
    navigate(`/`);
  };
  return (
    <h1 onClick={homeBack} className=' lmd:font-extrabold lmd:text-2xl text-center text-headerTextColor cursor-pointer'>
      Company
    </h1>
  );
};
