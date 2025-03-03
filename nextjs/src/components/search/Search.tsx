import Image from "next/image";
import { useRef } from "react";

export const Search = (props: {
  className: string;
  width?: string;
  value?: string;
  onChange: (value: string) => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className='relative h-full hidden bg-white rounded md:block lg:block lmd:block xl:block 2xl:block'>
      <span onClick={() => props.onChange(inputRef.current?.value || '')} className='absolute inset-y-0 left-0 flex items-center pl-3 cursor-pointer'>
        <Image src='/icons/search.svg' alt='search' width={20} height={20} style={{ width: 'auto', height: 'auto' }} priority />
      </span>
      <input
        onChange={() => props.onChange(inputRef.current?.value || '')}
        value={props.value}
        type='text'
        ref={inputRef}
        className={`${props.width ? props.width : 'w-full'} ${props.className
          } pl-10 pr-3 py-2 text-black border border-gray-300 border-none focus:outline-none`}
        placeholder='Search'
      />
    </div>
  );
};
