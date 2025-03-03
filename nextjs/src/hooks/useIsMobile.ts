'use client';
import { useEffect, useState } from 'react';

export default function useIsMobile(mobileScreenSize = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setIsMobile(window.innerWidth < mobileScreenSize);
      };

      handleResize();
      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
    }
  }, [mobileScreenSize]);

  return isMobile;
}
