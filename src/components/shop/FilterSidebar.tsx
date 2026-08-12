'use client';

import { useState, useMemo, useEffect } from 'react';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';
import {
  categories,
  buildCategoryTree,
  type Category,
} from '@/data/categories';
import { products } from '@/data/products';
import { PriceRangeSlider } from '@/components/ui/price-range';

export interface FilterState {
  categoryIds: number[];
  priceRange: [number, number];
  brands: string[];
  minRating: number | null;
  inStockOnly: boolean;
}

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  priceBounds: [number, number];
}

const categoryTree = buildCategoryTree(categories);

export default function FilterSidebar({
  filters,
  onChange,
  priceBounds,
}: FilterSidebarProps) {
  const brands = useMemo(() => {
    const set = new Set(products.map((p) => p.brand));
    return Array.from(set).sort();
  }, []);

  // Pending price range — updated smoothly while dragging, committed on Apply
  const [pendingPrice, setPendingPrice] = useState<[number, number]>(
    filters.priceRange,
  );

  // Sync pending price when filters reset externally (e.g. Clear All)
  useEffect(() => {
    setPendingPrice(filters.priceRange);
  }, [filters.priceRange]);

  const update = (partial: Partial<FilterState>) =>
    onChange({ ...filters, ...partial });

  const clearAll = () =>
    onChange({
      categoryIds: [],
      priceRange: priceBounds,
      brands: [],
      minRating: null,
      inStockOnly: false,
    });

  const hasActiveFilters =
    filters.categoryIds.length > 0 ||
    filters.priceRange[0] !== priceBounds[0] ||
    filters.priceRange[1] !== priceBounds[1] ||
    filters.brands.length > 0 ||
    filters.minRating !== null ||
    filters.inStockOnly;

  return (
    <aside className='rounded-xl border border-gray-200 bg-white p-5'>
      <div className='space-y-5'>
        {/* Header */}
        <div className='flex items-center justify-between'>
          <h3 className='text-base font-semibold text-gray-800 font-heading'>
            Filters
          </h3>
          {hasActiveFilters && (
            <button
              onClick={clearAll}
              className='text-xs font-medium text-primary hover:underline'
            >
              Clear All
            </button>
          )}
        </div>

        {/* ── Category ── */}
        <FilterSection title='Category' defaultOpen>
          <CategoryTree
            categories={categoryTree}
            selectedIds={filters.categoryIds}
            onToggle={(id) => {
              const next = filters.categoryIds.includes(id)
                ? filters.categoryIds.filter((c) => c !== id)
                : [...filters.categoryIds, id];
              update({ categoryIds: next });
            }}
          />
        </FilterSection>

        {/* ── Brand ── */}
        <FilterSection title='Brand'>
          <div className='space-y-0.5 max-h-48 overflow-y-auto'>
            {brands.map((brand) => (
              <Checkbox
                key={brand}
                label={brand}
                checked={filters.brands.includes(brand)}
                onChange={() => {
                  const next = filters.brands.includes(brand)
                    ? filters.brands.filter((b) => b !== brand)
                    : [...filters.brands, brand];
                  update({ brands: next });
                }}
              />
            ))}
          </div>
        </FilterSection>

        {/* ── Availability ── */}
        <FilterSection title='Availability'>
          <Checkbox
            label='In Stock Only'
            checked={filters.inStockOnly}
            onChange={() => update({ inStockOnly: !filters.inStockOnly })}
          />
        </FilterSection>

        {/* ── Price Range (at bottom) ── */}
        <FilterSection title='Price Range' defaultOpen>
          <PriceRangeSlider
            min={priceBounds[0]}
            max={priceBounds[1]}
            step={50}
            value={pendingPrice}
            onChange={setPendingPrice}
          />
          <div className='mt-2 flex items-center justify-between text-xs text-gray-500'>
            <span>৳{pendingPrice[0].toLocaleString()}</span>
            <span>৳{pendingPrice[1].toLocaleString()}</span>
          </div>
          <button
            onClick={() => update({ priceRange: pendingPrice })}
            className='mt-3 w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-dark'
          >
            Apply Price
          </button>
        </FilterSection>
      </div>
    </aside>
  );
}

/* ─── Filter Section (collapsible) ─── */
function FilterSection({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className='border-t border-gray-100 pt-4'>
      <button
        onClick={() => setOpen(!open)}
        className='flex w-full items-center justify-between text-sm font-semibold text-gray-700 font-heading mb-3'
      >
        {title}
        <FiChevronDown
          className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && children}
    </div>
  );
}

/* ─── Checkbox ─── */
function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: React.ReactNode;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className='flex items-center gap-2 py-1 cursor-pointer group'>
      <input
        type='checkbox'
        checked={checked}
        onChange={onChange}
        className='h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/30 accent-primary'
      />
      <span className='text-sm text-gray-600 group-hover:text-gray-800 transition-colors'>
        {label}
      </span>
    </label>
  );
}

/* ─── Recursive Category Tree ─── */
function CategoryTree({
  categories,
  selectedIds,
  onToggle,
  depth = 0,
}: {
  categories: Category[];
  selectedIds: number[];
  onToggle: (id: number) => void;
  depth?: number;
}) {
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  return (
    <div className='space-y-0.5 max-h-64 overflow-y-auto'>
      {categories.map((cat) => {
        const hasChildren = cat.children && cat.children.length > 0;
        const isExpanded = expanded.has(cat.id);
        const isSelected = selectedIds.includes(cat.id);

        return (
          <div key={cat.id}>
            <div
              className='flex items-center gap-1 py-1 cursor-pointer group'
              style={{ paddingLeft: `${depth * 16}px` }}
            >
              {hasChildren ? (
                <button
                  onClick={() =>
                    setExpanded((prev) => {
                      const next = new Set(prev);
                      next.has(cat.id) ? next.delete(cat.id) : next.add(cat.id);
                      return next;
                    })
                  }
                  className='shrink-0'
                >
                  {isExpanded ? (
                    <FiChevronDown className='h-3.5 w-3.5 text-gray-400' />
                  ) : (
                    <FiChevronRight className='h-3.5 w-3.5 text-gray-400' />
                  )}
                </button>
              ) : (
                <span className='w-3.5 shrink-0' />
              )}
              <input
                type='checkbox'
                checked={isSelected}
                onChange={() => onToggle(cat.id)}
                className='h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/30 accent-primary'
              />
              <span className='text-sm text-gray-600 group-hover:text-gray-800 transition-colors pl-1'>
                {cat.name}
              </span>
            </div>
            {hasChildren && isExpanded && (
              <CategoryTree
                categories={cat.children!}
                selectedIds={selectedIds}
                onToggle={onToggle}
                depth={depth + 1}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
