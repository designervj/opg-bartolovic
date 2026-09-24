import React from 'react';
import { FEATURE_CARDS } from '../data/honeyData';

export const FeatureCards: React.FC = () => {


  return (
    <section className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
        {FEATURE_CARDS.map((item) => (
          <div
            key={item.id}
            className="bg-secondary border border-border/50 rounded-2xl p-6 sm:p-7 flex flex-col items-start transition-all duration-300 hover:shadow-md hover:border-primary group"
          >
            {/* Circular Icon Container */}
            <div className="flex items-center justify-center mb-5 shrink-0 transition-transform group-hover:scale-105">
              <img src={item.iconType} alt={item.title} className="w-12 h-12 object-contain" />
            </div>

            {/* Title */}
            <h3 className="text-md  font-bold text-foreground mb-2">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-primary-foreground font-sm">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
