import { useState } from 'react';

import { CardBase } from '../card/base/CardBase';
import { Search } from '../search/Search';

export const Filter = (props: {
  className?: string;
  title: string;
  filter: Set<string>;
  onChange: (value: string) => void;
  selectedFilter?: Set<string>;
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filtersArray = props.filter ? Array.from(props.filter) : [];
  const filteredArray = filtersArray.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <CardBase position={props.className} title={props.title} width='w-auto lmd:w-60 lg:w-60 xl:w-60 2xl:w-60'>
      <div className='text-xs w-full lg:text-base lmd:text-base xl:text-base 2xl:text-base'>
        <Search
          className='bg-filterSearch h-10'
          value={searchTerm}
          onChange={setSearchTerm}
        />
        <div className='flex flex-col gap-2 pt-2 h-24 overflow-y-auto scrollbar-thin scrollbar-thumb'>
          {filteredArray.length > 0 &&
            filteredArray.map((filter) => (
              <div key={filter} className='flex items-center space-x-2'>
                <input
                  name={props.title}
                  id={filter}
                  type='checkbox'
                  className='h-4 w-4'
                  checked={props.selectedFilter?.has(filter) ?? false}
                  onChange={() => props.onChange(filter)}
                />
                <label htmlFor={filter}>{filter}</label>
              </div>
            ))}
        </div>
      </div>
    </CardBase>
  );
};
