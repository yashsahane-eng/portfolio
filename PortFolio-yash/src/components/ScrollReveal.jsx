import React from 'react';
import { useInView } from '../hooks/useInView';

// Wraps children with a scroll-triggered fade+up reveal animation
const ScrollReveal = ({ children, delay = 0, className = '', direction = 'up' }) => {
  const [ref, isInView] = useInView();

  const transforms = {
    up: 'translateY(30px)',
    down: 'translateY(-30px)',
    left: 'translateX(30px)',
    right: 'translateX(-30px)',
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translate(0, 0)' : transforms[direction],
        transition: `opacity 0.7s cubic-bezier(0.25, 0.1, 0.25, 1) ${delay}ms, transform 0.7s cubic-bezier(0.25, 0.1, 0.25, 1) ${delay}ms`,
        willChange: isInView ? 'auto' : 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
