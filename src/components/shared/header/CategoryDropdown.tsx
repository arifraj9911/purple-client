'use client';

import Link from 'next/link';
import { useState, useRef } from 'react';
import { HiOutlineBars3 } from 'react-icons/hi2';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';
import { categories, type Category } from '@/data/categories';

/* ── helpers to work with flat category structure ── */
const getChildren = (parentId: number): Category[] =>
  categories.filter((c) => c.parentId === parentId);

const topLevelCategories = categories.filter((c) => c.parentId === null);

export default function CategoryDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(
    topLevelCategories[0]?.slug ?? '',
  );
  const [activeSubCat, setActiveSubCat] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  const handleMouseEnter = () => {
    clearTimeout(closeTimer.current);
    setIsOpen(true);
  };
  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setIsOpen(false), 120);
  };

  const activeCat =
    categories.find((c) => c.slug === activeCategory) ?? topLevelCategories[0];
  const activeCatChildren = activeCat ? getChildren(activeCat.id) : [];
  return (
    <div
      className='relative'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger Button */}
      <button
        className={`flex h-full items-center gap-1.5 border-r border-gray-200 pl-0 pr-4 py-3 font-heading text-sm font-semibold transition-colors whitespace-nowrap ${
          isOpen
            ? 'bg-primary text-white'
            : 'text-secondary hover:bg-primary hover:text-white'
        }`}
      >
        <HiOutlineBars3 className='h-5 w-5 shrink-0' />
        Categories
        <FiChevronDown
          className={`h-3 w-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown Panel */}
      <div
        className={`absolute left-0 top-full z-50 flex  mt-0 rounded-b-lg border border-gray-200 bg-white shadow-xl transition-all duration-200 origin-top ${
          isOpen
            ? 'opacity-100 visible translate-y-0'
            : 'opacity-0 invisible -translate-y-1'
        }`}
      >
        {/* === LEFT PANEL: Parent Categories === */}
        <div className='w-52 shrink-0 border-r border-gray-100 bg-gray-50 py-2'>
          <ul className='space-y-0.5'>
            {topLevelCategories.map((cat) => (
              <li key={cat.slug}>
                <button
                  onMouseEnter={() => {
                    setActiveCategory(cat.slug);
                    setActiveSubCat(null);
                  }}
                  className={`flex w-full items-center gap-2 pl-4 pr-2 py-2.5 text-sm font-medium transition-all duration-300 ease-in-out text-left border-l-2 ${
                    activeCategory === cat.slug
                      ? 'bg-white text-primary border-l-primary pl-6'
                      : 'text-gray-700 border-l-transparent hover:bg-white hover:text-primary hover:pl-6'
                  }`}
                >
                  <span className='truncate flex-1'>{cat.name}</span>
                  {getChildren(cat.id).length > 0 && (
                    <FiChevronRight className='h-3.5 w-3.5 shrink-0 text-gray-400' />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* === RIGHT PANEL: Subcategories (vertical list) === */}
        <div className='w-56 border-r border-gray-100 py-2 bg-white'>
          {activeCat && activeCatChildren.length > 0 ? (
            <ul className='space-y-0.5'>
              {activeCatChildren.map((child) => {
                const grandChildren = getChildren(child.id);
                return (
                  <li
                    key={child.slug}
                    onMouseEnter={() => setActiveSubCat(child.slug)}
                    onMouseLeave={() => setActiveSubCat(null)}
                    className='relative'
                  >
                    <Link
                      href={`/shop?category=${child.slug}`}
                      className='flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 transition-colors'
                    >
                      <span className='truncate flex-1'>{child.name}</span>
                      {grandChildren.length > 0 && (
                        <FiChevronRight className='h-3 w-3 shrink-0 text-gray-400' />
                      )}
                    </Link>

                    {/* Grand Children (3rd level) — nested sub-panel */}
                    {grandChildren.length > 0 &&
                      activeSubCat === child.slug && (
                        <div className='absolute left-full top-0 z-50 w-52 rounded-lg border border-gray-200 bg-white py-2 shadow-lg'>
                          <ul className='space-y-0.5'>
                            {grandChildren.map((grandchild) => (
                              <li key={grandchild.slug}>
                                <Link
                                  href={`/shop?category=${grandchild.slug}`}
                                  className='block px-4 py-1.5 text-sm text-gray-500 hover:text-primary hover:bg-gray-50 transition-colors'
                                >
                                  {grandchild.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className='px-4 py-2 text-sm text-gray-400'>No items</p>
          )}
        </div>
      </div>
    </div>
  );
}
