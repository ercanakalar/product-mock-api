import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';

export const Search = (props: {
  className: string;
  width?: string;
  value?: string;
  onChange: (value: string) => void;
}) => {
  return (
    <div className='relative h-full hidden md:block lg:block lmd:block xl:block 2xl:block'>
      <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
        <SearchIcon data-testid='search-icon' className='w-4 h-4 text-gray-500' />
      </span>
      <input
        onChange={(e) => props.onChange(e.target.value)}
        value={props.value}
        type='text'
        className={`${props.width ? props.width : 'w-full'} ${
          props.className
        } pl-10 pr-3 py-2 border border-gray-300 border-none focus:outline-none`}
        placeholder='Search'
      />
    </div>
  );
};
