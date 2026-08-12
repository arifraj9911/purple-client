'use client';

import { useState } from 'react';
import TopHeader from './topHeader/TopHeader';
import MiddleHeader from './middleHeader/MiddleHeader';
import BottomHeader from './bottomHeader/BottomHeader';
import MobileMenu from './MobileMenu';
import MobileBottomNav from './MobileBottomNav';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <TopHeader />
      {/* Sticky wrapper: MiddleHeader + BottomHeader stick together on scroll.
          Must be a direct child of the scrolling container — NOT wrapped in <header>. */}
      <div className='sticky top-0 z-40'>
        <MiddleHeader onMenuToggle={() => setIsMobileMenuOpen(true)} />
        <BottomHeader />
      </div>
      <MobileBottomNav />
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
