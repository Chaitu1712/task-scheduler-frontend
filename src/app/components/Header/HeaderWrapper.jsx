
'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';

export default function HeaderWrapper() {
  const pathname = usePathname();
  const hideHeader = pathname === '/login' || pathname === '/register' || pathname === '/';

  if (hideHeader) {
    return null;
  }

  return (
    <div className='header-div'>
      <Header />
    </div>
  );
}