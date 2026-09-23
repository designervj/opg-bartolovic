import React from 'react';
import { FEATURE_CARDS } from '../data/honeyData';

export const FeatureCards: React.FC = () => {
  const renderIcon = (type: string) => {
    switch (type) {
      case 'leaf':
        return (
          <svg className="w-5 h-5 text-[#6E4F32]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
            <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
          </svg>
        );
      case 'dots':
        return (
          <svg className="w-5 h-5 text-[#6E4F32]" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="7" r="3.2" />
            <circle cx="7" cy="16" r="3.2" />
            <circle cx="17" cy="16" r="3.2" />
          </svg>
        );
      case 'stamp':
        return (
          <div className="flex flex-col items-center justify-center text-center">
            <span className="text-[7.5px] font-bold tracking-tight text-[#6E4F32] uppercase leading-[9px]">
              Med<br />HR
            </span>
          </div>
        );
      case 'bee':
      default:
        return (
          <svg className="w-5 h-5 text-[#6E4F32]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m8 2 1.88 1.88" />
            <path d="M14.12 3.88 16 2" />
            <path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1" />
            <path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6" />
            <path d="M12 20v2" />
            <path d="M6 12H2" />
            <path d="M22 12h-4" />
            <path d="M18 17.5a4.5 4.5 0 0 0-4-2.5h-4a4.5 4.5 0 0 0-4 2.5" />
          </svg>
        );
    }
  };

  return (
    <section className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
        {FEATURE_CARDS.map((item) => (
          <div
            key={item.id}
            className="bg-[#F8F6F0] border border-neutral-200/50 rounded-2xl p-6 sm:p-7 flex flex-col items-start transition-all duration-300 hover:shadow-md hover:border-amber-200/80 group"
          >
            {/* Circular Icon Container */}
            <div className="w-11 h-11 rounded-full bg-[#E5DDD0] flex items-center justify-center mb-5 shrink-0 transition-transform group-hover:scale-105">
              {renderIcon(item.iconType)}
            </div>

            {/* Title */}
            <h3 className="font-sans-custom font-bold text-[15px] text-neutral-900 mb-2 leading-snug">
              {item.title}
            </h3>

            {/* Description */}
            <p className="font-sans-custom text-xs text-neutral-600 leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
