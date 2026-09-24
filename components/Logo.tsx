import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark' | 'footer';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'light', className = '' }) => {
  const isDark = variant === 'dark' || variant === 'footer';
  const color = isDark ? '#CEAA74' : '#8C653C';
  const textColor = isDark ? 'text-[#CEAA74]' : 'text-[#8C653C]';

  return (
    <div className={`flex ${variant === 'footer' ? 'flex-col items-center gap-1.5' : 'items-center gap-2.5'} select-none cursor-pointer ${className}`}>
      {/* Handcrafted vector capsule bee emblem matching the official brandmark */}
      <svg
        width={variant === 'footer' ? "46" : "36"}
        height={variant === 'footer' ? "46" : "36"}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:scale-105"
      >
        {/* Outer pill/capsule boundary */}
        <rect
          x="20"
          y="6"
          width="60"
          height="88"
          rx="30"
          stroke={color}
          strokeWidth="3.2"
          fill="none"
        />

        {/* Bee Antennae */}
        <path
          d="M 47 25 C 44 20, 40 21, 38 23"
          stroke={color}
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M 53 25 C 56 20, 60 21, 62 23"
          stroke={color}
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        {/* Bee Head */}
        <circle cx="50" cy="28" r="4.5" stroke={color} strokeWidth="2.2" fill="none" />

        {/* Bee Wings Left & Right */}
        <path
          d="M 46 32 C 32 24, 28 38, 45 42"
          stroke={color}
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M 54 32 C 68 24, 72 38, 55 42"
          stroke={color}
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        {/* Lower petals / honeycomb comb leaves */}
        <path
          d="M 50 42 C 40 46, 32 60, 48 68 C 49 68.5, 50 69, 50 69"
          stroke={color}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 50 42 C 60 46, 68 60, 52 68 C 51 68.5, 50 69, 50 69"
          stroke={color}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        {/* Flower petal / honey dipper center stem */}
        <line
          x1="50"
          y1="40"
          x2="50"
          y2="76"
          stroke={color}
          strokeWidth="2.4"
          strokeLinecap="round"
        />

        {/* Honeycomb horizontal tier ribs */}
        <line x1="42" y1="52" x2="58" y2="52" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <line x1="40" y1="60" x2="60" y2="60" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
        
        {/* Honey drop at bottom */}
        <path
          d="M 50 72 C 46 76, 46 80, 50 82 C 54 80, 54 76, 50 72 Z"
          fill={color}
        />
      </svg>

      <span
        className={`    uppercase ${textColor}`}
      >
        BARTOLOVIĆ
      </span>
    </div>
  );
};
