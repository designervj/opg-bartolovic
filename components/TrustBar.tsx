import React from 'react';
import { Truck, Phone, ShieldCheck, CreditCard } from 'lucide-react';
import { TRUST_ITEMS } from '../data/honeyData';

export const TrustBar: React.FC = () => {


  return (
    <section className="bg-background py-14 sm:py-16">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 text-center">
          {TRUST_ITEMS.map((item) => (
            <div key={item.id} className="flex flex-col items-center">
              {/* Soft circular icon pill */}
              <div className=" rounded-full  flex items-center justify-center mb-4 transition-transform hover:scale-105">
                <img src={item.icon} alt={item.title} className="w-12 h-12 object-contain" />
              </div>

              {/* Title */}
              <h5 className="text-md font-bold text-foreground">
                {item.title}
              </h5>

              {/* Subtitle */}
              <p className="mt-1 text-[14px] text-foreground/60">
                {item.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
