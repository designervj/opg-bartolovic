/**
 * OPG Bartolović — Kalp-Admin Pages + Products Seed Script (v2)
 * Writes directly to the 'pages' collection using kalp-admin's exact schema.
 * Run: npx tsx seed-kalp-admin.ts
 */

import { MongoClient, ObjectId } from 'mongodb';
import * as dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI as string;
const DB_NAME = process.env.TENANT_DB_NAME || 'kp_opg_bartolovic';
const TENANT_ID = DB_NAME;

// ─── Page content (payload) from local JSON files ─────────────────────────────

function loadPagePayload(slug: string): Record<string, any> {
  const filePath = path.join(process.cwd(), 'src', 'data', 'pages', `${slug}.json`);
  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }
  return {};
}

// ─── CMS content blocks in kalp-admin format ─────────────────────────────────

function buildContent(slug: string): any[] {
  const payload = loadPagePayload(slug);

  if (slug === 'home') {
    return [
      {
        id: 'hero-section',
        type: 'hero',
        adminTitle: 'Hero sekcija',
        props: {
          title: { en: payload.hero?.title || '100% Prirodni Slavonski Med' },
          subtitle: { en: payload.hero?.subtitle || '' },
          buttonText: { en: payload.hero?.buttonText || 'Istražite proizvode' },
          bgImage: '/img/hero-img.png',
        },
      },
      {
        id: 'feature-cards-section',
        type: 'featureCards',
        adminTitle: 'Kartice prednosti',
        props: {
          items: (payload.featureCards || []).map((c: any) => ({
            id: c.id,
            iconType: c.iconType,
            title: { en: c.title },
            description: { en: c.description },
          })),
        },
      },
      {
        id: 'categories-grid-section',
        type: 'categoriesGrid',
        adminTitle: 'Kategorije',
        props: {
          title: { en: payload.categoriesGrid?.title || 'Naše Kategorije' },
          subtitle: { en: payload.categoriesGrid?.subtitle || '' },
          categories: (payload.categoriesGrid?.categories || []).map((c: any) => ({
            id: c.id,
            title: { en: c.title },
            image: c.image,
          })),
        },
      },
      {
        id: 'bestsellers-section',
        type: 'bestsellers',
        adminTitle: 'Najprodavaniji',
        props: {
          title: { en: payload.bestsellers?.title || 'Najprodavaniji proizvodi' },
          subtitle: { en: payload.bestsellers?.subtitle || '' },
          viewAllText: { en: payload.bestsellers?.viewAllText || 'Prikaži sve' },
        },
      },
      {
        id: 'story-section',
        type: 'storySection',
        adminTitle: 'Naša priča',
        props: {
          title: { en: payload.storySection?.title || 'OPG Bartolović' },
          subtitle: { en: payload.storySection?.subtitle || '' },
          description: (payload.storySection?.description || []).map((d: string) => ({ en: d })),
          image: '/img/about-img.png',
        },
      },
      {
        id: 'trust-bar-section',
        type: 'trustBar',
        adminTitle: 'Traka povjerenja',
        props: {
          items: (payload.trustBar || []).map((t: any) => ({
            id: t.id,
            icon: t.icon,
            title: { en: t.title },
            subtitle: { en: t.subtitle },
          })),
        },
      },
      {
        id: 'cta-banner-section',
        type: 'ctaBanner',
        adminTitle: 'CTA Banner',
        props: {
          title: { en: payload.ctaBanner?.title || 'Naručite odmah' },
          subtitle: { en: payload.ctaBanner?.subtitle || '' },
          buttonText: { en: payload.ctaBanner?.buttonText || 'Naručite odmah' },
          image: '/img/cta-img.png',
        },
      },
    ];
  }

  if (slug === 'about') {
    return [
      {
        id: 'about-hero-section',
        type: 'hero',
        adminTitle: 'O nama Hero',
        props: {
          title: { en: payload.hero?.title || 'O nama' },
          subtitle: { en: payload.hero?.subtitle || '' },
          bgImage: '/img/about-img.png',
        },
      },
      {
        id: 'about-story-section',
        type: 'story',
        adminTitle: 'Naša priča',
        props: {
          title: { en: payload.story?.title || '' },
          paragraphs: (payload.story?.paragraphs || []).map((p: string) => ({ en: p })),
          buttonText: { en: payload.story?.buttonText || '' },
        },
      },
      {
        id: 'about-specialties-section',
        type: 'specialties',
        adminTitle: 'Specijaliteti',
        props: {
          title: { en: payload.specialties?.title || '' },
          list: (payload.specialties?.list || []).map((l: string) => ({ en: l })),
          image: payload.specialties?.image || '/img/about-service.png',
          footerText: { en: payload.specialties?.footerText || '' },
        },
      },
      {
        id: 'about-team-section',
        type: 'team',
        adminTitle: 'Naš tim',
        props: {
          title: { en: payload.team?.title || 'Naš tim' },
          subtitle: { en: payload.team?.subtitle || '' },
          members: (payload.team?.members || []).map((m: any) => ({
            name: { en: m.name },
            role: { en: m.role },
            image: m.image,
          })),
        },
      },
    ];
  }

  if (slug === 'contact') {
    return [
      {
        id: 'contact-hero-section',
        type: 'hero',
        adminTitle: 'Kontakt Hero',
        props: {
          title: { en: payload.hero?.title || 'Kontaktirajte nas' },
          subtitle: { en: payload.hero?.subtitle || '' },
          bgImage: '/img/contact-img.png',
        },
      },
      {
        id: 'contact-details-section',
        type: 'contactDetails',
        adminTitle: 'Kontakt detalji',
        props: payload.contactDetails || {
          phone: '+385 91 234 5678',
          email: 'info@opg-bartolovic.hr',
          address: { en: 'Ulica Pčelara 12, 31550 Valpovo, Hrvatska' },
          workingHours: { en: 'Pon – Pet: 08:00 – 17:00' },
        },
      },
      {
        id: 'contact-form-section',
        type: 'contactForm',
        adminTitle: 'Kontakt forma',
        props: payload.contactForm || {
          title: { en: 'Pošaljite nam poruku' },
          submitText: { en: 'Pošalji poruku' },
        },
      },
    ];
  }

  if (slug === 'shop') {
    return [
      {
        id: 'shop-banner-section',
        type: 'banner',
        adminTitle: 'Naslov trgovine',
        props: {
          title: { en: payload.banner?.title || payload.title || 'Naši proizvodi' },
          subtitle: { en: payload.banner?.subtitle || '' },
          image: '/img/services-img-1.png',
        },
      },
      {
        id: 'shop-categories-filter',
        type: 'categoriesFilter',
        adminTitle: 'Filter kategorija',
        props: {
          title: { en: 'Filter po kategoriji' },
          categories: payload.categoriesFilter || ['Svi proizvodi', 'Med u saću', 'Tekući med', 'Med s dodacima', 'Propolis i pelud'],
        },
      },
      {
        id: 'shop-product-grid',
        type: 'productGrid',
        adminTitle: 'Popis proizvoda',
        props: {
          saleSidebarTitle: { en: payload.saleSidebarTitle || 'Akcijski proizvodi' },
          emptyText: { en: 'Nema pronađenih proizvoda.' },
        },
      },
    ];
  }

  if (slug === 'cart') {
    return [
      {
        id: 'cart-section',
        type: 'cart',
        adminTitle: 'Košarica',
        props: {
          emptyTitle: { en: 'Vaša košarica je prazna' },
          emptySubtitle: { en: 'Dodajte neke proizvode u košaricu.' },
          continueShoppingText: { en: 'Nastavi kupovinu' },
          checkoutText: { en: 'Nastavite na plaćanje' },
        },
      },
    ];
  }

  if (slug === 'checkout') {
    return [
      {
        id: 'checkout-form-section',
        type: 'checkoutForm',
        adminTitle: 'Forma za narudžbu',
        props: {
          title: { en: 'Podaci za dostavu' },
          orderSummaryTitle: { en: 'Pregled narudžbe' },
          submitText: { en: 'Naruči' },
          successTitle: { en: 'Hvala na narudžbi!' },
          successMessage: { en: 'Potvrdili smo vašu narudžbu. Uskoro ćemo vas kontaktirati.' },
        },
      },
    ];
  }

  if (slug === 'product_detail' || slug === 'product-detail') {
    return [
      {
        id: 'product-detail-section',
        type: 'productDetail',
        adminTitle: 'Detalji proizvoda',
        props: payload || {
          addToCartText: { en: 'Dodaj u košaricu' },
          freeShippingText: { en: 'Besplatna dostava za narudžbe iznad 30€' },
        },
      },
    ];
  }

  return [];
}

// ─── Page definitions ─────────────────────────────────────────────────────────

const PAGE_DEFS = [
  {
    slug: 'home',
    name: 'Naslovna',
    title: { en: 'Naslovna', hr: 'Naslovna' },
    metaTitle: { en: 'OPG Bartolović – Prirodni Domaći Med iz Slavonije' },
    metaDescription: { en: 'Okusite tradiciju i čistoću prirode. Med sakupljen s ljubavlju na livadama Slavonije.' },
    isPublished: true,
    isHomepage: true,
    status: 'live',
  },
  {
    slug: 'about',
    name: 'O nama',
    title: { en: 'O nama', hr: 'O nama' },
    metaTitle: { en: 'O nama – OPG Bartolović' },
    metaDescription: { en: 'Naše pčelarstvo nije samo posao – to je obiteljska priča koja traje generacijama.' },
    isPublished: true,
    isHomepage: false,
    status: 'live',
  },
  {
    slug: 'contact',
    name: 'Kontakt',
    title: { en: 'Kontakt', hr: 'Kontakt' },
    metaTitle: { en: 'Kontakt – OPG Bartolović' },
    metaDescription: { en: 'Javite nam se – rado odgovaramo na vaša pitanja.' },
    isPublished: true,
    isHomepage: false,
    status: 'live',
  },
  {
    slug: 'shop',
    name: 'Trgovina',
    title: { en: 'Trgovina', hr: 'Trgovina' },
    metaTitle: { en: 'Trgovina – OPG Bartolović' },
    metaDescription: { en: 'Kupite prirodni domaći med iz Slavonije. Besplatna dostava za narudžbe iznad 30€.' },
    isPublished: true,
    isHomepage: false,
    status: 'live',
  },
  {
    slug: 'cart',
    name: 'Košarica',
    title: { en: 'Košarica', hr: 'Košarica' },
    metaTitle: { en: 'Košarica – OPG Bartolović' },
    metaDescription: { en: 'Pregledajte svoju košaricu i nastavite na plaćanje.' },
    isPublished: true,
    isHomepage: false,
    status: 'live',
  },
  {
    slug: 'checkout',
    name: 'Plaćanje',
    title: { en: 'Plaćanje', hr: 'Plaćanje' },
    metaTitle: { en: 'Plaćanje – OPG Bartolović' },
    metaDescription: { en: 'Dovršite svoju narudžbu.' },
    isPublished: true,
    isHomepage: false,
    status: 'live',
  },
  {
    slug: 'product_detail',
    name: 'Detalji proizvoda',
    title: { en: 'Detalji proizvoda', hr: 'Detalji proizvoda' },
    metaTitle: { en: 'Proizvod – OPG Bartolović' },
    metaDescription: { en: 'Prirodni pčelinji proizvodi OPG Bartolović.' },
    isPublished: true,
    isHomepage: false,
    status: 'live',
  },
];

// ─── Products from honeyData ──────────────────────────────────────────────────

const PRODUCTS = [
  { slug: 'med-sa-sacem-450', name: { en: 'Med sa saćem', hr: 'Med sa saćem' }, description: { en: 'Prirodni med sa saćem, 450g. Direktno iz košnice, bez aditiva.' }, price: 16.49, originalPrice: null, isSale: false, stock: 50, images: ['/Product/pro-img.png'], category: 'Med u saću', weight: '450g', rating: 4.9, reviewCount: 128, inStock: true },
  { slug: 'bagremov-med-900', name: { en: 'Bagremov med, 900g', hr: 'Bagremov med, 900g' }, description: { en: 'Čisti bagremov med, 900g. Blage arome, izvrsnog okusa.' }, price: 14.99, originalPrice: null, isSale: false, stock: 40, images: ['/Product/product-image.png'], category: 'Tekući med', weight: '900g', rating: 4.8, reviewCount: 94, inStock: true },
  { slug: 'livadni-med-450', name: { en: 'Livadni med, 450g', hr: 'Livadni med, 450g' }, description: { en: 'Bogat livadni med, 450g. Pun cvjetnih aroma.' }, price: 11.49, originalPrice: 13.99, isSale: true, stock: 35, images: ['/Product/product-image-2.png'], category: 'Tekući med', weight: '450g', rating: 4.7, reviewCount: 67, inStock: true },
  { slug: 'med-s-orasima-250', name: { en: 'Med s orasima, 250g', hr: 'Med s orasima, 250g' }, description: { en: 'Specijalitet – med s dodatkom oraha, 250g.' }, price: 9.99, originalPrice: null, isSale: false, stock: 25, images: ['/Product/product-image-3.png'], category: 'Med s dodacima', weight: '250g', rating: 4.8, reviewCount: 42, inStock: true },
  { slug: 'propolis-tinktura-30ml', name: { en: 'Propolis tinktura, 30ml', hr: 'Propolis tinktura, 30ml' }, description: { en: 'Prirodna propolis tinktura, 30ml. Jača imunitet.' }, price: 12.99, originalPrice: null, isSale: false, stock: 20, images: ['/Product/product-image-4.png'], category: 'Propolis i pelud', weight: '30ml', rating: 4.9, reviewCount: 38, inStock: true },
  { slug: 'cvijetni-med-900', name: { en: 'Cvijetni med, 900g', hr: 'Cvijetni med, 900g' }, description: { en: 'Mirisni cvijetni med, 900g. Bogat medom raznih cvjetova.' }, price: 13.99, originalPrice: 16.99, isSale: true, stock: 30, images: ['/Product/product-image-5.png'], category: 'Tekući med', weight: '900g', rating: 4.6, reviewCount: 55, inStock: true },
  { slug: 'lipov-med-450', name: { en: 'Lipov med, 450g', hr: 'Lipov med, 450g' }, description: { en: 'Fin lipov med, 450g. Cijenjen zbog umirujućih svojstava.' }, price: 12.49, originalPrice: null, isSale: false, stock: 28, images: ['/Product/product-image-6.png'], category: 'Tekući med', weight: '450g', rating: 4.7, reviewCount: 49, inStock: true },
  { slug: 'imunomedic-250', name: { en: 'Imunomedic mix, 250g', hr: 'Imunomedic mix, 250g' }, description: { en: 'Posebna mješavina meda, peludi i propolisa za jačanje imuniteta.' }, price: 14.99, originalPrice: null, isSale: false, stock: 18, images: ['/Product/product-image-7.png'], category: 'Med s dodacima', weight: '250g', rating: 5.0, reviewCount: 31, inStock: true },
  { slug: 'bagremov-med-450', name: { en: 'Bagremov med, 450g', hr: 'Bagremov med, 450g' }, description: { en: 'Lagani bagremov med, 450g. Savršen za čaj i desert.' }, price: 9.49, originalPrice: null, isSale: false, stock: 45, images: ['/Product/product-image-8.png'], category: 'Tekući med', weight: '450g', rating: 4.8, reviewCount: 61, inStock: true },
  { slug: 'med-s-ljesnjacima-250', name: { en: 'Med s lješnjacima, 250g', hr: 'Med s lješnjacima, 250g' }, description: { en: 'Med s prirodnim lješnjacima, 250g. Izuzetno hranjivo.' }, price: 10.99, originalPrice: null, isSale: false, stock: 22, images: ['/Product/product-image-9.png'], category: 'Med s dodacima', weight: '250g', rating: 4.7, reviewCount: 28, inStock: true },
];

// ─── Seed Logic ───────────────────────────────────────────────────────────────

async function seed() {
  console.log(`\n🍯 OPG Bartolović – Kalp-Admin Seed Script v2`);
  console.log(`📦 DB: ${DB_NAME} | Collection: pages\n`);

  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB\n');
    const db = client.db(DB_NAME);
    const now = new Date();

    // ── 1. Seed Pages into 'pages' collection ──────────────────────────────────
    console.log('📄 Seeding Pages → pages collection...');
    const pagesCol = db.collection('pages');

    for (const def of PAGE_DEFS) {
      const payload = loadPagePayload(def.slug === 'product_detail' ? 'product_detail' : def.slug);
      const content = buildContent(def.slug);
      const docId = new ObjectId();
      const idStr = docId.toHexString();

      const doc = {
        id: idStr,
        slug: def.slug,
        page_slug: def.slug,
        document_key: def.slug,
        name: def.name,
        title: def.title,
        metaTitle: def.metaTitle,
        metaDescription: def.metaDescription,
        isPublished: def.isPublished,
        isHomepage: def.isHomepage,
        status: def.status,
        tenant_id: TENANT_ID,
        content: content,
        payload: payload,
        updatedAt: now,
        updated_at: now,
      };

      const result = await pagesCol.updateOne(
        { slug: def.slug },
        {
          $set: doc,
          $setOnInsert: {
            _id: docId,
            createdAt: now,
          },
        },
        { upsert: true }
      );

      const action = result.upsertedCount ? '🆕 CREATED' : '✏️  UPDATED';
      console.log(`  ${action}: ${def.slug} [${content.length} sections]`);
    }

    console.log(`\n✅ ${PAGE_DEFS.length} pages seeded into 'pages' collection!\n`);

    // ── 2. Seed Products into 'products' collection ────────────────────────────
    console.log('🛍️  Seeding Products → products collection...');
    const productsCol = db.collection('products');

    for (const product of PRODUCTS) {
      const result = await productsCol.updateOne(
        { slug: product.slug },
        {
          $set: {
            ...product,
            tenant_id: TENANT_ID,
            updatedAt: now,
          },
          $setOnInsert: {
            _id: new ObjectId(),
            createdAt: now,
          },
        },
        { upsert: true }
      );

      const action = result.upsertedCount ? '🆕 CREATED' : '✏️  UPDATED';
      console.log(`  ${action}: ${product.slug} – €${product.price}`);
    }

    console.log(`\n✅ ${PRODUCTS.length} products seeded into 'products' collection!\n`);

    // ── 3. Verify ──────────────────────────────────────────────────────────────
    const pageCount = await pagesCol.countDocuments();
    const productCount = await productsCol.countDocuments();
    console.log(`📊 Final state in DB "${DB_NAME}":`);
    console.log(`   pages     : ${pageCount} docs`);
    console.log(`   products  : ${productCount} docs`);
    console.log('\n🎉 Done! Refresh Pages & Content in Kalp-Admin.\n');
    console.log('🔗 Admin URL: https://zero.kalptree.xyz\n');

  } catch (err) {
    console.error('❌ Error:', err);
    process.exit(1);
  } finally {
    await client.close();
  }
}

seed();
