'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

type Slide = {
  src: string;
  alt: string;
  overlay?: string; // teks overlay opsional
};

type Props = {
  slides: Slide[];
  intervalMs?: number;          // default 4000 ms
  className?: string;           // styling wrapper
  aspect?: string;              // contoh: "aspect-square" | "aspect-video"
  rounded?: string;             // contoh: "rounded-2xl"
  shadow?: string;              // contoh: "shadow-xl"
  pauseOnHover?: boolean;       // default true
};

export default function ImageCarousel({
  slides,
  intervalMs = 4000,
  className,
  aspect = 'aspect-square',
  rounded = 'rounded-2xl',
  shadow = 'shadow-xl',
  pauseOnHover = true,
}: Props) {
  const [index, setIndex] = useState(0);
  const [isPaused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const goTo = (i: number) => {
    const len = slides.length;
    setIndex(((i % len) + len) % len);
  };

  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  // Auto-rotate
  useEffect(() => {
    if (slides.length <= 1) return;
    if (isPaused) return;
    const id = setInterval(next, intervalMs);
    return () => clearInterval(id);
  }, [index, isPaused, intervalMs, slides.length]);

  // Keyboard nav saat fokus di dalam carousel
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    el.addEventListener('keydown', onKey);
    return () => el.removeEventListener('keydown', onKey);
  }, []);

  // Swipe (touch)
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    const threshold = 40; // px
    if (delta > threshold) prev();
    else if (delta < -threshold) next();
    touchStartX.current = null;
  };

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      aria-roledescription="carousel"
      aria-label="Galeri foto"
      className={clsx('relative select-none outline-none', className)}
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className={clsx(aspect, rounded, 'overflow-hidden', shadow)}>
        {/* Track */}
        <div
          className="h-full w-full flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
          aria-live="polite"
        >
          {slides.map((s, i) => (
            <div key={i} className="min-w-full h-full relative">
              <img
                src={s.src}
                alt={s.alt}
                className="w-full h-full object-cover"
                loading={i === 0 ? 'eager' : 'lazy'}
              />
              {s.overlay && (
                <span
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                             bg-black/60 text-white px-4 py-2 rounded-lg text-sm font-semibold"
                  aria-hidden="true"
                  style={{ pointerEvents: 'none' }}
                >
                  {s.overlay}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/70 backdrop-blur
                       border border-border p-2 rounded-full hover:scale-105 transition"
            aria-label="Sebelumnya"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/70 backdrop-blur
                       border border-border p-2 rounded-full hover:scale-105 transition"
            aria-label="Berikutnya"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-2 left-0 right-0 flex items-center justify-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Ke slide ${i + 1}`}
                onClick={() => goTo(i)}
                className={clsx(
                  'h-2.5 rounded-full transition-all',
                  i === index ? 'w-6 bg-primary' : 'w-2.5 bg-muted-foreground/40'
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
