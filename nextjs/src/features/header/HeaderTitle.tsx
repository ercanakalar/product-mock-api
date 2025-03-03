'use client'

import { useRouter } from 'next/navigation'

export const HeaderTitle = () => {
  const router = useRouter()
  const homeBack = () => {
    router.push('/')
  };

  return (
    <h1 onClick={homeBack} className='lmd:font-extrabold lmd:text-2xl text-center text-header-text-color cursor-pointer'>
      Company
    </h1>
  );
};
