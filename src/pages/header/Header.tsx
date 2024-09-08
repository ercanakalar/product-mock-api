import { useAppDispatch } from '../../store/hook';
import { setSearchTerm } from '../../store/slices/productSlice';

import { Search } from '../../components/search/Search';

import { Profile } from '../../features/header/profile/Profile';
import { Basket } from '../../features/header/basket/Basket';
import { HeaderTitle } from '../../features/header/HeaderTitle';

import { LayoutProps } from '../../type/children-type';

export const Header = (props: LayoutProps) => {
  const dispatch = useAppDispatch();

  const handleSearchChange = (term: string) => {
    dispatch(setSearchTerm(term));
  };

  return (
    <>
      <header className='flex justify-around bg-headerColor h-12 w-full'>
        <div className='flex gap-20 items-center'>
          <HeaderTitle />
          <div className='h-full p-2'>
            <Search onChange={handleSearchChange} className='h-full' width='w-96' />
          </div>
        </div>
        <div className='flex gap-4 items-center'>
          <Basket />
          <Profile />
        </div>
      </header>
      {props.children}
    </>
  );
};
