import React, { useEffect, useRef, useState } from 'react';
import { useScrollProgress } from '../hooks/useScrollProgress';

const CodingAvatar = () => {
  const scrollProgress = useScrollProgress();
  const [blink, setBlink] = useState(false);
  const [typingState, setTypingState] = useState(0);
  const prefersReduced = useRef(false);

  useEffect(() => {
    prefersReduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Natural blinking cycle
  useEffect(() => {
    if (prefersReduced.current) return;
    const interval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 150);
      // Occasional double blink
      if (Math.random() > 0.7) {
        setTimeout(() => setBlink(true), 300);
        setTimeout(() => setBlink(false), 450);
      }
    }, 4000 + Math.random() * 3000);
    return () => clearInterval(interval);
  }, []);

  // High-frequency typing animation cycle
  useEffect(() => {
    if (prefersReduced.current) return;
    const interval = setInterval(() => {
      setTypingState(prev => (prev + 1) % 4);
    }, 120);
    return () => clearInterval(interval);
  }, []);

  // Scroll-reactive physics
  const breatheScale = prefersReduced.current ? 1 : 1 + Math.sin(Date.now() / 1500) * 0.01;
  const headPanX = (scrollProgress - 0.5) * -15; // Looks slightly left/right when scrolling
  const headPanY = (scrollProgress - 0.5) * 5;
  const codeScroll = (scrollProgress * 200) % 80;

  return (
    <div 
      className="relative select-none pointer-events-none" 
      style={{ width: '400px', height: '320px', maxWidth: '100%' }}
      aria-hidden="true"
    >
      <style>
        {`
          .steam { animation: rise 3s infinite linear; transform-origin: center bottom; }
          .steam-2 { animation: rise 4s infinite linear 1s; }
          @keyframes rise {
            0% { transform: translateY(0) scale(1); opacity: 0.6; }
            50% { opacity: 0.3; }
            100% { transform: translateY(-30px) scale(1.5); opacity: 0; }
          }
          .glass-reflect { animation: shine 6s infinite; }
          @keyframes shine {
            0%, 80% { transform: translateX(-100%) skewX(-20deg); }
            100% { transform: translateX(200%) skewX(-20deg); }
          }
        `}
      </style>

      <svg
        viewBox="0 0 600 450"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-2xl"
      >
        <defs>
          <radialGradient id="ambientGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </radialGradient>
          
          <radialGradient id="screenGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="deskGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          <linearGradient id="laptopGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>

          <linearGradient id="hoodieGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="50%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>

          <radialGradient id="skinGrad" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#e2b493" />
            <stop offset="70%" stopColor="#c58c65" />
            <stop offset="100%" stopColor="#966342" />
          </radialGradient>

          <linearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#292524" />
            <stop offset="100%" stopColor="#0c0a09" />
          </linearGradient>

          <clipPath id="monitorClip">
            <polygon points="5,25 145,-1 145,214 5,243" />
          </clipPath>
          
          <clipPath id="glassClip1">
            <rect x="-17" y="-12" width="34" height="24" rx="6" />
          </clipPath>
          <clipPath id="glassClip2">
            <rect x="25" y="-12" width="34" height="24" rx="6" />
          </clipPath>

          <filter id="blurLg" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="15" />
          </filter>
          <filter id="blurSm" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        {/* Ambient Back Glow */}
        <ellipse cx="300" cy="200" rx="250" ry="200" fill="url(#ambientGlow)" />

        {/* --- SECONDARY MONITOR (Background/Right) --- */}
        <g transform="translate(370, 110)">
          {/* Monitor Glow */}
          <ellipse cx="70" cy="120" rx="120" ry="150" fill="url(#screenGlow)" />
          
          {/* Stand */}
          <rect x="60" y="220" width="20" height="70" fill="#1e293b" />
          <path d="M 40 285 L 100 280 L 110 295 L 30 300 Z" fill="#0f172a" stroke="#334155" strokeWidth="1" />
          
          {/* Bezel */}
          <polygon points="0,20 150,-4 150,218 0,248" fill="#020617" stroke="#334155" strokeWidth="2.5" strokeLinejoin="round" />
          
          {/* Screen */}
          <polygon points="5,25 145,-1 145,214 5,243" fill="#09090b" />
          
          {/* Animated Code Content (Clipped to screen) */}
          <g clipPath="url(#monitorClip)">
            <g transform={`translate(0, ${-codeScroll})`}>
              {[0, 1, 2].map((block) => (
                <g key={block} transform={`translate(0, ${block * 90})`}>
                  {/* Mock syntax highlighting paths */}
                  <path d="M 15 45 L 45 38" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
                  <path d="M 55 36 L 110 25" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
                  <path d="M 15 60 L 60 51" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
                  <path d="M 70 49 L 130 37" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
                  <path d="M 25 75 L 85 63" stroke="#a855f7" strokeWidth="3" strokeLinecap="round" />
                  <path d="M 25 90 L 50 85" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
                  <path d="M 60 83 L 115 72" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
                </g>
              ))}
            </g>
            {/* Screen Glare Overlay */}
            <polygon points="5,25 70,10 50,233 5,243" fill="white" opacity="0.03" />
          </g>
        </g>

        {/* --- DESK SURFACE --- */}
        <path d="M -50 370 L 650 370 L 650 450 L -50 450 Z" fill="url(#deskGrad)" />
        {/* Desk Edge Highlight */}
        <line x1="-50" y1="370" x2="650" y2="370" stroke="#334155" strokeWidth="2" opacity="0.6" />

        {/* --- AVATAR BODY (Breathing Animation) --- */}
        <g 
          style={{ 
            transform: `scale(1, ${breatheScale})`, 
            transformOrigin: '250px 380px',
            transition: 'transform 0.1s ease-out'
          }}
        >
          {/* Shoulders / Hoodie */}
          <path d="M 140 380 C 140 280, 200 240, 250 240 C 300 240, 360 280, 360 380 Z" fill="url(#hoodieGrad)" />
          {/* Left Arm */}
          <path d="M 150 320 C 130 380, 150 430, 210 440" fill="none" stroke="url(#hoodieGrad)" strokeWidth="38" strokeLinecap="round" />
          {/* Right Arm */}
          <path d="M 350 320 C 370 380, 350 430, 290 440" fill="none" stroke="url(#hoodieGrad)" strokeWidth="38" strokeLinecap="round" />
          
          {/* Hoodie Details */}
          <path d="M 250 250 L 250 380" stroke="#0f172a" strokeWidth="3" opacity="0.6" />
          <path d="M 235 255 Q 230 280, 235 310" fill="none" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
          <path d="M 265 255 Q 270 280, 265 310" fill="none" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
          <path d="M 210 245 C 230 260, 270 260, 290 245" fill="none" stroke="#0f172a" strokeWidth="6" opacity="0.4" />
        </g>

        {/* --- AVATAR HEAD (Tracking Animation) --- */}
        <g 
          style={{ 
            transform: `translate(${headPanX}px, ${headPanY}px)`, 
            transition: 'transform 0.3s ease-out' 
          }}
        >
          {/* Neck */}
          <path d="M 235 210 L 235 255 L 265 255 L 265 210 Z" fill="#966342" />
          <path d="M 235 235 C 250 250, 265 235, 265 235 L 265 255 L 235 255 Z" fill="#7a4c30" /> {/* Neck shadow */}

          {/* Ears */}
          <path d="M 205 165 C 190 165, 195 195, 208 190 Z" fill="#c58c65" />
          <path d="M 295 165 C 310 165, 305 195, 292 190 Z" fill="#c58c65" />

          {/* Main Face Shape (Proportional Oval) */}
          <path d="M 210 145 C 210 90, 290 90, 290 145 C 290 195, 275 225, 250 235 C 225 225, 210 195, 210 145 Z" fill="url(#skinGrad)" />

          {/* Modern Hair */}
          {/* Back/Sides */}
          <path d="M 206 140 C 206 90, 294 90, 294 140 C 294 165, 290 180, 290 180 L 285 160 C 285 110, 215 110, 215 160 L 210 180 C 210 180, 206 165, 206 140 Z" fill="url(#hairGrad)" />
          {/* Top Volume */}
          <path d="M 195 130 C 195 70, 280 60, 305 110 C 305 110, 285 85, 250 85 C 215 85, 205 110, 195 130 Z" fill="#1c1917" />
          <path d="M 205 125 C 220 85, 270 85, 295 125 C 270 100, 230 100, 205 125 Z" fill="#292524" />

          {/* Eyebrows */}
          <path d="M 218 152 C 228 148, 238 150, 243 153" fill="none" stroke="#292524" strokeWidth="4" strokeLinecap="round" />
          <path d="M 257 153 C 262 150, 272 148, 282 152" fill="none" stroke="#292524" strokeWidth="4" strokeLinecap="round" />

          {/* Eyes & Blinking */}
          {blink ? (
            <g>
              <path d="M 220 165 Q 230 168 240 165" fill="none" stroke="#966342" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 260 165 Q 270 168 280 165" fill="none" stroke="#966342" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          ) : (
            <g>
              <ellipse cx="230" cy="164" rx="10" ry="5.5" fill="white" />
              <ellipse cx="270" cy="164" rx="10" ry="5.5" fill="white" />
              <circle cx="230" cy="164" r="4.5" fill="#453128" />
              <circle cx="270" cy="164" r="4.5" fill="#453128" />
              <circle cx="230" cy="164" r="2.5" fill="#000" />
              <circle cx="270" cy="164" r="2.5" fill="#000" />
              {/* Eye Catchlights */}
              <circle cx="231.5" cy="162.5" r="1.5" fill="white" opacity="0.9" />
              <circle cx="271.5" cy="162.5" r="1.5" fill="white" opacity="0.9" />
            </g>
          )}

          {/* Nose */}
          <path d="M 250 162 L 250 192 C 245 195, 240 192, 240 187" fill="none" stroke="#a67352" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          
          {/* Mouth (Subtle focus) */}
          <path d="M 238 208 C 250 211, 262 208, 262 208" fill="none" stroke="#966342" strokeWidth="2" strokeLinecap="round" />

          {/* Glasses (Premium wireframe) */}
          <g transform="translate(250, 164)">
            {/* Frames */}
            <rect x="-34" y="-12" width="34" height="24" rx="6" fill="none" stroke="#94a3b8" strokeWidth="2.5" />
            <rect x="8" y="-12" width="34" height="24" rx="6" fill="none" stroke="#94a3b8" strokeWidth="2.5" />
            <path d="M 0 -4 Q 4 -6 8 -4" fill="none" stroke="#94a3b8" strokeWidth="2.5" />
            <path d="M -34 -6 L -42 -8" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 42 -6 L 50 -8" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
            
            {/* Dynamic Reflections */}
            <g clipPath="url(#glassClip1)">
              <rect x="-50" y="-20" width="80" height="50" fill="white" opacity="0.15" className="glass-reflect" />
            </g>
            <g clipPath="url(#glassClip2)">
              <rect x="-10" y="-20" width="80" height="50" fill="white" opacity="0.15" className="glass-reflect" />
            </g>
          </g>

          {/* Subtle monitor glow cast on face */}
          <polygon points="210,140 290,140 280,230 220,230" fill="#3b82f6" opacity="0.05" filter="url(#blurLg)" />
        </g>

        {/* --- MAIN LAPTOP (Foreground) --- */}
        {/* Base shadow */}
        <polygon points="175,450 185,445 315,445 325,450" fill="#000" opacity="0.5" filter="url(#blurSm)" />
        {/* Laptop Back Cover */}
        <path d="M 180 450 L 195 345 L 305 345 L 320 450 Z" fill="url(#laptopGrad)" stroke="#64748b" strokeWidth="1" />
        {/* Glowing Logo */}
        <g transform="translate(250, 395)">
          <circle cx="0" cy="0" r="14" fill="#0f172a" />
          <path d="M -5 -6 L 0 3 L 5 -6 M 0 3 L 0 10" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="0" cy="0" r="20" fill="#3b82f6" opacity="0.2" filter="url(#blurLg)" />
        </g>

        {/* --- TYPING HANDS (Animated) --- */}
        {/* Right Hand */}
        <g 
          style={{ 
            transform: `translateY(${typingState === 0 || typingState === 2 ? 3 : 0}px)`, 
            transition: 'transform 0.1s' 
          }}
        >
          <path d="M 300 450 L 290 435 C 290 425, 310 420, 315 435 L 325 450 Z" fill="#c58c65" />
          <path d="M 292 438 L 296 448" stroke="#a67352" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 300 435 L 304 448" stroke="#a67352" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 308 436 L 312 448" stroke="#a67352" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* Left Hand */}
        <g 
          style={{ 
            transform: `translateY(${typingState === 1 || typingState === 3 ? 3 : 0}px)`, 
            transition: 'transform 0.1s' 
          }}
        >
          <path d="M 200 450 L 210 435 C 210 425, 190 420, 185 435 L 175 450 Z" fill="#c58c65" />
          <path d="M 208 438 L 204 448" stroke="#a67352" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 200 435 L 196 448" stroke="#a67352" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 192 436 L 188 448" stroke="#a67352" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* --- COFFEE MUG --- */}
        <g transform="translate(100, 350)">
          {/* Coaster */}
          <ellipse cx="40" cy="85" rx="35" ry="10" fill="#020617" />
          
          {/* Mug Body */}
          <path d="M 20 40 L 25 80 C 25 88, 55 88, 55 80 L 60 40 Z" fill="#1e293b" stroke="#334155" strokeWidth="1" />
          <ellipse cx="40" cy="40" rx="20" ry="7" fill="#334155" />
          <ellipse cx="40" cy="40" rx="16" ry="5" fill="#09090b" />
          
          {/* Handle */}
          <path d="M 22 50 C 5 50, 5 70, 24 75" fill="none" stroke="#1e293b" strokeWidth="6" strokeLinecap="round" />
          
          {/* Steam */}
          <g filter="url(#blurSm)">
            <path d="M 35 30 Q 30 15, 40 0 T 35 -25" fill="none" stroke="#cbd5e1" strokeWidth="3" className="steam" />
            <path d="M 45 30 Q 50 15, 40 0 T 45 -25" fill="none" stroke="#cbd5e1" strokeWidth="2" className="steam steam-2" />
          </g>
        </g>

      </svg>
    </div>
  );
};

export default CodingAvatar;
