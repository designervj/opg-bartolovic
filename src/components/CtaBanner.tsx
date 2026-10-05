import React from 'react';
import EditableText from '@/components/shared/EditableText';

interface CtaBannerProps {
  onOrderNow: () => void;
  isEditable?: boolean;
  sectionId?: string;
  sectionProps?: Record<string, any>;
  onSave?: (sectionId: string, fieldPath: string, value: string) => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onOrderNow, isEditable = false, sectionId = 'ctaBanner-section', sectionProps, onSave = () => {} }) => {
  const save = (fieldPath: string) => (value: string) => onSave(sectionId, fieldPath, value);
  return (
    <section className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
      <div className="relative w-full h-[220px] sm:h-[290px] md:h-[329px] overflow-hidden rounded-xs flex items-center justify-center text-center shadow-lg">
        
        {/* Background Image */}
        <img
          src="../img/cta-img.png"
          alt="Prirodni domaći med Slavonija"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center "
        />

        {/* Ambient Dark Overlay */}
        {/* <div className="absolute inset-0 bg-foreground/40" /> */}

        {/* Banner Content */}
        <div className="relative z-10 max-w-2xl mx-auto px-4 flex flex-col items-center">
          
          {/* Main Monospace Headline */}
          <EditableText tag="h2" value={sectionProps?.title || 'Spremni za žlicu prirode?'} isEditable={isEditable} onSave={save('props.title')} className="text-[20px] sm:text-[26px] md:text-[34px] leading-tight text-white drop-shadow-md" />

          {/* Subheading */}
          <EditableText tag="p" value={sectionProps?.subtitle || 'Prirodno. Kvalitetno. Izravno s našeg pčelinjaka.'} isEditable={isEditable} onSave={save('props.subtitle')} className="mt-2 font-semibold text-white drop-shadow-sm" />

          {/* Call to action button */}
          <div className="mt-4 sm:mt-6">
            <button
              onClick={onOrderNow}
              className="border border-white/90 hover:border-white bg-foreground/30 hover:bg-background text-white hover:text-neutral-950  text-xs sm:text-sm px-5 sm:px-7 py-2 sm:py-2.5 transition-all duration-300 cursor-pointer shadow-md backdrop-blur-xs"
            >
              <EditableText tag="span" value={sectionProps?.buttonText || 'Naruči sada'} isEditable={isEditable} onSave={save('props.buttonText')} />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
