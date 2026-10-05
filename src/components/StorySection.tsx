import React from 'react';
import EditableText from '@/components/shared/EditableText';

interface StorySectionProps {
  onLearnMore: () => void;
  isEditable?: boolean;
  sectionId?: string;
  sectionProps?: Record<string, any>;
  onSave?: (sectionId: string, fieldPath: string, value: string) => void;
}

export const StorySection: React.FC<StorySectionProps> = ({ onLearnMore, isEditable = false, sectionId = 'storySection-section', sectionProps, onSave = () => {} }) => {
  const save = (fieldPath: string) => (value: string) => onSave(sectionId, fieldPath, value);
  const descriptions = Array.isArray(sectionProps?.description) ? sectionProps.description : [
    'Naše pčelarstvo nije samo posao – to je obiteljska priča koja traje generacijama. Brinemo o 150 košnica koje se nalaze u netaknutoj prirodi oko Valpova. Vjerujemo u održivo pčelarenje, poštujemo prirodu i svaku kap meda proizvodimo s najvećom pažnjom.',
    'Naš trud prepoznat je i nacionalno – sav naš med pakiran je u nacionalnu staklenku s oznakom "Med hrvatskih pčelinjaka", jamčeći vam vrhunsku kvalitetu i podrijetlo.',
  ];
  return (
    <section className="w-full bg-[#F7F2EC] py-16 sm:py-20 lg:py-24 border-y border-border/40">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 flex flex-col items-start">
            <EditableText tag="h2" value={sectionProps?.title || 'OPG Bartolović – s ljubavlju iz Valpova'} isEditable={isEditable} onSave={save('props.title')} className="lg:text-[34px] text-foreground" />

            <div className="mt-6 space-y-4 text-neutral-700">
              {descriptions.map((description: string, idx: number) => (
                <EditableText key={idx} tag="p" value={description} isEditable={isEditable} onSave={save(`props.description.${idx}`)} className={idx === descriptions.length - 1 ? 'text-foreground' : ''} />
              ))}
            </div>

            <div className="mt-8">
              <button
                onClick={onLearnMore}
                className="border border-neutral-900 hover:bg-foreground text-foreground hover:text-white px-6 py-2.5 font-semibold text-sm transition-colors duration-200 cursor-pointer"
              >
                Više o nama
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center items-center">
            <div className="flex flex-row justify-center gap-3 lg:hidden w-full py-4">
              {[
                { src: '../img/Vector.png', alt: 'Pčelinjak' },
                { src: '../img/Vector-1.png', alt: 'Pčele na saću' },
                { src: '../img/Vector-2.png', alt: 'Saće s medom' },
              ].map((img) => (
                <div key={img.src} className="w-[100px] h-[112px] sm:w-[140px] sm:h-[156px] flex-shrink-0">
                  <div className="w-full h-full overflow-hidden clip-hexagon">
                    <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                  </div>
                </div>
              ))}
            </div>

            <div className="relative hidden lg:block w-full max-w-[480px] h-[480px] select-none mx-auto">
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-[240px] h-[265px] transition-transform duration-500 hover:scale-[1.03] z-10 filter drop-shadow-sm">
                <div className="w-full h-full overflow-hidden clip-hexagon">
                  <img src="../img/Vector.png" alt="Pčelinjak Valpovo OPG Bartolović" className="w-full h-full object-cover object-center" />
                </div>
              </div>
              <div className="absolute bottom-0 left-[-3%] w-[240px] h-[265px] transition-transform duration-500 hover:scale-[1.03] z-20 filter drop-shadow-sm">
                <div className="w-full h-full overflow-hidden clip-hexagon">
                  <img src="../img/Vector-1.png" alt="Pčele na saću" className="w-full h-full object-cover object-center" />
                </div>
              </div>
              <div className="absolute bottom-0 right-[-3%] w-[240px] h-[265px] transition-transform duration-500 hover:scale-[1.03] z-15 filter drop-shadow-sm">
                <div className="w-full h-full overflow-hidden clip-hexagon">
                  <img src="../img/Vector-2.png" alt="Svježe saće s medom" className="w-full h-full object-cover object-center" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
