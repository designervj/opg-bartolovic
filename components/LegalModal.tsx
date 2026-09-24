import React from 'react';
import { X, Shield } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const isPrivacy = type === 'privacy';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-foreground/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-background w-full max-w-xl rounded-sm shadow-2xl overflow-hidden z-10 my-8">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-border flex items-center justify-between bg-background">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <h2 className="text-foreground">
              {isPrivacy ? 'Politika privatnosti' : 'Uvjeti korištenja'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-foreground/40 hover:text-foreground rounded-full hover:bg-neutral-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 md:p-8 space-y-4 text-foreground/70 max-h-[65vh] overflow-y-auto">
          {isPrivacy ? (
            <>
              <p>
                <strong>1. Voditelj obrade podataka:</strong> OPG Bartolović, Valpovo, Hrvatska. Poštujemo vašu privatnost i obrađujemo osobne podatke u skladu s Općom uredbom o zaštiti podataka (GDPR).
              </p>
              <p>
                <strong>2. Svrha prikupljanja:</strong> Vaše ime, adresa, broj telefona i e-mail adresa prikupljaju se isključivo u svrhu obrade, pakiranja i dostave naručenih proizvoda putem ovlaštene kurirske službe.
              </p>
              <p>
                <strong>3. Sigurnost podataka:</strong> Vaši podaci pohranjuju se na sigurnim poslužiteljima i nikada se ne prosljeđuju neovlaštenim trećim stranama niti koriste za neželjeni marketing.
              </p>
              <p>
                <strong>4. Vaša prava:</strong> Imate pravo u svakom trenutku zatražiti uvid, ispravak ili brisanje svojih osobnih podataka slanjem upita na <em>info@opg-bartolovic.hr</em>.
              </p>
            </>
          ) : (
            <>
              <p>
                <strong>1. Opće odredbe:</strong> Ovi uvjeti uređuju narudžbu i kupnju pčelarskih proizvoda OPG-a Bartolović putem ove internetske stranice.
              </p>
              <p>
                <strong>2. Proizvodi i cijene:</strong> Sve istaknute cijene izražene su u eurima (€) i uključuju sve pripadajuće poreze. Zadržavamo pravo promjene cijena bez prethodne najave.
              </p>
              <p>
                <strong>3. Dostava:</strong> Dostavu vršimo na području cijele Republike Hrvatske u roku od 2 do 4 radna dana. Za narudžbe iznad 30 € dostava je besplatna.
              </p>
              <p>
                <strong>4. Reklamacije i povrati:</strong> Sukladno Zakonu o zaštiti potrošača, kupac ima pravo na jednostrani raskid ugovora i povrat neoštećene i neotvorene robe unutar 14 dana od primitka paketa.
              </p>
            </>
          )}
        </div>

        <div className="p-4 border-t border-border bg-background flex justify-end">
          <button
            onClick={onClose}
            className="bg-foreground hover:bg-neutral-800 text-white uppercase px-5 py-2 rounded-xs transition-colors"
          >
            U redu
          </button>
        </div>

      </div>
    </div>
  );
};
