import React from 'react';

const Logo = ({ className = '', showText = true, scrolled = false }) => {
  // Adaptive color based on scroll position / theme
  const strokeColor = scrolled ? 'stroke-[#101014]' : 'stroke-white';
  const fillColor = scrolled ? 'fill-[#101014]' : 'fill-white';
  const textColor = scrolled ? 'text-[#101014]' : 'text-white';
  const subtextColor = scrolled ? 'text-[#3d3d47]' : 'text-white/60';
  const lineStroke = scrolled ? 'rgba(16, 16, 20, 0.15)' : 'rgba(255, 255, 255, 0.2)';

  return (
    <div className={`flex items-center gap-3.5 select-none ${className}`}>
      {/* Icon emblem */}
      <svg
        width="40"
        height="40"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-all duration-300"
      >
        {/* Lamp Shade Glow (Only when on dark/unscrolled header or styled) */}
        {!scrolled && (
          <path
            d="M 28 58 L 57 58 L 75 90 L 10 90 Z"
            fill="url(#lampGlow)"
            opacity="0.15"
          />
        )}
        <defs>
          <radialGradient id="lampGlow" cx="42.5" cy="50" r="40" fx="42.5" fy="50">
            <stop offset="0%" stopColor="#C9A96E" stopOpacity="1" />
            <stop offset="100%" stopColor="#C9A96E" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Outer Frame (Open bracket) */}
        {/* Left vertical: stroke width 5px */}
        <path
          d="M 32 55 V 95 H 95 V 35"
          stroke="currentColor"
          className={`${strokeColor} transition-all duration-300`}
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* T-Lamp on Top Left */}
        {/* Top bar */}
        <path
          d="M 32 30 H 57"
          stroke="currentColor"
          className={`${strokeColor} transition-all duration-300`}
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Cord */}
        <path
          d="M 44.5 30 V 44"
          stroke="currentColor"
          className={`${strokeColor} transition-all duration-300`}
          strokeWidth="3.5"
        />
        {/* Shade trapezoid */}
        <polygon
          points="44.5,44 36,54 53,54"
          className={`${fillColor} transition-all duration-300`}
        />
        {/* Bulb/Light source tiny line */}
        <line
          x1="39"
          y1="56"
          x2="50"
          y2="56"
          stroke="#C9A96E"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* E on the Right Side */}
        <path
          d="M 70 54 H 88"
          stroke="currentColor"
          className={`${strokeColor} transition-all duration-300`}
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M 70 70 H 85"
          stroke="currentColor"
          className={`${strokeColor} transition-all duration-300`}
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M 70 86 H 88"
          stroke="currentColor"
          className={`${strokeColor} transition-all duration-300`}
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M 70 54 V 86"
          stroke="currentColor"
          className={`${strokeColor} transition-all duration-300`}
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>

      {/* Text label */}
      {showText && (
        <div className="flex flex-col justify-center">
          <span className={`font-display text-[17px] font-bold tracking-[0.25em] leading-none ${textColor} transition-all duration-300`}>
            ESPACIO
          </span>
          <span className={`font-sans text-[7.5px] font-semibold uppercase tracking-[0.38em] leading-none mt-1.5 ${subtextColor} transition-all duration-300`}>
            Interiors & Modular
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
