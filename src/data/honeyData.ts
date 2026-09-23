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
    image: '/assets/images/product_comb_jar_1790164664471.jpg',
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
    image: '/assets/images/product_acacia_jar_1790164690097.jpg',
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
    image: '/assets/images/product_small_jar_450g_1790167501868.jpg',
    description: 'Manje pakiranje blagog bagremovog meda iz slavonskih šuma. Savršeno za putovanja ili kao sladak domaći dar.',
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
    reviewCount: 47,
    image: '/assets/images/product_linden_jar_1790164677850.jpg',
    description: 'Buket raznovrsnog slavonskog poljskog cvijeća. Bogat izvor peludi, minerala i antioksidansa za cijelu obitelj.',
    inStock: true,
  },
  {
    id: 'cvjetni-med-450-konoplja',
    category: 'Med s uljem konoplje',
    filterCategory: 'Livadni med',
    title: 'Cvijetni med, 450g',
    weight: '450g',
    price: 16.49,
    rating: 5,
    reviewCount: 19,
    image: '/assets/images/product_small_jar_450g_1790167501868.jpg',
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
    image: '/assets/images/product_hemp_jar_1790164701703.jpg',
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
    image: '/assets/images/product_linden_jar_1790164677850.jpg',
    description: 'Prirodni livadni med sakupljen na netaknutim pašnjacima uz rijeku Dravu i Karašicu. Punog i bogatog okusa.',
    inStock: true,
  },
  {
    id: 'livadni-med-450',
    category: 'Med s uljem konoplje',
    filterCategory: 'Livadni med',
    title: 'Livadni med, 450g',
    weight: '450g',
    price: 12.29,
    originalPrice: 16.49,
    isSale: true,
    rating: 5,
    reviewCount: 22,
    image: '/assets/images/product_small_jar_450g_1790167501868.jpg',
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
    image: '/assets/images/product_small_jar_450g_1790167501868.jpg',
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
    image: '/assets/images/product_linden_jar_1790164677850.jpg',
    description: 'Bogat, intenzivan i prepoznatljivo aromatičan lipov med sakupljen u bujnim slavonskim šumama.',
    inStock: true,
  },
  {
    id: 'cvjetni-med-450-second',
    category: 'Med s uljem konoplje',
    filterCategory: 'Livadni med',
    title: 'Cvijetni med, 450g',
    weight: '450g',
    price: 16.49,
    rating: 5,
    reviewCount: 15,
    image: '/assets/images/product_small_jar_450g_1790167501868.jpg',
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
    image: '/assets/images/product_imunomed_jar_1790167467942.jpg',
    description: 'Snažna prirodna sinergija čistog cvjetnog meda, matične mliječi, propolisa i peludi za snažan imunitet.',
    inStock: true,
  },
];

// For home page bestsellers (from previous Frame 7)
export const PRODUCTS = ALL_PRODUCTS.slice(0, 4);

export const CATEGORIES_FILTER_LIST = [
  { name: 'Med od bagrema', count: 3 },
  { name: 'Med od lipe', count: 2 },
  { name: 'Livadni med', count: 5 },
  { name: 'Cvijetni med', count: 1 },
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
    image: '/assets/images/product_hemp_jar_1790164701703.jpg',
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
    image: '/assets/images/product_small_jar_450g_1790167501868.jpg',
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
    image: '/assets/images/product_imunomed_jar_1790167467942.jpg',
    description: 'Snažna prirodna sinergija meda, propolisa i peludi.',
    inStock: true,
  },
];

export const CATEGORIES: CategoryCard[] = [
  {
    id: 'bagrem',
    title: 'Med od bagrema',
    image: '/assets/images/honey_acacia_category_1790164604186.jpg',
  },
  {
    id: 'lipa',
    title: 'Med od lipe',
    image: '/assets/images/honey_linden_category_1790164615791.jpg',
  },
  {
    id: 'cvjetni',
    title: 'Cvijetni med',
    image: '/assets/images/honey_flower_category_1790164628395.jpg',
  },
  {
    id: 'livadni',
    title: 'Livadni med',
    image: '/assets/images/honey_meadow_category_1790164640833.jpg',
  },
  {
    id: 'ostalo',
    title: 'Ostali proizvodi',
    image: '/assets/images/honey_comb_category_1790164653021.jpg',
  },
];

export const FEATURE_CARDS = [
  {
    id: 'prirodno',
    iconType: 'leaf',
    title: '100% prirodni proizvodi',
    description: 'Bez aditiva, bez industrijske obrade – samo čisti darovi prirode ručno pakirani.',
  },
  {
    id: 'kosnice',
    iconType: 'dots',
    title: 'Med iz vlastitih košnica',
    description: 'Brinemo o 150 košnica smještenih u slavonskoj prirodi, daleko od zagađenja.',
  },
  {
    id: 'oznaka',
    iconType: 'stamp',
    title: 'Nacionalna oznaka kvalitete',
    description: 'Naš med nosi oznaku "Med hrvatskih pčelinjaka" – dokaz porijekla i vrhunske kvalitete.',
  },
  {
    id: 'tradicija',
    iconType: 'bee',
    title: 'Obiteljska tradicija',
    description: 'Generacijama njegujemo znanje, iskustvo i poštovanje prema pčelama i prirodi.',
  },
];

export const TRUST_ITEMS = [
  {
    id: 'dostava',
    icon: 'truck',
    title: 'Besplatna dostava',
    subtitle: 'Za sve narudžbe iznad 30€.',
  },
  {
    id: 'podrska',
    icon: 'phone',
    title: 'Korisnička podrška',
    subtitle: 'Rado pomažemo prije i nakon kupnje.',
  },
  {
    id: 'garancija',
    icon: 'shield',
    title: 'Garancija kvalitete',
    subtitle: 'Svi naši proizvodi su 100% prirodni.',
  },
  {
    id: 'placanje',
    icon: 'card',
    title: 'Sigurno plaćanje',
    subtitle: 'Brzo, jednostavno i sigurno.',
  },
];
