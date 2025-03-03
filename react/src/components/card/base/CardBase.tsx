import React from 'react';

export const CardBase = (props: {
  id?: string;
  position?: string;
  className?: string;
  width?: string;
  justify?: string;
  title?: string;
  children: React.ReactNode;
}) => {
  return (
    <div id={props.id} className={props.position}>
      <p className={`${props.title ? '' : 'hidden'} text-xs font-normal text-cardTitle w-fit`}>{props.title}</p>
      <div
        className={`flex ${props.justify ?? 'justify-between'} ${
          props.width ?? 'w-auto lg:w-56 xl:w-56 2xl:w-56'
        } h-max items-center bg-white shadow-md p-2.5 mb-4 ${props.className ?? ''}`}
      >
        {props.children}
      </div>
    </div>
  );
};
