'use client';

import { useRef, useCallback } from 'react';

interface PriceRangeProps {
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

export default function PriceRangeSlider({
  min,
  max,
  step = 10,
  value,
  onChange,
}: PriceRangeProps) {
  const [localMin, localMinPercent] = [
    value[0],
    ((value[0] - min) / (max - min)) * 100,
  ];
  const [localMax, localMaxPercent] = [
    value[1],
    ((value[1] - min) / (max - min)) * 100,
  ];

  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef<'min' | 'max' | null>(null);

  const getPercent = useCallback(
    (clientX: number) => {
      const rect = trackRef.current?.getBoundingClientRect();
      if (!rect) return 0;
      const pct = Math.max(
        0,
        Math.min(100, ((clientX - rect.left) / rect.width) * 100),
      );
      return Math.round((pct / 100) * (max - min) + min);
    },
    [min, max, step],
  );

  const handlePointerDown =
    (handle: 'min' | 'max') => (e: React.PointerEvent) => {
      e.preventDefault();
      dragging.current = handle;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const raw = getPercent(e.clientX);
    const snapped = Math.round(raw / step) * step;

    if (dragging.current === 'min') {
      const clamped = Math.min(snapped, value[1] - step);
      onChange([Math.max(min, clamped), value[1]]);
    } else {
      const clamped = Math.max(snapped, value[0] + step);
      onChange([value[0], Math.min(max, clamped)]);
    }
  };

  const handlePointerUp = () => {
    dragging.current = null;
  };

  const gap = localMaxPercent - localMinPercent;

  return (
    <div
      ref={trackRef}
      className='relative h-1.5 w-full rounded-full bg-gray-200 select-none touch-none'
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* Active range */}
      <div
        className='absolute h-full rounded-full bg-primary transition-all duration-150'
        style={{ left: `${localMinPercent}%`, width: `${gap}%` }}
      />

      {/* Min thumb */}
      <div
        className='absolute top-1/2 -translate-y-1/2 h-4 w-4 cursor-pointer rounded-full border-2 border-primary bg-white shadow-md transition-transform hover:scale-110'
        style={{ left: `calc(${localMinPercent}% - 8px)` }}
        onPointerDown={handlePointerDown('min')}
      />

      {/* Max thumb */}
      <div
        className='absolute top-1/2 -translate-y-1/2 h-4 w-4 cursor-pointer rounded-full border-2 border-primary bg-white shadow-md transition-transform hover:scale-110'
        style={{ left: `calc(${localMaxPercent}% - 8px)` }}
        onPointerDown={handlePointerDown('max')}
      />
    </div>
  );
}
