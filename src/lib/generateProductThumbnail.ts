/**
 * Converts any source image into a fixed-size square thumbnail.
 *
 * The original image is NEVER cropped — it is scaled down to fit
 * fully inside the square (like `object-contain`), but instead of
 * leaving empty/white padding, the remaining space is filled with
 * a softly blurred, zoomed-in copy of the same image. Visually it
 * reads as an intentional backdrop, not letterboxing.
 *
 * Result: every product image ends up with the *exact* same
 * width/height (e.g. 800x800), so the card layout never has to
 * guess how to crop it.
 */

const thumbnailCache = new Map<string, Promise<string>>();

interface ThumbnailOptions {
  size?: number; // output width & height in px (square)
  blur?: number; // backdrop blur amount in px
  quality?: number; // jpeg quality 0-1
}

export function generateProductThumbnail(
  src: string,
  { size = 800, blur = 28, quality = 0.92 }: ThumbnailOptions = {},
): Promise<string> {
  const cacheKey = `${src}__${size}__${blur}`;

  if (thumbnailCache.has(cacheKey)) {
    return thumbnailCache.get(cacheKey)!;
  }

  const promise = new Promise<string>((resolve, reject) => {
    const img = new window.Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          reject(new Error('Canvas 2D context not available'));
          return;
        }

        const iw = img.naturalWidth;
        const ih = img.naturalHeight;

        // ── 1. Blurred "cover" backdrop (fills every corner, no gaps) ──
        const coverScale = Math.max(size / iw, size / ih);
        const coverW = iw * coverScale;
        const coverH = ih * coverScale;
        const coverX = (size - coverW) / 2;
        const coverY = (size - coverH) / 2;

        ctx.save();
        ctx.filter = `blur(${blur}px) brightness(0.97) saturate(1.05)`;
        ctx.drawImage(img, coverX, coverY, coverW, coverH);
        ctx.restore();

        // soft white wash so the blurred backdrop stays subtle
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.fillRect(0, 0, size, size);

        // ── 2. Full, un-cropped image on top ("contain" math) ──
        const containScale = Math.min(size / iw, size / ih);
        const containW = iw * containScale;
        const containH = ih * containScale;
        const containX = (size - containW) / 2;
        const containY = (size - containH) / 2;

        ctx.drawImage(img, containX, containY, containW, containH);

        resolve(canvas.toDataURL('image/jpeg', quality));
      } catch (err) {
        reject(
          err instanceof Error ? err : new Error('Thumbnail generation failed'),
        );
      }
    };

    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });

  thumbnailCache.set(cacheKey, promise);
  // don't cache failures — allow retry next render
  promise.catch(() => thumbnailCache.delete(cacheKey));

  return promise;
}
