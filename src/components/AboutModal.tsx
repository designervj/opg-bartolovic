import React from 'react';
import { X, Award, Trees, HeartHandshake } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-neutral-950/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white w-full max-w-2xl rounded-sm shadow-2xl overflow-hidden z-10 my-8">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-neutral-200 flex items-center justify-between bg-[#F8F6F0]">
          <div>
            <span className="font-mono-custom text-xs uppercase tracking-widest text-amber-800">
              Obiteljsko poljoprivredno gospodarstvo
            </span>
            <h2 className="font-mono-custom font-bold text-xl text-neutral-900 tracking-tight mt-0.5">
              O nama – OPG Bartolović
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-900 rounded-full hover:bg-neutral-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 space-y-6 font-sans-custom text-neutral-700 text-sm leading-relaxed max-h-[75vh] overflow-y-auto">
          
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-1">
              <Trees className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-neutral-900 text-base mb-1">
                Netaknuta priroda slavonske ravnice
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Smješteni u okolici povijesnog Valpova, okruženi stoljetnim hrastovim i lipovim šumama uz rijeku Karašicu i Dravu, naši pčelinjaci broje preko 150 marljivih pčelinjih zajednica. Lokacije biramo isključivo tamo gdje nema intenzivne agrokemije, garantirajući najvišu čistoću nektara.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-1">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-neutral-900 text-base mb-1">
                Nacionalna staklenka & Dokazana izvrsnost
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Ponosni smo nositelji certifikata <strong>"Med hrvatskih pčelinjaka"</strong>. Sav naš med pakiran je u jedinstvenu nacionalnu staklenku s evidencijskim markicama Hrvatskog pčelarskog saveza, što kupcima omogućuje provjeru podrijetla svake pojedine tegle.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-1">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-neutral-900 text-base mb-1">
                Ručno vrcano s ljubavlju
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Kod nas nema zagrijavanja meda radi lakšeg punjenja, niti dodavanja sirupa i šećera. Med nakon vrcanja ostaje u svom izvornom obliku sa svim prirodnim enzimima, peludnim zrncima i antioksidansima.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-200 flex justify-end">
            <button
              onClick={onClose}
              className="bg-neutral-900 hover:bg-neutral-800 text-white font-mono-custom text-xs uppercase tracking-wider px-6 py-2.5 rounded-xs transition-colors"
            >
              Zatvori
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
