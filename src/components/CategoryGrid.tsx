import React from 'react';
import EditableText from '@/components/shared/EditableText';

interface CategoryGridProps {
  onSelectCategory: (categoryName: string) => void;
  isEditable?: boolean;
  sectionId?: string;
  sectionProps?: Record<string, any>;
  onSave?: (sectionId: string, fieldPath: string, value: string) => void;
}

const fallbackCategories = [
  { id: 'bagrem', title: 'Med od bagrema', image: '../img/service-img.png', alt: 'Med od bagrema', className: 'h-[240px] sm:h-[280px] lg:h-[300px]' },
  { id: 'lipa', title: 'Med od lipe', image: '../img/services-img-1.png', alt: 'Med od lipe', className: 'h-[240px] sm:h-[280px] lg:h-[300px]' },
  { id: 'cvjetni', title: 'Cvijetni med', image: '../img/services-img-2.png', alt: 'Cvijetni med', className: 'h-[210px] sm:h-[240px] lg:h-[260px]' },
  { id: 'livadni', title: 'Livadni med', image: '../img/services-img-3.png', alt: 'Livadni med', className: 'h-[210px] sm:h-[240px] lg:h-[260px]' },
  { id: 'ostalo', title: 'Ostali proizvodi', image: '../img/services-img-4.png', alt: 'Ostali proizvodi', className: 'h-[210px] sm:h-[240px] lg:h-[260px]' },
];

export const CategoryGrid: React.FC<CategoryGridProps> = ({ onSelectCategory, isEditable = false, sectionId = 'categoriesGrid-section', sectionProps, onSave = () => {} }) => {
  const categories = (Array.isArray(sectionProps?.categories) ? sectionProps.categories : fallbackCategories).map((category: any, idx: number) => ({
    ...fallbackCategories[idx],
    ...category,
    image: fallbackCategories[idx]?.image,
    alt: fallbackCategories[idx]?.alt || category.title,
  }));
  const save = (fieldPath: string) => (value: string) => onSave(sectionId, fieldPath, value);

  return (
    <section className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-5 sm:gap-y-6">
        {categories.slice(0, 2).map((category: any, idx: number) => (
          <div key={category.id} onClick={() => !isEditable && onSelectCategory(category.id)} className={`group relative ${category.className} overflow-hidden rounded-xs cursor-pointer bg-neutral-100`}>
            <img src={category.image} alt={category.alt || category.title} referrerPolicy="no-referrer" className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105" />
            <div className="absolute bottom-6 left-6 sm:bottom-7 sm:left-7 z-10">
              <EditableText tag="h3" value={category.title} isEditable={isEditable} onSave={save(`props.categories.${idx}.title`)} className="lg:text-[24px] font-semibold tracking-[3px] text-white drop-shadow-md" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
        {categories.slice(2).map((category: any, idx: number) => {
          const categoryIndex = idx + 2;
          return (
            <div key={category.id} onClick={() => !isEditable && onSelectCategory(category.id)} className={`group relative ${category.className} overflow-hidden rounded-xs cursor-pointer bg-neutral-100`}>
              <img src={category.image} alt={category.alt || category.title} referrerPolicy="no-referrer" className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105" />
              <div className="absolute bottom-5 left-5 sm:bottom-6 sm:left-6 z-10">
                <EditableText tag="h3" value={category.title} isEditable={isEditable} onSave={save(`props.categories.${categoryIndex}.title`)} className="lg:text-[24px] font-semibold tracking-[3px] text-white drop-shadow-md" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
