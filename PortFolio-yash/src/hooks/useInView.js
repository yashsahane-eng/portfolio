import { useEffect, useRef, useState } from 'react';

// Intersection Observer hook for scroll-triggered reveal animations
export function useInView(options = {}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setIsInView(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          // Once revealed, stop observing — no re-hide on scroll back
          observer.unobserve(element);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px', ...options }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [ref, isInView];
}
