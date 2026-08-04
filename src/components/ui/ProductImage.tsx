'use client';

import { useEffect, useState } from 'react';
import { generateProductThumbnail } from '@/lib/generateProductThumbnail';

interface ProductImageProps {
  src: string;
  alt: string;
  size?: number;
  className?: string;
}

export default function ProductImage({
  src,
  alt,
  size = 800,
  className = '',
}: ProductImageProps) {
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  /** Tracks which src was last resolved — used to derive loading in render */
  const [resolvedSrc, setResolvedSrc] = useState<string | null>(null);

  /* Derive loading from state comparison (no refs, no setState in effect) */
  const isLoading = resolvedSrc !== src;

  useEffect(() => {
    let cancelled = false;

    generateProductThumbnail(src, { size })
      .then((url) => {
        if (!cancelled) {
          setResolvedSrc(src);
          setThumbnail(url);
          setFailed(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setResolvedSrc(src);
          setFailed(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [src, size]);

  if (isLoading) {
    return (
      <div
        className={`absolute inset-0 animate-pulse bg-gray-100 ${className}`}
      />
    );
  }

  if (failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        className={`absolute inset-0 h-full w-full object-cover object-top ${className}`}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={thumbnail!}
      alt={alt}
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
    />
  );
}
