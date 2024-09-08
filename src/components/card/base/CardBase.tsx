import React from 'react';

export const CardBase = (props: { 
  position?: string; 
  className?: string;
  width?: string;
  justify?: string;
  title?: string; 
  children: React.ReactNode 
}) => {
  return (
    <div className={props.position}>
      <p className={`${props.title ? '' : 'hidden'} text-xs font-normal text-cardTitle`}>{props.title}</p>
      <div className={`flex ${props.justify ?? 'justify-between'} ${props.width ??  'w-56'} h-max items-center bg-white shadow-md p-2.5 mb-4 ${props.className}`}>
        {props.children}
      </div>
    </div>
  );
};
