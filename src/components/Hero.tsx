import React from 'react';
import EditableText from '@/components/shared/EditableText';

interface HeroProps {
  onExplore: () => void;
  isEditable?: boolean;
  sectionId?: string;
  sectionProps?: Record<string, any>;
  onSave?: (sectionId: string, fieldPath: string, value: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore, isEditable = false, sectionId = 'hero-section', sectionProps, onSave = () => {} }) => {
  const save = (fieldPath: string) => (value: string) => onSave(sectionId, fieldPath, value);
  const title = sectionProps?.title || 'Iz košnice do tvog doma -prirodno, s ljubavlju.';
  const subtitle = sectionProps?.subtitle || 'Bez aditiva, bez kompromisa – samo čista priroda, tradicija i ljubav prema pčelama.';
  const buttonText = sectionProps?.buttonText || 'Pogledaj ponudu';

  return (
    <section className="relative w-full h-[520px] sm:h-[580px] lg:h-[620px] overflow-hidden flex items-center justify-center">
      <img
        src="../img/hero-img.png"
        alt="Domaći med OPG Bartolović"
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center text-white flex flex-col items-center">
        <EditableText
          tag="h1"
          value={title}
          isEditable={isEditable}
          onSave={save('props.title')}
          className="text-[28px] sm:text-[38px] lg:text-[54px] leading-tight text-white drop-shadow-md max-w-3xl"
          style={{ textWrap: 'balance' }}
        >
          Iz košnice do tvog doma -prirodno, s ljubavlju.
        </EditableText>

        <EditableText
          tag="p"
          value={subtitle}
          isEditable={isEditable}
          onSave={save('props.subtitle')}
          className="mt-4 text-sm sm:text-base text-white/95 max-w-2xl drop-shadow-sm px-2 sm:px-0"
        />

        <div className="mt-8">
          <button
            onClick={onExplore}
            className="group relative inline-flex items-center justify-center px-8 py-3.5 border border-white hover:border-primary hover:bg-primary-hover text-white uppercase transition-all duration-300 shadow-lg active:scale-95 cursor-pointer font-semibold rounded-xs"
          >
            <EditableText tag="span" value={buttonText} isEditable={isEditable} onSave={save('props.buttonText')} />
          </button>
        </div>
      </div>
    </section>
  );
};
