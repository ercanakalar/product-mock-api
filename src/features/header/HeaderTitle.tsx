import { useNavigate } from 'react-router-dom';

export const HeaderTitle = () => {
  const navigate = useNavigate();

  const homeBack = () => {
    navigate(`/`);
  };
  return <h1 onClick={homeBack} className='font-extrabold text-2xl text-center text-headerTextColor cursor-pointer'>Eteration</h1>;
};
