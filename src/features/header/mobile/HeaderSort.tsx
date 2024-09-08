import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hook';
import { setSort } from '../../../store/slices/productSlice';
import { SortBy } from '../../../components/sort/SortBy';
import { ProductState } from '../../../type/product-type';

const HeaderSort = (props: { setIsSortOpen: (isOpen: boolean) => void; toggleSort: () => void }) => {
  const dispatch = useAppDispatch();
  const currentSort = useAppSelector((state: { product: ProductState }) => state.product.sort);
  const [localSort, setLocalSort] = useState(currentSort);

  const handleSortChange = (value: string) => {
    setLocalSort(value);
  };

  const applySort = () => {
    dispatch(setSort(localSort));
    props.setIsSortOpen(false);
  };

  return (
    <div className='fixed inset-0 z-50 bg-white flex flex-col h-full overflow-y-auto'>
      <div className='flex justify-between p-4 border-b border-gray-200'>
        <h2 className='text-xl font-semibold'>Sort</h2>
        <button onClick={props.toggleSort} className='text-gray-500 text-xl'>
          &#x2715;
        </button>
      </div>

      <div className='flex flex-col p-4 gap-4'>
        <SortBy
          className='lg:ml-0 2xl:ml-auto'
          title='Sort By'
          selectedSort={localSort}
          handleSortChange={handleSortChange}
        />
        <button onClick={applySort} className='bg-blue-500 text-white py-2 rounded mt-4'>
          Apply
        </button>
      </div>
    </div>
  );
};

export default HeaderSort;
