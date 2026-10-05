import React from 'react';
import { FEATURE_CARDS } from '../data/honeyData';
import EditableText from '@/components/shared/EditableText';

interface FeatureCardsProps {
  isEditable?: boolean;
  sectionId?: string;
  sectionProps?: any[];
  onSave?: (sectionId: string, fieldPath: string, value: string) => void;
}

export const FeatureCards: React.FC<FeatureCardsProps> = ({ isEditable = false, sectionId = 'featureCards-section', sectionProps, onSave = () => {} }) => {
  const cards = Array.isArray(sectionProps) ? sectionProps : Array.isArray((sectionProps as any)?.items) ? (sectionProps as any).items : FEATURE_CARDS;
  const fieldPrefix = Array.isArray((sectionProps as any)?.items) ? 'props.items' : 'props';
  const save = (fieldPath: string) => (value: string) => onSave(sectionId, fieldPath, value);


  return (
    <section className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
        {cards.map((item, idx) => (
          <div
            key={item.id}
            className="bg-secondary border border-border/50 rounded-2xl p-6 sm:p-4 flex flex-col items-start transition-all duration-300 hover:shadow-md hover:border-primary group"
          >
            {/* Circular Icon Container */}
            <div className="flex items-center justify-center mb-5 shrink-0 transition-transform group-hover:scale-105">
              <img src={item.iconType} alt={item.title} className="w-12 h-12 object-contain" />
            </div>

            {/* Title */}
            <EditableText tag="h6" value={item.title} isEditable={isEditable} onSave={save(`${fieldPrefix}.${idx}.title`)} className="text-[16px] font-bold text-foreground mb-2" />

            {/* Description */}
            <EditableText tag="p" value={item.description} isEditable={isEditable} onSave={save(`${fieldPrefix}.${idx}.description`)} className="text-primary-foreground font-sm text-sm" />
          </div>
        ))}
      </div>
    </section>
  );
};
