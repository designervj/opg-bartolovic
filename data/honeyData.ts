export interface Product {
  id: string;
  category: string;
  title: string;
  weight: string;
  price: number;
  originalPrice?: number;
  isSale?: boolean;
  rating: number;
  reviewCount: number;
  image: string;
  description: string;
  inStock: boolean;
  filterCategory: string; // for category filter matching
}

export interface CategoryCard {
  id: string;
  title: string;
  image: string;
}

export const ALL_PRODUCTS: Product[] = [
  {
    id: 'med-sa-sacem-450',
    category: 'Med u saću',
    filterCategory: 'Med u saću',
    title: 'Med sa saćem, 450g',
    weight: '450g',
    price: 16.49,
    rating: 5,
    reviewCount: 28,
    image: '/Product/pro-img.png',
    description: 'Vrhunski prirodni med s pravim komadom pčelinjeg saća. Žvakanje saća pruža sve prirodne blagodati voska i propolisa izravno iz košnice.',
    inStock: true,
  },
  {
    id: 'bagremov-med-900',
    category: 'Med od bagrema',
    filterCategory: 'Med od bagrema',
    title: 'Bagremov med, 900g',
    weight: '900g',
    price: 18.29,
    rating: 5,
    reviewCount: 65,
    image: '/Product/product-image-2.png',
    description: 'Bistri, svijetli med izrazito nježnog i ugodnog okusa koji vole djeca i odrasli. Sporo kristalizira i idealan je svakodnevni zaslađivač.',
    inStock: true,
  },
  {
    id: 'bagremov-med-450',
    category: 'Med od bagrema',
    filterCategory: 'Med od bagrema',
    title: 'Bagremov med, 450g',
    weight: '450g',
    price: 18.29,
    rating: 5,
    reviewCount: 34,
    image: '/Product/product-image-3.png',
    description: 'Manje pakiranje bagremovog meda nježnog okusa, idealno za svakodnevno zaslađivanje čaja, doručka i slastica.',
    inStock: true,
  },
  {
    id: 'cvjetni-med-900',
    category: 'Cvijetni med',
    filterCategory: 'Cvijetni med',
    title: 'Cvijetni med, 900g',
    weight: '900g',
    price: 15.79,
    rating: 5,
    reviewCount: 41,
    image: '/Product/product-image-4.png',
    description: 'Blagi cvjetni med bogat prirodnim aromama livada i voćnjaka, prikladan za svakodnevnu upotrebu.',
    inStock: true,
  },
  {
    id: 'cvjetni-med-450',
    category: 'Cvijetni med',
    filterCategory: 'Cvijetni med',
    title: 'Cvijetni med, 450g',
    weight: '450g',
    price: 16.49,
    rating: 5,
    reviewCount: 19,
    image: '/Product/product-image-5.png',
    description: 'Nježni cvjetni med u praktičnoj staklenci od 450 grama. Karakterističan po blagom i zaokruženom mirisu.',
    inStock: true,
  },
  {
    id: 'med-s-konopljom-250',
    category: 'Med s uljem konoplje',
    filterCategory: 'Med s konopljom',
    title: 'Med s konopljom, 250g',
    weight: '250g',
    price: 12.29,
    originalPrice: 16.49,
    isSale: true,
    rating: 5,
    reviewCount: 39,
    image: '/Product/image.png',
    description: 'Kremasti domaći med pomno sljubljen s hladno prešanim uljem domaće konoplje bogatim esencijalnim masnim kiselinama.',
    inStock: true,
  },
  {
    id: 'livadni-med-900',
    category: 'Livadni med',
    filterCategory: 'Livadni med',
    title: 'Livadni med, 900g',
    weight: '900g',
    price: 18.29,
    rating: 5,
    reviewCount: 52,
    image: '/Product/product-image-7.png',
    description: 'Prirodni livadni med sakupljen na netaknutim pašnjacima uz rijeku Dravu i Karašicu. Punog i bogatog okusa.',
    inStock: true,
  },
  {
    id: 'livadni-med-450',
    category: 'Livadni med',
    filterCategory: 'Livadni med',
    title: 'Livadni med, 450g',
    weight: '450g',
    price: 12.29,
    originalPrice: 16.49,
    isSale: true,
    rating: 5,
    reviewCount: 22,
    image: '/Product/product-img-10.png',
    description: 'Livadni med iz sezone cvatnje u praktičnoj teglici od 450g po posebnoj akcijskoj cijeni.',
    inStock: true,
  },
  {
    id: 'lipov-med-450',
    category: 'Med od lipe',
    filterCategory: 'Med od lipe',
    title: 'Lipov med, 450g',
    weight: '450g',
    price: 18.29,
    rating: 5,
    reviewCount: 31,
    image: '/Product/product-image-9.png',
    description: 'Prepoznatljiv miris i aroma lipovog cvijeta. Pomaže kod prehlada i opuštanja organizma.',
    inStock: true,
  },
  {
    id: 'lipov-med-900',
    category: 'Med od lipe',
    filterCategory: 'Med od lipe',
    title: 'Lipov med, 900g',
    weight: '900g',
    price: 18.29,
    rating: 5,
    reviewCount: 42,
    image: '/Product/product-image-8.png',
    description: 'Bogat, intenzivan i prepoznatljivo aromatičan lipov med sakupljen u bujnim slavonskim šumama.',
    inStock: true,
  },
  {
    id: 'cvjetni-med-450-second',
    category: 'Cvijetni med',
    filterCategory: 'Cvijetni med',
    title: 'Cvijetni med, 450g',
    weight: '450g',
    price: 16.49,
    rating: 5,
    reviewCount: 15,
    image: '/Product/product-image-11.png',
    description: 'Aromatični cvjetni med iz ljetnog vrcanja.',
    inStock: true,
  },
  {
    id: 'imunomed-250',
    category: 'Imunomed',
    filterCategory: 'Imunomed',
    title: 'Imunomed, 250g',
    weight: '250g',
    price: 12.29,
    originalPrice: 16.49,
    isSale: true,
    rating: 5,
    reviewCount: 68,
    image: '/Product/product-image-13.png',
    description: 'Snažna prirodna sinergija čistog cvjetnog meda, matične mliječi, propolisa i peludi za snažan imunitet.',
    inStock: true,
  },
];

// For home page bestsellers (from previous Frame 7)
export const PRODUCTS = ALL_PRODUCTS.slice(0, 4);

export const CATEGORIES_FILTER_LIST = [
  { name: 'Med od bagrema', count: 2 },
  { name: 'Med od lipe', count: 2 },
  { name: 'Livadni med', count: 2 },
  { name: 'Cvijetni med', count: 3 },
  { name: 'Med u saću', count: 1 },
  { name: 'Med s konopljom', count: 1 },
  { name: 'Imunomed', count: 1 },
];

export const SALE_SIDEBAR_PRODUCTS: Product[] = [
  {
    id: 'sale-konoplja',
    category: 'Med s uljem konoplje',
    filterCategory: 'Med s konopljom',
    title: 'Med s konopljom, 250g',
    weight: '250g',
    price: 12.29,
    originalPrice: 16.49,
    isSale: true,
    rating: 5,
    reviewCount: 39,
    image: '/Product/image.png',
    description: 'Kremasti domaći med pomno sljubljen s hladno prešanim uljem domaće konoplje.',
    inStock: true,
  },
  {
    id: 'sale-livadni',
    category: 'Med s uljem konoplje',
    filterCategory: 'Livadni med',
    title: 'Livadni med, 450g',
    weight: '450g',
    price: 12.29,
    originalPrice: 16.49,
    isSale: true,
    rating: 5,
    reviewCount: 22,
    image: '/Product/product-image-9.png',
    description: 'Livadni med po posebnoj akcijskoj cijeni.',
    inStock: true,
  },
  {
    id: 'sale-imunomed',
    category: 'Imunomed',
    filterCategory: 'Imunomed',
    title: 'Imunomed, 250g',
    weight: '250g',
    price: 12.29,
    originalPrice: 16.49,
    isSale: true,
    rating: 5,
    reviewCount: 68,
    image: '/Product/product-image-13.png',
    description: 'Snažna prirodna sinergija meda, propolisa i peludi.',
    inStock: true,
  },
];

export const CATEGORIES: CategoryCard[] = [
  {
    id: 'bagrem',
    title: 'Med od bagrema',
    image: '../img/Frame 9.png',
  },
  {
    id: 'lipa',
    title: 'Med od lipe',
    image: '../img/Frame 6.png',
  },
  {
    id: 'cvjetni',
    title: 'Cvijetni med',
    image: '../img/Frame 10.png',
  },
  {
    id: 'livadni',
    title: 'Livadni med',
    image: '../img/Frame 12.png',
  },
  {
    id: 'ostalo',
    title: 'Ostali proizvodi',
    image: '../img/Frame 13.png',
  },
];

export const FEATURE_CARDS = [
  {
    id: 'prirodno',
    iconType: '../img/service-Icon.svg',
    title: '100% prirodni proizvodi',
    description: 'Bez aditiva, bez industrijske obrade – samo čisti darovi prirode ručno pakirani.',
  },
  {
    id: 'kosnice',
    iconType: '../img/service-Icon-1.svg',
    title: 'Med iz vlastitih košnica',
    description: 'Brinemo o 150 košnica smještenih u slavonskoj prirodi, daleko od zagađenja.',
  },
  {
    id: 'oznaka',
    iconType: '../img/service-Icon-2.svg',
    title: 'Nacionalna oznaka kvalitete',
    description: 'Naš med nosi oznaku "Med hrvatskih pčelinjaka" – dokaz porijekla i vrhunske kvalitete.',
  },
  {
    id: 'tradicija',
    iconType: '../img/service-Icon-3.svg',
    title: 'Obiteljska tradicija',
    description: 'Generacijama njegujemo znanje, iskustvo i poštovanje prema pčelama i prirodi.',
  },
];

export const TRUST_ITEMS = [
  {
    id: 'dostava',
    icon: '../img/feature-icon.svg',
    title: 'Besplatna dostava',
    subtitle: 'Za sve narudžbe iznad 30€.',
  },
  {
    id: 'podrska',
    icon: '../img/feature-icon-1.svg',
    title: 'Korisnička podrška',
    subtitle: 'Rado pomažemo prije i nakon kupnje.',
  },
  {
    id: 'garancija',
    icon: '../img/feature-icon-2.svg',
    title: 'Garancija kvalitete',
    subtitle: 'Svi naši proizvodi su 100% prirodni.',
  },
  {
    id: 'placanje',
    icon: '../img/feature-icon-3.svg',
    title: 'Sigurno plaćanje',
    subtitle: 'Brzo, jednostavno i sigurno.',
  },
];
