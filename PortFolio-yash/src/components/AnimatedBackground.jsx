import React, { useEffect, useRef, useCallback } from 'react';
import { useScrollProgress } from '../hooks/useScrollProgress';

// Lightweight animated background — floating particles, circuit traces, scroll-reactive gradients
const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  const scrollProgress = useScrollProgress();
  const scrollRef = useRef(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const particlesRef = useRef([]);
  const circuitLinesRef = useRef([]);
  const frameRef = useRef(0);

  // Sync scroll value into ref for animation loop access
  useEffect(() => { scrollRef.current = scrollProgress; }, [scrollProgress]);

  // Mouse tracking
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const onMove = (e) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const initParticles = useCallback((width, height) => {
    const count = Math.min(60, Math.floor((width * height) / 25000));
    const particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.8 + 0.4,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.4 + 0.1,
        pulse: Math.random() * Math.PI * 2,
        // Code symbol particles (subset)
        isSymbol: Math.random() > 0.75,
        symbol: ['{ }', '< />', '( )', '=>', '[ ]', '&&', '||', '::'][Math.floor(Math.random() * 8)],
      });
    }
    return particles;
  }, []);

  const initCircuitLines = useCallback((width, height) => {
    const lines = [];
    const count = Math.min(5, Math.floor(width / 400));
    for (let i = 0; i < count; i++) {
      const segments = [];
      let x = Math.random() * width;
      let y = Math.random() * height;
      const segCount = Math.floor(Math.random() * 4) + 3;
      for (let s = 0; s < segCount; s++) {
        const nextX = x + (Math.random() - 0.5) * 200;
        const nextY = y + (Math.random() * 100 + 40);
        segments.push({ x1: x, y1: y, x2: nextX, y2: nextY });
        x = nextX;
        y = nextY;
      }
      lines.push({
        segments,
        progress: Math.random(),
        speed: 0.001 + Math.random() * 0.002,
        opacity: 0,
        targetOpacity: 0,
        cooldown: Math.random() * 600 + 200,
        timer: 0,
      });
    }
    return lines;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.scale(dpr, dpr);
      particlesRef.current = initParticles(window.innerWidth, window.innerHeight);
      circuitLinesRef.current = initCircuitLines(window.innerWidth, window.innerHeight);
    };

    resize();
    window.addEventListener('resize', resize);

    if (prefersReduced) {
      // Static render for reduced motion
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current.forEach(p => {
        ctx.fillStyle = `rgba(59, 130, 246, ${p.opacity * 0.5})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      return () => window.removeEventListener('resize', resize);
    }

    let animId;
    const w = () => window.innerWidth;
    const h = () => window.innerHeight;

    const animate = () => {
      frameRef.current++;
      const frame = frameRef.current;
      const scroll = scrollRef.current;
      const mouse = mouseRef.current;
      const width = w();
      const height = h();

      ctx.clearRect(0, 0, width, height);

      // Scroll-reactive gradient glow — subtle ambient light that shifts with scroll
      const glowX = width * (0.3 + mouse.x * 0.4);
      const glowY = height * (0.3 + mouse.y * 0.4);
      const hue = 210 + scroll * 40;
      const grad = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, 400);
      grad.addColorStop(0, `hsla(${hue}, 80%, 50%, 0.04)`);
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Secondary glow tied to scroll position
      const glow2X = width * (0.7 - scroll * 0.3);
      const glow2Y = height * (0.6 + scroll * 0.2);
      const grad2 = ctx.createRadialGradient(glow2X, glow2Y, 0, glow2X, glow2Y, 300);
      grad2.addColorStop(0, `hsla(${160 + scroll * 30}, 70%, 45%, 0.03)`);
      grad2.addColorStop(1, 'transparent');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // Particles — floating stars and code symbols
      particlesRef.current.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.pulse += 0.02;

        // Parallax: offset by scroll
        const parallaxY = scroll * 30 * (p.size / 2);

        // Wrap around screen edges
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        const drawY = p.y - parallaxY;
        const pulseOpacity = p.opacity * (0.6 + 0.4 * Math.sin(p.pulse));

        if (p.isSymbol) {
          ctx.font = `${8 + p.size * 2}px monospace`;
          ctx.fillStyle = `rgba(100, 160, 240, ${pulseOpacity * 0.35})`;
          ctx.fillText(p.symbol, p.x, drawY);
        } else {
          ctx.fillStyle = `rgba(140, 180, 255, ${pulseOpacity})`;
          ctx.beginPath();
          ctx.arc(p.x, drawY, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Circuit trace lines — occasional animated data-flow paths
      circuitLinesRef.current.forEach(line => {
        line.timer++;
        if (line.timer > line.cooldown) {
          line.targetOpacity = 0.15;
          line.progress += line.speed;
          if (line.progress > 1) {
            line.progress = 0;
            line.targetOpacity = 0;
            line.timer = 0;
            line.cooldown = Math.random() * 800 + 300;
          }
        }
        line.opacity += (line.targetOpacity - line.opacity) * 0.05;

        if (line.opacity < 0.01) return;

        const totalSegments = line.segments.length;
        const activeSegIndex = Math.floor(line.progress * totalSegments);

        line.segments.forEach((seg, idx) => {
          let segOpacity = line.opacity * 0.5;
          if (idx === activeSegIndex) segOpacity = line.opacity;
          if (idx > activeSegIndex) segOpacity *= 0.2;

          ctx.strokeStyle = `rgba(59, 130, 246, ${segOpacity})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(seg.x1, seg.y1 - scroll * 20);
          ctx.lineTo(seg.x2, seg.y2 - scroll * 20);
          ctx.stroke();

          // Node dot at intersection
          if (idx === activeSegIndex) {
            const t = (line.progress * totalSegments) % 1;
            const dotX = seg.x1 + (seg.x2 - seg.x1) * t;
            const dotY = (seg.y1 + (seg.y2 - seg.y1) * t) - scroll * 20;
            ctx.fillStyle = `rgba(59, 130, 246, ${line.opacity * 0.8})`;
            ctx.beginPath();
            ctx.arc(dotX, dotY, 2, 0, Math.PI * 2);
            ctx.fill();
          }
        });
      });

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [initParticles, initCircuitLines]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
};

export default AnimatedBackground;
