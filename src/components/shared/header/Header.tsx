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
    <header>
      <TopHeader />
      <MiddleHeader onMenuToggle={() => setIsMobileMenuOpen(true)} />
      <BottomHeader />
      <MobileBottomNav />
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
}
