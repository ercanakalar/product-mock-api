import { useAppDispatch, useAppSelector } from '../../store/hook';
import { setSort } from '../../store/slices/productSlice';

import { CardBase } from '../card/base/CardBase';

export const SortBy = (props: { className?: string; title: string; filter: string[] }) => {
  const dispatch = useAppDispatch();
  const sort = useAppSelector((state: any) => state.product.sort);

  const handleSortChange = (value: string) => {
    dispatch(setSort(value));
  };

  return (
    <CardBase position={props.className} title={props.title}>
      <div className='flex flex-col gap-2 pt-2'>
        {props.filter.map((filter) => (
          <div key={filter} className='flex items-center space-x-2'>
            <input
              type='radio'
              id={filter}
              name='sortBy'
              value={filter}
              className='h-4 w-4'
              checked={sort === filter}
              onChange={() => handleSortChange(filter)}
            />
            <label htmlFor={filter} className='cursor-pointer'>
              {filter}
            </label>
          </div>
        ))}
      </div>
    </CardBase>
  );
};
