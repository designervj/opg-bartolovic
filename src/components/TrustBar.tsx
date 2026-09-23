import React from 'react';
import { Truck, Phone, ShieldCheck, CreditCard } from 'lucide-react';
import { TRUST_ITEMS } from '../data/honeyData';

export const TrustBar: React.FC = () => {
  const getIcon = (iconName: string) => {
    const props = { className: "w-5 h-5 text-[#855D37]" };
    switch (iconName) {
      case 'truck':
        return <Truck {...props} />;
      case 'phone':
        return <Phone {...props} />;
      case 'shield':
        return <ShieldCheck {...props} />;
      case 'card':
      default:
        return <CreditCard {...props} />;
    }
  };

  return (
    <section className="bg-white py-14 sm:py-16">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 text-center">
          {TRUST_ITEMS.map((item) => (
            <div key={item.id} className="flex flex-col items-center">
              {/* Soft circular icon pill */}
              <div className="w-12 h-12 rounded-full bg-[#F6EFE7] flex items-center justify-center mb-4 transition-transform hover:scale-105">
                {getIcon(item.icon)}
              </div>

              {/* Title */}
              <h4 className="font-sans-custom font-bold text-[14.5px] text-neutral-900 leading-snug">
                {item.title}
              </h4>

              {/* Subtitle */}
              <p className="mt-1 font-sans-custom text-xs text-neutral-500 leading-relaxed">
                {item.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
