import React from 'react';
import { Truck, Phone, ShieldCheck, CreditCard } from 'lucide-react';
import { TRUST_ITEMS } from '../data/honeyData';
import EditableText from '@/components/shared/EditableText';

interface TrustBarProps {
  isEditable?: boolean;
  sectionId?: string;
  sectionProps?: any[];
  onSave?: (sectionId: string, fieldPath: string, value: string) => void;
}

export const TrustBar: React.FC<TrustBarProps> = ({ isEditable = false, sectionId = 'trustBar-section', sectionProps, onSave = () => {} }) => {
  const items = Array.isArray(sectionProps) ? sectionProps : Array.isArray((sectionProps as any)?.items) ? (sectionProps as any).items : TRUST_ITEMS;
  const fieldPrefix = Array.isArray((sectionProps as any)?.items) ? 'props.items' : 'props';
  const save = (fieldPath: string) => (value: string) => onSave(sectionId, fieldPath, value);


  return (
    <section className="bg-background py-14 sm:py-16">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 text-center">
          {items.map((item, idx) => (
            <div key={item.id} className="flex flex-col items-center">
              {/* Soft circular icon pill */}
              <div className=" rounded-full  flex items-center justify-center mb-4 transition-transform hover:scale-105">
                <img src={item.icon} alt={item.title} className="w-12 h-12 object-contain" />
              </div>

              {/* Title */}
              <EditableText tag="h6" value={item.title} isEditable={isEditable} onSave={save(`${fieldPrefix}.${idx}.title`)} className="text-md font-bold text-foreground" />

              {/* Subtitle */}
              <EditableText tag="p" value={item.subtitle} isEditable={isEditable} onSave={save(`${fieldPrefix}.${idx}.subtitle`)} className="mt-1 text-[14px] text-foreground/60" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
