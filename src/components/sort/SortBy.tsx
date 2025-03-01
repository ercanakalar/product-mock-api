import { sortOptions } from '../../constants/sortConstant';
import { CardBase } from '../card/base/CardBase';

export const SortBy = (props: {
  className?: string;
  title: string;
  selectedSort?: string;
  handleSortChange: (value: string) => void;
}) => {
  const onChange = (value: string) => {
    props.handleSortChange(value);
  };

  return (
    <CardBase position={props.className} title={props.title} width='w-auto lmd:w-60 lg:w-60 xl:w-60 2xl:w-60'>
      <div className='flex flex-col gap-2 pt-2 text-xs lg:text-base lmd:text-base xl:text-base 2xl:text-base'>
        {sortOptions.map((filter) => (
          <div key={filter} className='flex items-center space-x-2'>
            <input
              type='radio'
              id={filter}
              name='sortBy'
              value={filter}
              className='h-4 w-4'
              checked={props.selectedSort === filter}
              onChange={() => onChange(filter)}
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
